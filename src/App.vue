<template>
  <v-app>
    <v-app-bar
      app
      class=" indigo darken-4"
    >
      <v-toolbar-title class="headline text-uppercase">
        <v-img
          lazy-src="./assets/iban-logo.svg"
          src="./assets/iban-logo.svg"
        />
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <main-page />
    </v-content>
  </v-app>
</template>

<script>
  import MainPage from './views/MainPage'
  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    components: {
      MainPage,
    },
    data: () => ({
    //
    }),
    created () {
      this.initAccount()
    },
    methods: {
      ...mapActions('account', {
        initAccount: 'LoadAccountList',
      }),
    },
  }
</script>
