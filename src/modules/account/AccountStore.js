import AccountRepository from './AccountRepository'
import IBanFirstRepository from './IbanfirstRepository'

export default {
  namespaced: true,
  state: {
    AccountList: [],
    PreferedCurrency: null,
    RateList: [],
  },
  getters: {
    AccountList: state => state.AccountList,
    PreferedCurrency: state => state.PreferedCurrency,
    RateList: state => state.RateList,
  },
  mutations: {
    SetAccountList: (state, accountList) => {
      state.AccountList = accountList.counterpart
    },
    ChangePreferedCurrency: (state, chosenCurrency) => {
      state.PreferedCurrency = chosenCurrency
    },
  },
  actions: {
    SetPreferedCurrency: ({ commit, state }, chosenCurrency) => {
      commit('ChangePreferedCurrency', chosenCurrency)
      return new Promise((resolve, reject) => {
        let rateList = []
        state.AccountList.forEach((account) => {
          let myRate = rateList.find(rate => { return rate.currency === account.Currency })
          if (myRate) {
            account.preferedCurrencyAmout = myRate.rate * account.Currency
          } else {
            IBanFirstRepository.getRate(account.Currency, state.PreferedCurrency).then(result => {
              if (result.data.errorMessage || result.data.errorMessage.length === 0) {
                rateList.push(result.data.rate)
                account.preferedCurrencyAmout = result.data.rate.rate * account.Currency
              } else {
                reject(result.data.errorMessage)
              }
            })
            .catch(error => {
              reject(error)
            })
          }
        })
        resolve()
      })
    },
    LoadAccountList: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        AccountRepository.get()
          .then(result => {
            commit('SetAccountList', result.data)

            let countryList = [['Country', 'Nombre de comptes']]
            state.AccountList.forEach((account) => {
              let existInCountryList = false
              countryList.forEach(country => {
                if (country[0] === account.CountryCode3) {
                  country[1]++
                  existInCountryList = true
                }
              })
              if (!existInCountryList) {
                countryList.push([account.CountryCode3, 1])
              }
            })
            commit('map/CountryList', countryList, { root: true })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
