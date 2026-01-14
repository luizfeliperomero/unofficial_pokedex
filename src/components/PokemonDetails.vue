<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import type { Pokemon, EvolutionChain } from '@/models/pokemon.interface';

	const props = defineProps<{
	  pokemon: Pokemon | null
	}>();

	const evolutionList = computed(() => {
	  const list: EvolutionChain[] = [];

	  function traverse(chain: EvolutionChain) {
		list.push(chain);
		chain.evolves_to.forEach(child => traverse(child));
	  }

	  if (props.pokemon && props.pokemon.evolution_chain) {
		traverse(props.pokemon.evolution_chain);
	  }

	  return list;
	});

	const fullText = 'Click on a Pokémon to see details';
	const displayedText = ref('');
	const typingSpeed = 50;

	onMounted(() => {
	  let i = 0;
	  const interval = setInterval(() => {
		if (i < fullText.length) {
		  displayedText.value += fullText[i];
		  i++;
		} else {
		  clearInterval(interval);
		}
	  }, typingSpeed);
	});
</script>
<template>
  <div class="font-press md:max-w-170 md:min-w-170 text-xs p-5">
    <div class="w-full h-50 bg-[#8C868B] rounded-md rounded-br-[3.5rem] p-7">
      <div class="bg-[#7C9F51] text-[#D1F793] border-black w-full h-full border p-2">
		  <div v-if="pokemon == null" >
			  <span class="">{{ displayedText }}</span><span class="cursor">|</span>
		  </div>
		  <div v-else class="w-full h-full flex justify-between">
			  <div class="flex flex-col justify-evenly">
				<div>Evolutions</div>
				<div>
					<p v-for="ev in evolutionList" :key="ev.species.name">{{ ev.species.name }}</p>
				</div>
			  </div>
			  <div class="flex flex-col justify-center h-full align-center items-center gap-0">
				  <img class="p-0 w-15 h-15 object-contain select-none" v-bind:src="pokemon.sprites.front_default" />
				  <img class="p-0 w-15 h-15 object-contain select-none" v-bind:src="pokemon.sprites.front_shiny" />
			  </div>
		  </div>
	  </div>
    </div>
  </div>
</template>
<style scoped>
	.cursor {
	  display: inline-block;
	  width: 0.6ch;
	  animation: blink 0.7s steps(1) infinite;
	}

	@keyframes blink {
	  0%, 50%, 100% {
		opacity: 1;
	  }
	  25%, 75% {
		opacity: 0;
	  }
	}
</style>
