import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default { getAll }
