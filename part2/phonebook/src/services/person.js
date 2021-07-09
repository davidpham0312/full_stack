import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const saveAdded = data => {
  const request = axios.post(url, data)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newContact) => {
  const request = axios.put(`${url}/${id}`, newContact)
  return request.then(response => response.data)
}

export default {
  getAll, saveAdded, deletePerson, update
}