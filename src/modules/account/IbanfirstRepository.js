import Axios from 'axios'

const baseURL = 'https://sandbox.ibanfirst.com/api'
const repository = Axios.create({
  baseURL: baseURL,
  crossDomain: true,
})

export default {
  getRate (originalCurrency, destinationCurrency) {
    let instrument = originalCurrency + '/' + destinationCurrency
    return repository.get('/Rate/' + instrument, {
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
