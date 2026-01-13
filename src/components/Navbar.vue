<script setup lang="ts">
	import { RouterLink } from 'vue-router'
    import { ref, computed } from 'vue'
	const items = [
	  { label: 'Pokédex', icon: 'pi pi-book', to: '/' },
	  { label: 'Profile', icon: 'pi pi-user', to: '/profile' },
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
      md:top-0 md:bottom-0 md:left-0 md:right-auto md:h-full md:w-30 md:border-t-0 md:border-r
    "
  >
    <ul
      class="
        flex w-full h-full
        flex-row justify-around items-center
        md:flex-col md:justify-start md:gap-16 md:pt-6
      "
    >
	  <img class="h-16 w-16 md-24 md:w-24 object-contain" src="@/../public/unofficial_pokedex.png" />
      <li
        v-for="item in items"
        :key="item.label"
        class="flex flex-col items-center justify-center text-gray-600 dark:text-white transition"
      >
        <RouterLink
          :to="item.to"
          class="flex flex-col items-center gap-1"
		  active-class="text-[#2A75BB] dark:text-[#FFCB05]"
        >
          <i :class="item.icon" class="text-xl md:text-lg"></i>
          <span class="text-xs md:text-lg">{{ item.label }}</span>
        </RouterLink>
      </li>
	  <i :class="toggleIcon" class="cursor-pointer" @click="toggleDarkMode"></i>
    </ul>
  </nav>
</template>
