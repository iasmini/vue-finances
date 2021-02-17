// para fazer import de exports nomeados tem q colocar entre chaves
import apollo, { onSignin } from '@/plugins/apollo'

import SigninMutation from '../graphql/Signin.graphql'

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

export default {
  signin
}
