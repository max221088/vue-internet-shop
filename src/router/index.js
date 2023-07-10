import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Info/AboutView.vue')
  },
  {
    path: '/product/:data',
    name: 'product',
    props: true,
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/cart/',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/Info/NewsView.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/Info/ContactsView.vue')
  },
  {
    path: '/waranty',
    name: 'waranty',
    component: () => import('../views/Info/WarantyView.vue')
  },
  {
    path: '/register/',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/user-orders/',
    name: 'userOrders',
    component: () => import('../views/UserOrderView.vue')
  },
  {
    path: '/user-setting/',
    name: 'userSetting',
    component: () => import('../views/UserSettingView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
