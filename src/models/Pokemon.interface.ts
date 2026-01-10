import type Sprites from '@/models/sprites.interface'

export interface Pokemon {
  name: string
  forms: string[]
  sprites: Sprites
  types: string[]
}
