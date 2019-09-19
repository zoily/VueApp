<template>
  <v-row>
    <v-col
      cols="12"
      class="pt-0"
    >
      <v-card>
        <v-row justify="center">
          <v-col cols="4">
            <v-autocomplete
              :value="PreferedCurrency"
              label="Choose your prefered currency"
              :items="currencyList"
              filled
              outlined
              @change="SetPreferedCurrency"
            />
          </v-col>
        </v-row>
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
                <v-col>
                  {{ Account.Owner }}
                </v-col>
                <v-col>
                  {{ Account.Code }}
                </v-col>
                <v-col>
                  {{ Account.Bank }}
                </v-col>
                <v-col>
                  {{ Account.Amout }} {{ Account.Currency }}
                </v-col>
                <v-col>
                  <span v-if="PreferedCurrency && Account.preferedCurrencyAmout">{{ Account.preferedCurrencyAmout }} {{ PreferedCurrency }}</span>
                  <span v-else>-</span>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-container>
          <v-row align="center">
            <v-col offset="6">
              Consolidated balance
            </v-col>
            <v-col class="text-center">
              <span v-if="!PreferedCurrency">Please choose a currency to consolidate</span>
              <span v-else-if="!ConsolidatedBalance">There were an issue at runtime. Please refresh</span>

              <v-text-field
                v-else
                label="Outlined"
                outlined
              >
                {{ ConsolidatedBalance }} {{ PreferedCurrency }}
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      currencyList: ['EUR', 'USD'],
    }),
    computed: {
      ...mapGetters('account', ['AccountList', 'PreferedCurrency']),
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
        let result = this.AccountList.reduce((accumulator, current) => {
          if (current.preferedCurrencyAmout) {
            return accumulator + current.preferedCurrencyAmout
          }
        })
        if (result) {
          return result
        } else {
          return null
        }
      },
    },
    created () {
      this.initAccount()
    },
    methods: {
      ...mapActions('account', {
        initAccount: 'LoadAccountList',
        SetPreferedCurrency: 'SetPreferedCurrency',
      }),
    },
  }
</script>
