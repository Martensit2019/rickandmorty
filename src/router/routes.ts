import type { RouteRecordRaw } from 'vue-router';
import main from '@/layouts/DefaultLayout.vue'
// import auth from '../layouts/AuthLayout/AuthLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      layout: main,
      // needAuth: true
    },
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('@/pages/Favorite.vue'),
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () => import('../pages/Character.vue'),
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('../pages/Register/Register.vue'),
  //   meta: {
  //     layout: auth,
  //     needAuth: false
  //   }
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../pages/Login/Login.vue'),
  //   meta: {
  //     layout: auth,
  //     needAuth: false
  //   }
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../pages/About.vue'),
  //   meta: {
  //     layout: main,
  //     needAuth: true
  //   }
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('../pages/Error/Error.vue'),
  //   meta: {
  //     layout: auth
  //   }
  // },
]