<script setup lang="ts">
import PokemonDetails from '@/components/PokemonDetails.vue'
import type Pokemon from '@/models/Pokemon.interface'
import PokemonCard from '@/components/PokemonCard.vue'
import { getPokemon } from '@/services/pokemonService.ts'
import { ref, onMounted } from 'vue'

const pokemons = ref<Pokemon[]>([])

onMounted(async () => {
  try {
    //const data = await getPokemon();
	const data = [
    {
        "name": "ivysaur",
        "forms": [
            "ivysaur"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
        },
        "types": [
            "grass",
            "poison"
        ]
    },
    {
        "name": "venusaur",
        "forms": [
            "venusaur"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
        },
        "types": [
            "grass",
            "poison"
        ]
    },
    {
        "name": "charmander",
        "forms": [
            "charmander"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
        },
        "types": [
            "fire"
        ]
    },
    {
        "name": "charmeleon",
        "forms": [
            "charmeleon"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
        },
        "types": [
            "fire"
        ]
    },
    {
        "name": "charizard",
        "forms": [
            "charizard"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
        },
        "types": [
            "fire",
            "flying"
        ]
    },
    {
        "name": "squirtle",
        "forms": [
            "squirtle"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        },
        "types": [
            "water"
        ]
    },
    {
        "name": "wartortle",
        "forms": [
            "wartortle"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
        },
        "types": [
            "water"
        ]
    },
    {
        "name": "blastoise",
        "forms": [
            "blastoise"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
        },
        "types": [
            "water"
        ]
    },
    {
        "name": "caterpie",
        "forms": [
            "caterpie"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
        },
        "types": [
            "bug"
        ]
    },
    {
        "name": "metapod",
        "forms": [
            "metapod"
        ],
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/11.png",
            "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"
        },
        "types": [
            "bug"
        ]
    }
];
    pokemons.value = data;
  } catch (err) {}
})
</script>
<template>
  <PokemonDetails />
  <div class="flex flex-wrap gap-5 justify-center">
    <PokemonCard :pokemon="p" v-for="p in pokemons" :key="p.name"/>
  </div>
</template>
