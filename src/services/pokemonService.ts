import axios from 'axios'

const api = 'http://localhost:8092/api/v1'

export const getPokemon = async () => {
  const response = await axios.get<any>(`${api}/pokemon`)
  return response.data
}
