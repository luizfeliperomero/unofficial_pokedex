<script setup lang="ts">
import type Pokemon from '@/models/Pokemon.interface'
import { TYPE_COLORS } from '@/constants/pokemonTypes.ts';

const props = defineProps<{
  pokemon: Pokemon
}>();

const emitPokemon = defineEmits<{
  (e: 'select', pokemon: Pokemon): void
}>();

const handleIMGClick = () => {
  emitPokemon('select', props.pokemon);
}

const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}


const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type.toLowerCase()] ?? '#9ca3af';
};

const getContrastTextColor = (bgColor: string): '#000' | '#fff' => {
  const color = bgColor.replace('#', '')

  const r = color.length === 3
    ? parseInt(color[0] + color[0], 16)
    : parseInt(color.substring(0, 2), 16)

  const g = color.length === 3
    ? parseInt(color[1] + color[1], 16)
    : parseInt(color.substring(2, 4), 16)

  const b = color.length === 3
    ? parseInt(color[2] + color[2], 16)
    : parseInt(color.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? '#000' : '#fff'
}


</script>
<template>
  <div class="p-2 w-30 h-42 rounded-md flex flex-col justify-between items-center shadow-lg">
	<div class="flex justify-end w-full">
	<i class="pi pi-star"></i>
	</div>
    <img @click="handleIMGClick" class="p-0 w-24 h-24 object-contain select-none cursor-pointer hover:scale-120" v-bind:src="pokemon.sprites.official_artwork" />
    <p class="text-sm font-bold text-center w-full">{{ capitalize(pokemon.name) }}</p>
	<div class="flex flex-wrap gap-1">
		<div class="rounded-sm p-1 text-xs overflow-auto" :style="{ backgroundColor: getTypeColor(t), color: getContrastTextColor(getTypeColor(t)) }" v-for="t in pokemon.types" :key="t">{{ capitalize(t) }}</div>
	</div>
  </div>
</template>
