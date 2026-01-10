<script setup lang="ts">
import type Pokemon from '@/models/Pokemon.interface'

defineProps<{
  pokemon: Pokemon
}>()

const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const TYPE_COLORS: Record<string, string> = {
  fire: '#ef4444',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#eab308',
  ice: '#67e8f9',
  fighting: '#b91c1c',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#38bdf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#a16207',
  ghost: '#6366f1',
  dragon: '#7c3aed',
  dark: '#1f2937',
  steel: '#9ca3af',
  fairy: '#f472b6',
};

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
    <img class="p-0 w-24 h-24 object-contain select-none" v-bind:src="pokemon.sprites.official_artwork" />
    <p class="text-sm font-bold text-center w-full">{{ capitalize(pokemon.name) }}</p>
	<div class="flex flex-wrap gap-1">
		<div class="rounded-sm p-1 text-xs overflow-auto" :style="{ backgroundColor: getTypeColor(t), color: getContrastTextColor(getTypeColor(t)) }" v-for="t in pokemon.types" :key="t">{{ capitalize(t) }}</div>
	</div>
  </div>
</template>
