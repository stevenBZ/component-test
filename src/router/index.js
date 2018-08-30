import Vue from 'vue';
import Router from 'vue-router';

import view from './helpers/view';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/construction',
      component: view('construction/construction')
    },
    {
      path: '/history',
      component: view('history')
    },
    {
      path: '/planning',
      component: view('planning')
    },
    {
      path: '/switch',
      component: view('switch')
    },
    {
      path: '/task',
      component: view('task')
    },
    {
      path: '/404',
      component: view('404')
    },
    {
      path: '/',
      component: view('home')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
