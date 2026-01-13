<script setup lang="ts">
import PokemonDetails from '@/components/PokemonDetails.vue'
import type Pokemon from '@/models/Pokemon.interface'
import PokemonCard from '@/components/PokemonCard.vue'
import { getPokemon, getPokemonByName, getPokemonCount, getPokemonByType } from '@/services/pokemonService.ts'
import { ref, onMounted } from 'vue'
import mockPokemon from '@/../mock_pokemon.json';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { TYPE_COLORS } from '@/constants/pokemonTypes.ts';

const pokemons = ref<Pokemon[]>([])
const pokemonCount = ref(0);
const searchInput = ref("");
const filterVisible = ref(false);
const showFavorites = ref(false);
const selectedTypes = ref<Set<string>>(new Set());
const user = JSON.parse(localStorage.getItem('user'));

const toggleType = (type: string) => {
  if (selectedTypes.value.has(type)) {
    selectedTypes.value.delete(type);
  } else {
    selectedTypes.value.add(type);
  }
};

const cancelFilters = () => {
  selectedTypes.value.clear();
  filterVisible.value = false;
};

async function applyFilters() {
  const types = Array.from(selectedTypes.value);
  if(showFavorites.value) {
	loadPage(getUserPokemon, currentPage.value, types)
  } else {
	loadPage(getPokemonByType, currentPage.value, types)
  }

  filterVisible.value = false;
};

onMounted(async () => {
  try {
	const data = mockPokemon;
    pokemons.value = data;
	pokemonCount.value = await getPokemonCount();
  } catch (err) {}
})
const selectedPokemon = ref<Pokemon | null>(null);
const rows = ref(10);
const currentPage = ref(1);

async function loadPage(getPokemonCallback, page: number, types?: string[]) {
  const offset = ((page - 1) * rows.value) + 1;
  const data = await getPokemonCallback(rows.value, offset, types);
  pokemons.value = Array.isArray(data[0]) ? data[0] : data;
}

const getUserPokemon = () => {
	return user.pokemons;
}

function onPageChange(event: { page: number; rows: number }) {
  const types = Array.from(selectedTypes.value);
  currentPage.value = event.page + 1;
  rows.value = event.rows;
  if(types.length > 0) {
	 loadPage(getPokemonByType, currentPage.value, types);
  } else {
	 loadPage(getPokemon, currentPage.value);
  }
}

async function onSearch() {
  if (!searchInput.value.trim()) {
	  const types = Array.from(selectedTypes.value);
	  if(types.length > 0) {
		 loadPage(getPokemonByType, currentPage.value, types);
	  } else {
		 loadPage(getPokemon, currentPage.value);
	  }
	  return;
  }
  try {
	  const response = await getPokemonByName(searchInput.value);
	  let arr: Pokemon[] = [];
      arr.push(response);
	  pokemons.value = arr;
  } catch(err) {
	  pokemons.value = [];
  }
}

function onPokemonSelected(pokemon: Pokemon) {
	selectedPokemon.value = pokemon;
}
const value = ref(null);
</script>
<template>
<div class="md:pl-200 md:pr-200">
  <PokemonDetails :pokemon="selectedPokemon" />
  <div class="flex flex-col align-center items-center gap-10">
	  <div class="flex justify-center align-center items-center gap-5">
		  <div></div>
		  <IconField>
			<InputIcon class="pi pi-search" />
			<InputText @keydown.enter="onSearch" v-model="searchInput" placeholder="Search for name" />
		  </IconField>
		  <i @click="filterVisible = true" class="pi pi-filter"></i>
		  <Dialog
  v-model:visible="filterVisible"
  modal
  header="Filter by Type"
  :style="{ width: '25rem' }"
>
  <div class="flex flex-wrap gap-2 max-h-40 overflow-auto mb-4">
    <button
      type="button"
      class="px-2 py-1 bg-yellow-500 rounded text-xs capitalize transition-all"
	  :style="{
        opacity: showFavorites ? 1 : 0.4,
	  }"
      @click="showFavorites = !showFavorites"
    >
		Favorites
    </button>
    <button
      v-for="(color, type) in TYPE_COLORS"
      :key="type"
      type="button"
      class="px-2 py-1 rounded text-xs capitalize transition-all"
      :style="{
        backgroundColor: color,
        opacity: selectedTypes.has(type) ? 1 : 0.4,
        boxShadow: selectedTypes.has(type)
          ? '0 0 0 2px white inset'
          : 'none'
      }"
      @click="toggleType(type)"
    >
      {{ type }}
    </button>
  </div>

  <!-- Actions -->
  <div class="flex justify-end gap-2">
    <Button
      label="Cancel"
      severity="secondary"
      size="small"
      @click="cancelFilters"
    />
    <Button
      label="Apply"
      size="small"
      @click="applyFilters"
    />
  </div>
</Dialog>
	  </div>
	  <div v-if="pokemons && pokemons.length > 0">
	  <div  class="flex flex-wrap gap-5 justify-center">
		<PokemonCard :pokemon="p" @select="onPokemonSelected" v-for="p in pokemons" :key="p.name"/>
	  </div>
	  <div class="p-10">
	  <Paginator
		  :rows="rows"
		  :totalRecords="pokemonCount"
		  :first="(currentPage - 1) * rows"
		  :pageLinkSize="3"
		  @page="onPageChange"
		  template="PrevPageLink PageLinks NextPageLink"
	  />
	  </div>
     </div>
	 <p v-else>Pokémon Not Found</p>
  </div>
	</div>
</template>
