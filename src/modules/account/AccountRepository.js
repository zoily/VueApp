// const baseURL = 'https://platform.ibanfirst.com'

export default {
  getAccounts () {
    return new Promise((resolve, reject) => {
        resolve({ 'data': { 'counterpart': [{ 'CountryCode3': 'USA', 'Amout': '10 000.00', 'Currency': 'USD', 'Code': '1234564789', 'Bank': 'CHASUS33XXX', 'Owner': 'counterpart 1 compte USA' }, { 'CountryCode3': 'BEL', 'Amout': '500.00', 'Currency': 'EUR', 'Code': 'BE67914000046387', 'Bank': 'FXBBBEBBXXX', 'Owner': 'counterpart 2 compte BEL' }, { 'CountryCode3': 'FRA', 'Amout': '7 500.00', 'Currency': 'EUR', 'Code': '1234564789', 'Bank': 'FXFRBEBBXXX', 'Owner': 'counterpart 3 compte FRA' }] } })
    })
  },
}
