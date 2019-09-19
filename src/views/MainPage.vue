<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert type="error">
          Unable to join the account server. Try again later
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        md="6"
        cols="12"
      >
        <account-list />
      </v-col>
      <v-col md="6">
        <interactive-map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AccountList from '@/modules/account/AccountList'
  import InteractiveMap from '@/modules/map/Map'
  export default {
    components: {
      InteractiveMap,
      AccountList,
    },
    data: () => ({}),
  }
</script>
