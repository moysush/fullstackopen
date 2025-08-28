import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`} 
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default { getAll, create, update}