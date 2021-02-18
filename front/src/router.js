import Vue from 'vue'
import Router from 'vue-router'

import { AUTH_TOKEN } from '@/plugins/apollo'
import AuthService from '@/modules/auth/services/auth-service'
import authRoutes from '@/modules/auth/router'
import dashboardRoutes from '@/modules/dashboard/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    { path: '', redirect: '/signin' }
  ]
})

// verifica as rotas que precisam de autenticacao
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const siginRoute = {
      path: '/signin',
      query: { redirect: to.fullPath }
    }
    if (token) {
      try {
        // se a rota precisa de autenticacao, nao usa token do cache, busca outro no servidor
        await AuthService.user({ fetchPolicy: 'network-only' })
        // apos autenticado redireciona para a url que estava tentando acessar
        return next()
      } catch (e) {
        console.log('Auto login error: ', e)
        return next(siginRoute)
      }
    }
    // se nao tem token redireciona para tela de login
    return next(siginRoute)
  }
  // se a rota nao precisa de autenticacao redireciona para a url que estava tentando acessar
  next()
})

export default router
