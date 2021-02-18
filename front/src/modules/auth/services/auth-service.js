// para fazer import de exports nomeados tem q colocar entre chaves
import apollo, { onSignin } from '@/plugins/apollo'

import SigninMutation from '../graphql/Signin.graphql'
import SignupMutation from '../graphql/Signup.graphql'
import UserMutation from '../graphql/User.graphql'

// quando a funcao tem um argumento só, podem ser omitidos os parenteses
const signin = async variables => {
  const response = await apollo.mutate({
    mutation: SigninMutation,
    variables
  })
  const { signin } = response.data
  // usa o await para aguardar a resposta do reset do apollo
  await onSignin(apollo, signin.token)
  return signin
}

const signup = async (variables) => {
  const response = await apollo.mutate({
    mutation: SignupMutation,
    variables
  })
  const { signup } = response.data
  // usa o await para aguardar a resposta do reset do apollo
  await onSignin(apollo, signup.token)
  return signup
}

const user = async (options = {}) => {
  const response = await apollo.query({
    query: UserMutation,
    ...options
  })
  return response.data.user
}

export default {
  signin,
  signup,
  user
}
