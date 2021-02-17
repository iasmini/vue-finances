<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 m4 lg4 xl4>
        <v-card elevation="12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Sign in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <!-- mantém a cor verde depois que sair do campo -->
              <!-- :success="!$v.user.email.$invalid"-->
              <v-text-field
                prepend-icon="email"
                name="email"
                label="E-mail"
                type="email"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              block
              depressed
              large
              @click="submit"
            >Entrar</v-btn>
          </v-card-actions>

          <p class="text-right ma-2 pa-2">
            Ainda não tem uma conta? <router-link to="/signup">Cadastre-se</router-link>.
          </p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-service'

export default {
  name: 'Signin',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(1)
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('O e-mail é obrigatório.')
      !email.email && errors.push('Insira um e-mail válido.')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('A senha é obrigatória.')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres.`)
      return errors
    }
  },
  methods: {
    async submit () {
      const authData = await AuthService.signin(this.user)
      console.log('authData: ', authData)
    }
  }
}
</script>
