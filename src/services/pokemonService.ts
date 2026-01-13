import api from './api.js'
import type Pokemon from '@/models/Pokemon.interface'

export const getPokemon = async (limit, offset) => {
  const response = await api.get<Pokemon[]>(`/pokemon`, {
	  params: { limit, offset }
  });
  return response.data;
}

export const getPokemonByName = async (name) => {
  const response = await api.get<Pokemon>(`/pokemon/${name}`);
  return response.data;
}

export const getPokemonCount = async () => {
  const response = await api.get<Pokemon[]>(`/pokemon/count`)
  return response.data;
}

export const getPokemonByType = async (
  limit: number,
  offset: number,
  types: string[],
) => {
  const response = await api.post<Pokemon[]>(`/pokemon/type`, {
    types,
    limit,
    offset,
  });

  return response.data;
};
