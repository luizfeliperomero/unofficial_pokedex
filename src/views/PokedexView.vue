<script setup lang="ts">
import PokemonDetails from '@/components/PokemonDetails.vue'
import type Pokemon from '@/models/Pokemon.interface'
import PokemonCard from '@/components/PokemonCard.vue'
import { getPokemon, getPokemonCount } from '@/services/pokemonService.ts'
import { ref, onMounted } from 'vue'
import mockPokemon from '@/../mock_pokemon.json';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const pokemons = ref<Pokemon[]>([])
const pokemonCount = ref(0);

onMounted(async () => {
  try {
    //const data = await getPokemon(10, 1);
	const data = mockPokemon;
    pokemons.value = data;
	pokemonCount.value = await getPokemonCount();
  } catch (err) {}
})
const selectedPokemon = ref<Pokemon | null>(null);
const rows = ref(10);
const currentPage = ref(1);

async function loadPage(page: number) {
  const offset = ((page - 1) * rows.value) + 1;
  const data = await getPokemon(rows.value, offset);
  pokemons.value = data;
}

function onPageChange(event: { page: number; rows: number }) {
  currentPage.value = event.page + 1;
  rows.value = event.rows;
  loadPage(currentPage.value);
}

function onPokemonSelected(pokemon: Pokemon) {
	selectedPokemon.value = pokemon;
}
const value = ref(null);
</script>
<template>
  <PokemonDetails :pokemon="selectedPokemon" />
  <div class="flex flex-col align-center items-center gap-10">
	  <div class="flex justify-center align-center items-center gap-5">
		  <div></div>
		  <IconField>
			<InputIcon class="pi pi-search" />
			<InputText v-model="value1" placeholder="Search" />
		  </IconField>
		  <i class="pi pi-filter"></i>
	  </div>
	  <div class="flex flex-wrap gap-5 justify-center">
		<PokemonCard :pokemon="p" @select="onPokemonSelected" v-for="p in pokemons" :key="p.name"/>
	  </div>
  </div>
  <Paginator
	  :rows="rows"
	  :totalRecords="pokemonCount"
	  :rowsPerPageOptions="[10, 20, 30]"
	  :first="(currentPage - 1) * rows"
	  @page="onPageChange"
	  :template="{
		'640px': 'PrevPageLink CurrentPageReport NextPageLink',
		'960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
		'1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
		default: 'FirstPageLink PrevPageLink PageLinks NextPageLink JumpToPageDropdown JumpToPageInput'
	  }"
	/>
</template>
