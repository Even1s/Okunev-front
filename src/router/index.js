import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('@/pages/FavoritePage.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/pages/CartPage.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/pages/OrderPage.vue')
  },
  {
    path: '/search/:catalogId/:searchText?',
    name: 'search',
    component: () => import('@/pages/SearchPage.vue'),
    props: true
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/AccountPage.vue')
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/pages/ProductPage.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
