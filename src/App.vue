<script setup lang="ts">
	import { RouterView, useRoute, useRouter } from 'vue-router'
	import Navbar from '@/components/Navbar.vue'
	import { onMounted } from 'vue';
	import Toast from 'primevue/toast';

    const router = useRouter();

	onMounted(() => {
		if(localStorage.jwt) {
			router.push("/");
		} else {
			router.push("/auth");
		}
	});

    const route = useRoute()
</script>
<template>
   <Toast position="top-right"/>
   <RouterView />
   <div v-if="!route.meta.hideNavbar" class="pb-20 md:pl-20">
     <Navbar />
   </div>
</template
