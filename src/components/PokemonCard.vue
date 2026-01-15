<script setup lang="ts">
import type Pokemon from '@/models/Pokemon.interface'
import { TYPE_COLORS } from '@/constants/pokemonTypes.ts';
import { savePokemon, deletePokemon } from '@/services/userService.ts';
import { useToast } from 'primevue/usetoast';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user = userStore.user;

const toast = useToast();

const props = defineProps<{
  pokemon: Pokemon
}>();

const image_placeholder = "../assets/no_poke_img.png"

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

const isFavorite = computed(() => {
  if (!user || !user.pokemons) return false;

  return user.pokemons.some(p => p.name === props.pokemon.name);
});


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

const toggleFavorite = async () => {
  if (!user) return;

  const favoriteIndex = user.pokemons.findIndex(p => p.name === props.pokemon.name);

  if (favoriteIndex !== -1) {
	const response = await deletePokemon(props.pokemon.name);
	if(response.status === 200) {
		user.pokemons.splice(favoriteIndex, 1);
		toast.add({
		  severity: 'info',
		  summary: 'Removed from favorites',
		  detail: `${capitalize(props.pokemon.name)} removed!`,
		  life: 3000
		});
	}
  } else {
    const response = await savePokemon(props.pokemon);
    if (response.status === 201) {
      user.pokemons.push(props.pokemon);
      toast.add({
        severity: 'success',
        summary: 'Added to favorites',
        detail: `${capitalize(props.pokemon.name)} added!`,
        life: 3000
      });
    }
  }
};

</script>
<template>
  <div class="p-2 w-30 h-42 rounded-md flex flex-col justify-between items-center shadow-lg dark:bg-[#262523]">
	<div @click="toggleFavorite" class="flex justify-end w-full">
	<i :class="isFavorite ? 'pi-star-fill text-yellow-400' : 'pi-star text-gray-400'" class="pi cursor-pointer hover:scale-120"></i>
	</div>
    <img v-if="pokemon.sprites.official_artwork" @click="handleIMGClick" class="p-0 w-24 h-24 object-contain select-none cursor-pointer hover:scale-120" v-bind:src="pokemon.sprites.official_artwork" />
    <img v-else @click="handleIMGClick" class="p-0 w-24 h-24 object-contain select-none cursor-pointer hover:scale-120" src="@/assets/no_poke_img.png" />
    <p class="text-sm font-bold text-center w-full">{{ capitalize(pokemon.name) }}</p>
	<div class="flex flex-wrap gap-1">
		<div class="rounded-sm p-1 text-xs overflow-auto" :style="{ backgroundColor: getTypeColor(t), color: getContrastTextColor(getTypeColor(t)) }" v-for="t in pokemon.types" :key="t">{{ capitalize(t) }}</div>
	</div>
  </div>
</template>
