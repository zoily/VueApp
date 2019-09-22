import Vue from 'vue'
const countriesQuery = require('countries-code')

export default {
  namespaced: true,
  state: {
    ThreeCharCountryList: [['Country', 'Nombre de comptes']],
    SelectedCountry: null,
    AllCountryList: countriesQuery.getAllAlphaThreeCodes(),
  },
  getters: {
    AllCountryList: (state) => {
      // To avoid vuex bug that pass array by reference
      return JSON.parse(JSON.stringify(state.AllCountryList))
    },
    CountryList: (state) => {
      // To avoid vuex bug that pass array by reference
      let countryList = JSON.parse(JSON.stringify(state.ThreeCharCountryList))
      return countryList.filter((country, index) => {
        if (index > 0) {
          country[0] = countriesQuery.getCountry(country[0])
        }
        return country
      })
    },
    SelectedCountry: state => state.SelectedCountry,
  },
  mutations: {
    AddCountry: (state, account) => {
      let existInCountryList = false
      state.ThreeCharCountryList.some((country, index) => {
        if (country[0] === account.CountryCode3) {
          country[1]++
          Vue.set(state.ThreeCharCountryList, index, state.ThreeCharCountryList[index])
          existInCountryList = true
          return true
        }
        return false
      })
      if (!existInCountryList) {
        Vue.set(state.ThreeCharCountryList, state.ThreeCharCountryList.length, [account.CountryCode3, 1])
      }
    },
    SelectCountryByIndex: (state, selectedIndex) => {
      state.SelectedCountry = state.ThreeCharCountryList[selectedIndex][0]
    },
    CountryList: (state, countryList) => {
      state.ThreeCharCountryList = countryList
    },
  },
  actions: {
  },
}
