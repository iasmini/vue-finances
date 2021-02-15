const Login = () => import('./../views/Login')
const Signup = () => import('./../views/Signup')

export default [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
]
