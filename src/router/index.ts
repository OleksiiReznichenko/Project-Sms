import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Index.vue')
    },
    {
      path: '/loginpage',
      name: 'loginpage',
      redirect: '/login',
      component: () => import('../layouts/LoginPage.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../components/Singular/Login/Login.vue'),
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import('../components/Singular/Login/Registration.vue'),
        },
        {
          path: '/recover',
          name: 'recover',
          component: () => import('../components/Singular/Login/Recover.vue'),
        },
        {
          path: '/recoverByEmail',
          name: 'recoverByEmail',
          component: () => import('../components/Singular/Login/RecoverByEmail.vue'),
        },
        {
          path: '/login/confirm',
          name: 'login-confirm',
          component: () => import('../components/Singular/Login/Confirm.vue'),
        },
      ]
    },
    {
      path: '/FAQ',
      name: 'FAQ-notlogin',
      component: () => import('../pages/FAQNotLogin/FAQ.vue'),
    },
    {
      path: '/services',
      name: 'services-notlogin',
      component: () => import('../pages/ServicesNotLogin/Services.vue'),
    },
    {
      path: '/TOS',
      name: 'TOS-notlogin',
      component: () => import('../pages/TOSNotLogin/TOSPage.vue'),
    },
    {
      path: '/main',
      name: 'mainpage',
      redirect: '/main/profile',
      component: () => import('../layouts/MainPage.vue'),
      children: [
        {
          path: '/main/profile',
          name: 'Profile',
          component: () => import('../pages/Profile/Profile.vue'),
        },
        {
          path: '/main/services/:status?',
          name: 'Services',
          component: () => import('../pages/Services/Services.vue'),
        },
        {
          path: '/main/services/cart',
          name: 'Cart',
          component: () => import('../pages/Cart/Cart.vue'),
        },
        {
          path: '/main/orders/:id?/:status?',
          name: 'Orders',
          component: () => import('../pages/Orders/Orders.vue'),
        },
        {
          path: '/main/FAQ',
          name: 'FAQ',
          component: () => import('../pages/FAQ/FAQ.vue'),
        },
        {
          path: '/main/transactions',
          name: 'Transactions',
          component: () => import('../pages/Transactions/Transactions.vue'),
        },
        {
          path: '/main/TOS',
          name: 'TOS',
          component: () => import('../pages/TOS/TOSPage.vue'),
        },
        {
          path: '/404',
          name: 'PageNotFound',
          component: () => import('../pages/PageNotFound/PageNotFound.vue'),
        },
      ]
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      redirect: '/adminPanel/main',
      component: () => import('../layouts/AdminPanel.vue'),
      children: [
        {
          path: '/adminPanel/main',
          name: 'adminPanelMain',
          component: () => import('../pages/AdminPanel/Main.vue'),
        },
        {
          path: '/adminPanel/users',
          name: 'adminPanelUsers',
          component: () => import('../pages/AdminPanel/Users.vue'),
        },
        {
          path: '/adminPanel/transactions',
          name: 'adminPanelTransactions',
          component: () => import('../pages/AdminPanel/Transactions.vue'),
        },
        {
          path: '/adminPanel/announcements',
          name: 'adminPanelAnnouncements',
          component: () => import('../pages/AdminPanel/Announcements.vue'),
        },
        {
          path: '/adminPanel/coupons',
          name: 'adminPanelCoupons',
          component: () => import('../pages/AdminPanel/Coupons.vue'),
        },
        {
          path: '/adminPanel/users/:id',
          name: 'adminPanelUsersUser',
          component: () => import('../pages/AdminPanel/User.vue'),
        },
      ]
    },
  ]
})

export default router
