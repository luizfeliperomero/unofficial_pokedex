import axios from 'axios'
import type Pokemon from '@/models/Pokemon.interface'

const api = 'http://localhost:8092/api/v1'

export const getPokemon = async () => {
  const response = await axios.get<Pokemon[]>(`${api}/pokemon`)
  return response.data
}
