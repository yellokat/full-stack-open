// noinspection DuplicatedCode
import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

const remove = ({ id, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove }
