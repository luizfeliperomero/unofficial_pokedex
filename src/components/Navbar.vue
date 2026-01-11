<script setup lang="ts">
	import { RouterLink } from 'vue-router'
    import { ref, computed } from 'vue'
	const items = [
	  { label: 'Pokédex', icon: 'pi pi-book', to: '/' },
	  { label: 'Favorites', icon: 'pi pi-star', to: '/search' },
	  { label: 'Profile', icon: 'pi pi-user', to: '/search' },
	]

	const darkIcon = "pi pi-moon";
	const lightIcon = "pi pi-sun";
    const isDark = ref(false);
    const toggleDarkMode = () => {
	document.body.classList.toggle('dark');
	isDark.value = document.body.classList.contains('dark');
    };
    const toggleIcon = computed(() => (isDark.value ? darkIcon : lightIcon))
</script>

<template>
  <nav
    class="
      fixed z-50 bg-background border-gray-200 dark:border-[#2b2b2b]
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
        class="flex flex-col items-center justify-center text-gray-600 dark:text-white transition"
      >
        <RouterLink
          :to="item.to"
          class="flex flex-col items-center gap-1"
        >
          <i :class="item.icon" class="text-xl"></i>
          <span class="text-xs md:hidden">{{ item.label }}</span>
        </RouterLink>
      </li>
	  <i :class="toggleIcon" @click="toggleDarkMode"></i>
    </ul>
  </nav>
</template>
