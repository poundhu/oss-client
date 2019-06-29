import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'page-active',
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index'),
      redirect: '/m',
      children: [
        {
          path: '/m',
          name: 'main-page',
          component: () => import('@/views/main/index')
        },
        {
          path: '/t',
          name: 't',
          component: () => import('@/views/transfer/index')
        },
        {
          path: '/s',
          name: 's',
          component: () => import('@/views/setting/index')
        }
      ]
    },
    {
      path: '/suspension',
      name: 'suspension',
      component: () => import('@/views/suspension/index')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
