import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '@/views/PokedexView.vue'
import AuthView from '@/views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokedex',
      component: PokedexView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
	{
	  path: '/auth',
	  name: 'auth',
	  component: () => import('@/views/AuthView.vue'),
	  meta: { hideNavbar: true }
	}
  ],
})

export default router
