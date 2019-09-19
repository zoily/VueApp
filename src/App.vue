<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>IBanFirst</span>
        <span class="font-weight-light"> Application de test</span>
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

  export default {
    name: 'App',
    components: {
      MainPage,
    },
    data: () => ({
    //
    }),
  }
</script>
