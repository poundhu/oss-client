import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'page-active',
  routes: [
    {
      path: '/m',
      name: 'main-page',
      component: () => import('@/views/m/index')
    },
    {
      path: '/t',
      name: 't',
      component: () => import('@/views/t/index')
    },
    {
      path: '/s',
      name: 's',
      component: () => import('@/views/s/index')
    },
    {
      path: '*',
      redirect: '/m'
    }
  ]
})
