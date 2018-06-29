import * as moment from 'moment';
import DB from './../../db';

const db = new DB();

export default async (req, res) => {
  if (!req.body.name) {
    return res.status(403).json({ success: false, message: 'Missing name' });
  }

  if (!req.body.hourlyRate) {
    return res.status(403).json({ success: false, message: 'Missing hourly rate' });
  }

  if (!req.body.month) {
    return res.status(403).json({ success: false, message: 'Missing month' });
  }

  if (!req.body.projectSlug) {
    return res.status(403).json({ success: false, message: 'Missing project' });
  }

  if (!req.body.iban) {
    return res.status(403).json({ success: false, message: 'Missing bank account' });
  }

  const userId = req.userId;
  const { name, hourlyRate, projectSlug, iban } = req.body;
  
  const [ year, month ] = req.body.month.split('-');

  const project = await db.queryOne(`
    select id
    from projects
    where user_id = ${userId} and slug = '${projectSlug}'
  `);

  if (!project) {
    return res.status(500).json({ success: false, message: 'Project does not exists' });
  }

  const bankAccount = await db.queryOne(`
    select id
    from bank_accounts
    where user_id = ${userId} and iban = '${iban}'
  `);

  const dueDate = moment().add(1, 'month').format('YYYY-MM-DD');
  let number = 1;

  const lastInvoice = await db.queryOne(`
    select number
    from invoices
    where user_id = ${userId}
    order by id desc
    limit 1
  `);

  if (lastInvoice && lastInvoice.number) {
    number = parseInt(lastInvoice.number) + 1;
  }

  const invoiceId = await db.execute(`
    insert into invoices (
      user_id, 
      date, 
      due_date, 
      name, 
      number, 
      project_id, 
      rate,
      bank_account_id
    )
    values (
      ${userId}, 
      curdate(), 
      '${dueDate}', 
      '${name}', 
      ${number}, 
      ${project.id}, 
      ${hourlyRate},
      ${bankAccount.id}
    )
  `);

  const activityInvoices = await db.execute(`
    update activities
    set invoice_id = ${invoiceId}
    where month(start_time) = ${month}
    and year(start_time) = ${year}
    and project_id = ${project.id}
    and user_id = ${userId}
  `);

  res.json({ success: true, invoiceId, activityInvoices });
};