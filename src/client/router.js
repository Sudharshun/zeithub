import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home.vue';
import Projects from './components/projects.vue';
import Project from './components/project.vue';
import CreateProject from './components/create-project.vue';
import SignIn from './components/sign-in.vue';
import SignOut from './components/sign-out.vue';
import SignUp from './components/sign-up.vue';
import Time from './components/time.vue';
import Expenses from './components/expenses.vue';
import Me from './components/me.vue';
import Invoices from './components/invoices.vue';
import Invoice from './components/invoice.vue';

import { requireAuth, requireUnauth } from './auth';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    {
      path: '/projects',
      name: 'Projects', 
      beforeEnter: requireAuth,
      component: Projects 
    },
    {
      path: '/projects/:slug',
      name: 'Project', 
      beforeEnter: requireAuth,
      component: Project
    },

    {
      path: '/signin', 
      name: 'SignIn', 
      beforeEnter: requireUnauth,
      component: SignIn 
    },
    {
      path: '/signout', 
      name: 'SignOut', 
      beforeEnter: requireAuth,
      component: SignOut
    },
    {
      path: '/signup',
      name: 'SignUp',
      beforeEnter: requireUnauth,
      component: SignUp,
    },
    {
      path: '/projects/new',
      name: 'CreateProject',
      beforeEnter: requireAuth,
      component: CreateProject,
    },
    {
      path: '/time',
      name: 'Time',
      beforeEnter: requireAuth,
      component: Time,
    },
    {
      path: '/expenses',
      name: 'Expenses',
      beforeEnter: requireAuth,
      component: Expenses
    },
    {
      path: '/me',
      name: 'Me',
      beforeEnter: requireAuth,
      component: Me
    },
    {
      path: '/invoices',
      name: 'Invoices',
      beforeEnter: requireAuth,
      component: Invoices
    },
    {
      path: '/invoices/:number',
      name: 'Invoice',
      beforeEnter: requireAuth,
      component: Invoice
    }
  ]
});