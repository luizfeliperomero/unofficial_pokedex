<script setup lang="ts">
	import { RouterView, useRoute, useRouter } from 'vue-router'
	import Navbar from '@/components/Navbar.vue'
	import { onMounted } from 'vue';
	import Toast from 'primevue/toast';
	import { getUser } from '@/services/userService.js';

    const route = useRoute()
    const router = useRouter();
	const authApi = "http://localhost:8092/api/v1/auth";

	onMounted( async () => {
		const response = await getUser();	
		if(response.status == 200) {
			localStorage.setItem("user", JSON.stringify(response.data.user));
			router.push("/");
		} else {
			router.push("/auth");
		}
	});

</script>
<template>
   <Toast position="top-right"/>
   <RouterView />
   <div v-if="!route.meta.hideNavbar" class="pb-20 md:pl-20">
     <Navbar />
   </div>
</template
