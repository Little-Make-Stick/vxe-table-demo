import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'base-table',
    children:[
      {
        path: 'roll-table',
        component: () => import('../views/Roll/vxeTable-Roll.vue')
      },
      {
        path: 'base-table',
        component: () => import('../views/Base/vxeTable-Base.vue')
      },
      {
        path: 'base-tree',
        component: () => import('../views/Base/vxeTree-Base.vue')
      },
      {
        path: 'horizontal-tree',
        component: () => import('../views/Base/vxeTree-h-Base.vue')
      },
      {
        path: 'function/fullscreen',
        component: () => import('../views/Function/fullscreen.vue')
      },
      {
        path: 'function/show-col',
        component: () => import('../views/Function/show-col.vue')
      },
      {
        path: 'function/filtercol',
        component: () => import('../views/Function/filtercol.vue')
      },
      {
        path: 'function/tooltip',
        component: () => import('../views/Function/tooltip.vue')
      },
      {
        path: 'function/scroll-to-row',
        component: () => import('../views/Function/scroll-to-row.vue')
      },
      {
        path: 'function/table-edit',
        component: () => import('../views/Function/table-edit.vue')
      },
      {
        path: 'function/table-footer',
        component: () => import('../views/Function/table-footer.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
