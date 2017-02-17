import Vue from 'vue';
import Router from 'vue-router';
import Workbench from 'components/Workbench';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Workbench,
    },
  ],
});
