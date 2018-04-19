const cheerio = require('cheerio');

module.exports = xml => {
  const $ = cheerio.load(xml, { xmlMode: true });
  let activities = [];

  $('activity').each(function(i, el) {
    activities.push({
      category: $(this).attr('category'),
      description: $(this).attr('description'),
      durationMinutes: parseInt($(this).attr('duration_minutes')),
      startTime: $(this).attr('start_time'),
      endTime: $(this).attr('end_time'),
      name: $(this).attr('name'),
      tags: $(this).attr('tags'), // TODO: this should be split
    });
  });

  return activities
    .filter(activity => activity.startTime && activity.endTime);
};