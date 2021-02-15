<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 m4 lg4 xl4>
        <v-card elevation="12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login</v-toolbar-title>
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
              <v-btn
                block
                depressed
              >
                Criar conta
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click="submit"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
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
    submit () {
      console.log('user: ', this.usage)
    }
  }
}
</script>
