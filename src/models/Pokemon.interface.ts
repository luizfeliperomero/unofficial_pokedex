import type Sprites from '@/models/sprites.interface'

interface Species {
	name: string,
	url: string
}

export interface EvolutionChain {	
	species: Species,
	evolves_to: EvolutionChain[]
}

export interface Pokemon {
  name: string,
  sprites: Sprites,
  types: string[],
  evolution_chain: EvolutionChain
}
