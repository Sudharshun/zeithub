import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home.vue';
import Projects from './components/projects.vue';
import CreateProject from './components/create-project.vue';
import SignIn from './components/sign-in.vue';
import SignOut from './components/sign-out.vue';
import SignUp from './components/sign-up.vue';

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
      component: CreateProject,
    },
  ]
});