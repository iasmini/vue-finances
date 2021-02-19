const EntriesHome = () => import('../views/EntriesHome')

// /dashboard/entries - nao coloca a barra no entries pq eh uma rota filha
// /dashboard/home
// /dashboard
// alias: ['home', ''] - para atender a /dashboard/home e /dashboard
export default [
  { path: 'entries', component: EntriesHome, meta: { requiresAuth: true }, alias: ['home', ''] }
]
