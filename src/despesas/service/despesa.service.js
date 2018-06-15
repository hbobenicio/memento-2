import axios from 'axios'
import FirebaseUtils from '@/shared/firebase/firebase.utils'

const axiosInstance = axios.create({
  baseURL: 'https://memento-31b51.firebaseio.com'
})

class DespesaService {
  constructor () {}

  all () {
    const resourcePath = '/despesas.json'
    return axiosInstance.get(resourcePath).then(FirebaseUtils.responseToList)
  }

  findById (despesaId) {
    const resourcePath = `/despesas/${despesaId}.json`
    return axiosInstance.get(resourcePath)
      .then(response => response.data)
      .then(data => ({id: despesaId, ...data}))
  }

  allByMonth (month) {
    // https://memento-31b51.firebaseio.com/despesas.json?orderBy=%22mes%22&startAt=1&endAt=1
    const resourcePath = '/despesas.json'
    const fullPath = `${resourcePath}?orderBy="mes"&startAt=${month}&endAt=${month}`
    return axiosInstance.get(fullPath).then(FirebaseUtils.responseToList)
  }

  create (despesa) {
    return axiosInstance.post('/despesas.json', despesa)
  }

  update (despesaId, despesa) {
    return axiosInstance.patch(`/despesas/${despesaId}.json`, despesa)
  }

  delete (despesaId) {
    return axiosInstance.delete(`/despesas/${despesaId}.json`)
  }
}

export default new DespesaService()
