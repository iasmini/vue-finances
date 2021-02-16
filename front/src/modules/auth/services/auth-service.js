import apolo from '@/plugins/apollo'

import loginMutation from '@/modules/auth/views/Login'

// quando a funcao tem um argumento só, podem ser omitidos os parenteses
const login = async (email, password) => {
  const response = await apolo.mutate({
    mutation: loginMutation,
    email,
    password
  })
  return response.data.login()
}

export default {
  login
}
