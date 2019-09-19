import Axios from 'axios'

// const baseURL = 'https://platform.ibanfirst.com'
const baseURL = process.env.VUE_ACCOUNT_API_URL
const repository = Axios.create({
  baseURL: baseURL,
  crossDomain: true,
})

export default {
  get () {
    return repository.get('js/dataTestDevFront.json', {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  },
}
