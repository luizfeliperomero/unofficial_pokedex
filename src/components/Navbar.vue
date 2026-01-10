<script setup lang="ts">
	import { RouterLink } from 'vue-router'
	const items = [
	  { label: 'Pokédex', icon: 'pi pi-book', to: '/' },
	  { label: 'Favorites', icon: 'pi pi-star', to: '/search' },
	  { label: 'Profile', icon: 'pi pi-user', to: '/search' },
	]
</script>

<template>
  <nav
    class="
      fixed z-50 bg-white border-gray-200
      flex
      bottom-0 left-0 right-0 h-16 border-t
      md:top-0 md:bottom-0 md:left-0 md:right-auto md:h-full md:w-20 md:border-t-0 md:border-r
    "
  >
    <ul
      class="
        flex w-full h-full
        flex-row justify-around items-center
        md:flex-col md:justify-start md:gap-6 md:pt-6
      "
    >
	  <img class="h-16 w-16 object-contain" src="@/../public/unofficial_pokedex.png" />
      <li
        v-for="item in items"
        :key="item.label"
        class="flex flex-col items-center justify-center text-gray-600 hover:text-primary transition"
      >
        <RouterLink
          :to="item.to"
          class="flex flex-col items-center gap-1"
        >
          <i :class="item.icon" class="text-xl"></i>
          <span class="text-xs md:hidden">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
