import axios from 'axios'
const baseUrl = '/api/blogs'

const config = (token) => {
  return {
    headers: {Authorization: `Bearer ${token}`}
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async(newObj, token) => {
  const response = await axios.post(baseUrl, newObj, config(token))
  return response.data
}

const update = async(newObj, token) => {
  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj, config(token))
  return response.data
}

export default { getAll, create, update }