import axios from 'axios'
import type Pokemon from '@/models/Pokemon.interface'

const api = 'http://localhost:8092/api/v1'

export const getPokemon = async (limit, offset) => {
  const response = await axios.get<Pokemon[]>(`${api}/pokemon`, {
	  params: { limit, offset }
  });
  return response.data;
}

export const getPokemonByName = async (name) => {
  const response = await axios.get<Pokemon>(`${api}/pokemon/${name}`);
  return response.data;
}

export const getPokemonCount = async () => {
  const response = await axios.get<Pokemon[]>(`${api}/pokemon/count`)
  return response.data;
}

export const getPokemonByType = async (
  limit: number,
  offset: number,
  types: string[],
) => {
  const response = await axios.post<Pokemon[]>(`${api}/pokemon/type`, {
    types,
    limit,
    offset,
  });

  return response.data;
};
