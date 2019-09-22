<template>
  <v-dialog
    value="true"
    max-width="290"
    persistent
  >
    <v-card>
      <v-card-title class="headline">
        Create a new account
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="newAccount.Owner"
            :rules="[v => !!v || 'Owner is required']"
            required
            label="Owner"
          />
          <v-text-field
            v-model="newAccount.Code"
            :rules="[v => !!v || 'Code is required']"
            required
            label="Code"
          />
          <v-text-field
            v-model="newAccount.Bank"
            :rules="[v => !!v || 'Bank is required']"
            required
            label="Bank"
          />
          <v-text-field
            v-model="newAccount.Amout"
            type="number"
            :rules="[v => !!v || 'Amount is required']"
            required
            label="Amount"
          />
          <v-autocomplete
            v-model="newAccount.CountryCode3"
            :rules="[v => !!v || 'Country is required']"
            :items="AllCountryList"
            required
            label="Country"
          />
          <v-autocomplete
            v-model="newAccount.Currency"
            :rules="[v => !!v || 'Currency is required']"
            :items="CurrencyList"
            required
            label="Currency"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1" />

        <v-btn
          color="gray darken-1"
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>

        <v-btn
          :disabled="!valid"
          color="green darken-1"
          text
          @click="AddAccountAndCountry(newAccount);$emit('close')"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
      valid: false,
      newAccount: {},
    }),
    computed: {
      ...mapGetters('account', ['CurrencyList']),
      ...mapGetters('map', ['AllCountryList']),
      isOpen () { return this.value },
    },
    created () {
    },
    methods: {
      ...mapActions('account', {
        AddAccountAndCountry: 'AddAccountAndCountry',
      }),
    },
  }
</script>
<style>
.v-input.text-center input {
 text-align: center;
}
</style>
