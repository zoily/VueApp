<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      class="pt-0 pb-10"
    >
      <v-card>
        <v-row justify="center">
          <v-col
            cols="8"
            md="4"
          >
            <v-autocomplete
              :value="PreferedCurrency"
              label="Choose your prefered currency"
              :items="CurrencyList"
              filled
              outlined
              @change="SetPreferedCurrency"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="APIError"
        >
          <v-col>
            <v-alert
              type="error"
            >
              {{ APIError }}
            </v-alert>
          </v-col>
        </v-row>
        <v-container>
          <v-list
            rounded
            disabled
          >
            <v-list-item-group
              v-model="SelectedAccountList"
              multiple
              color="primary"
            >
              <v-list-item
                v-for="Account in AccountList"
                :key="Account.Bank"
              >
                <v-row
                  align="center"
                  class="text-center"
                >
                  <v-col cols="3">
                    {{ Account.Owner }}
                  </v-col>
                  <v-col cols="3">
                    {{ Account.Code }}
                  </v-col>
                  <v-col cols="2">
                    {{ Account.Bank }}
                  </v-col>
                  <v-col cols="2">
                    {{ Account.Amout }} {{ Account.Currency }}
                  </v-col>
                  <v-col cols="2">
                    <span v-if="PreferedCurrency && Account.preferedCurrencyAmout && !APIError">{{ Account.preferedCurrencyAmout }} {{ PreferedCurrency }}</span>
                    <span v-else>-</span>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
        <v-fab-transition>
          <v-btn
            absolute
            bottom
            dark
            fab
            right
            color="pink"
            @click="isOpenAccountForm = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
        <account-form
          v-if="isOpenAccountForm"
          @close="isOpenAccountForm = false"
        />
      </v-card>
    </v-col>
    <v-col
      align-self="end"
      class="pb-0"
    >
      <v-card>
        <v-container>
          <v-row align="center">
            <v-col offset-md="6">
              Consolidated balance
            </v-col>
            <v-col class="text-center">
              <span v-if="!PreferedCurrency">Please choose a currency to consolidate</span>
              <span v-else-if="!ConsolidatedBalance">There were an issue at runtime. Please refresh</span>

              <v-text-field
                v-else
                :value="ConsolidatedBalance+' '+PreferedCurrency"
                label="Sum"
                class="text-center"
                hide-details
                disabled
                outlined
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AccountForm from './AccountForm'

  export default {
    components: {
      AccountForm,
    },
    data: () => ({
      isOpenAccountForm: false,
    }),
    computed: {
      ...mapGetters('account', ['AccountList', 'PreferedCurrency', 'APIError', 'CurrencyList']),
      ...mapGetters('map', ['SelectedCountry']),
      SelectedAccountList () {
        let selectedList = []
        this.AccountList.forEach((account, index) => {
          if (account.CountryCode3 === this.SelectedCountry) {
            selectedList.push(index)
          }
        })
        return selectedList
      },
      ConsolidatedBalance () {
        let result = null

        if (!this.APIError) {
          this.AccountList.forEach((account, index) => {
            if (account.preferedCurrencyAmout) {
              result += parseInt(account.preferedCurrencyAmout)
            }
          })
        }

        return result
      },
    },
    methods: {
      ...mapActions('account', {
        SetPreferedCurrency: 'SetPreferedCurrency',
      }),
    },
  }
</script>
<style>
.v-input.text-center input {
 text-align: center;
}
</style>
