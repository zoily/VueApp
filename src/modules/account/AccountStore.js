import AccountRepository from './AccountRepository'
import IBanFirstRepository from './IbanfirstRepository'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    AccountList: [],
    PreferedCurrency: null,
    APIError: null,
    CurrencyList: ['EUR', 'USD'],
  },
  getters: {
    AccountList: state => state.AccountList,
    PreferedCurrency: state => state.PreferedCurrency,
    APIError: state => state.APIError,
    CurrencyList: state => state.CurrencyList,
  },
  mutations: {
    AddAccount: (state, account) => {
      Vue.set(state.AccountList, state.AccountList.length, account)
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
    AddAccountAndCountry: ({ commit, dispatch, getters }, account) => {
      commit('map/AddCountry', account, { root: true })
      let rateList = []
      if (getters.PreferedCurrency !== null) {
        dispatch('GetMyConvertedAmount', { rateList, account }).then(result => {
          account.preferedCurrencyAmout = result
          commit('AddAccount', account)
        }).catch(error => {
          commit('AddAccount', account)
          commit('ThrowError', error)
        })
      } else {
        commit('AddAccount', account)
      }
    },
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
    GetMyConvertedAmount: ({ getters }, { rateList, account }) => {
      return new Promise((resolve, reject) => {
        if (account.Currency === getters.PreferedCurrency) {
          resolve(parseInt(account.Amout.replace(/ /g, '')))
        } else {
          let myRate = rateList.find(rate => { return rate.instrument === account.Currency + getters.PreferedCurrency })
          if (myRate) {
            resolve(Math.round(myRate.rate * parseInt(account.Amout.replace(/ /g, '')) * 100) / 100)
          } else {
            IBanFirstRepository.getRate(account.Currency, getters.PreferedCurrency).then(result => {
              if (result.data.errorMessage && result.data.errorMessage.length !== 0) {
                reject(result.data.errorMessage)
              } else {
                rateList.push(result.data.rate)
                resolve(Math.round(result.data.rate.rate * parseInt(account.Amout.replace(/ /g, '')) * 100) / 100)
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
    LoadAccountList: ({ dispatch }) => {
      return new Promise((resolve, reject) => {
        AccountRepository.getAccounts()
          .then(result => {
            result.data.counterpart.forEach((account) => {
              dispatch('AddAccountAndCountry', account)
            })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
