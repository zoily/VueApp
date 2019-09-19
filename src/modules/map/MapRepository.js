import Axios from 'axios'

const baseURL = 'https://nominatim.openstreetmap.org/search.php';
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
