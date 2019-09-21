import AccountRepository from './AccountRepository'
import IBanFirstRepository from './IbanfirstRepository'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    AccountList: [],
    PreferedCurrency: null,
    APIError: null,
  },
  getters: {
    AccountList: state => state.AccountList,
    PreferedCurrency: state => state.PreferedCurrency,
    APIError: state => state.APIError,
  },
  mutations: {
    SetAccountList: (state, accountList) => {
      state.AccountList = accountList.counterpart
    },
    ThrowError: (state, error) => {
      state.APIError = error
    },
    ChangePreferedCurrency: (state, chosenCurrency) => {
      state.PreferedCurrency = chosenCurrency
    },
    SetPreferedCurrencyAmoutForAccount: (state, { index, preferedCurrencyAmout }) => {
      state.AccountList[index].preferedCurrencyAmout = preferedCurrencyAmout
      Vue.set(state.AccountList, index, state.AccountList[index])
    },
  },
  actions: {
    SetPreferedCurrency: ({ commit, dispatch, getters }, chosenCurrency) => {
        commit('ChangePreferedCurrency', chosenCurrency)
        let rateList = []
        Array.from(getters.AccountList).forEach((account, index) => {
          dispatch('GetMyConvertedAmount', { rateList, account }).then(result => {
            commit('SetPreferedCurrencyAmoutForAccount', { index: index, preferedCurrencyAmout: result })
          }).catch(error => {
            commit('ThrowError', error)
            commit('SetPreferedCurrencyAmoutForAccount', { index: index, preferedCurrencyAmout: null })
          })
        })
    },
    GetMyConvertedAmount: ({ getters, commit }, { rateList, account }) => {
      return new Promise((resolve, reject) => {
        if (account.Currency === getters.PreferedCurrency) {
          resolve(parseInt(account.Amout.replace(/ /g, '')))
        } else {
          let myRate = rateList.find(rate => { return rate.instrument === account.Currency + getters.PreferedCurrency })
          if (myRate) {
            resolve(myRate.rate * parseInt(account.Amout.replace(/ /g, '')))
          } else {
            IBanFirstRepository.getRate(account.Currency, getters.PreferedCurrency).then(result => {
              if (result.data.errorMessage && result.data.errorMessage.length !== 0) {
                reject(result.data.errorMessage)
              } else {
                rateList.push(result.data.rate)
                resolve(result.data.rate.rate * parseInt(account.Amout.replace(/ /g, '')))
              }
            }).catch(error => {
              console.log(error)
              let errorMessage = 'Unable to join the iBanFirst server. Try again later'
              reject(errorMessage)
            })
          }
        }
      })
    },
    LoadAccountList: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        AccountRepository.getAccounts()
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
