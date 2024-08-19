import axios from 'axios'
// const baseUrl = '/api/login'
// TODO: Figure out why on linux, this wants full addr
const baseUrl = 'http://localhost:27017/api/login'
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
