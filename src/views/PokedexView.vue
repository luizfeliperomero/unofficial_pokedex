<script setup lang="ts">
import PokemonDetails from '@/components/PokemonDetails.vue'
import type Pokemon from '@/models/Pokemon.interface'
import PokemonCard from '@/components/PokemonCard.vue'
import { getPokemon } from '@/services/pokemonService.ts'
import { ref, onMounted } from 'vue'
import mockPokemon from '@/../mock_pokemon.json';

const pokemons = ref<Pokemon[]>([])

onMounted(async () => {
  try {
    //const data = await getPokemon();
	const data = mockPokemon;
    pokemons.value = data;
  } catch (err) {}
})
const selectedPokemon = ref<Pokemon | null>(null);
function onPokemonSelected(pokemon: Pokemon) {
	selectedPokemon.value = pokemon;
}
</script>
<template>
  <PokemonDetails :pokemon="selectedPokemon" />
  <div class="flex flex-wrap gap-5 justify-center">
    <PokemonCard :pokemon="p" @select="onPokemonSelected" v-for="p in pokemons" :key="p.name"/>
  </div>
</template>
