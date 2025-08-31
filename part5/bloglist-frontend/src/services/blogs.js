import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async(newObj, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

export default { getAll, create }