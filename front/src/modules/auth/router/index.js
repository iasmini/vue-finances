const Signin = () => import('../views/Signin')
const Signup = () => import('./../views/Signup')

export default [
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup }
]
