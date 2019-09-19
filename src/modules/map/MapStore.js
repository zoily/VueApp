const countriesQuery = require('countries-code')

export default {
  namespaced: true,
  state: {
    ThreeCharCountryList: [],
    SelectedCountry: null,
  },
  getters: {
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
    SelectCountryByIndex: (state, selectedIndex) => {
      // +1 to avoid the title row
      state.SelectedCountry = state.ThreeCharCountryList[selectedIndex][0]
    },
    CountryList: (state, countryList) => {
      state.ThreeCharCountryList = countryList
    },
  },
  actions: {
  },
}
