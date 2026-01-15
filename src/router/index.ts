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
	  meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
	  meta: { requiresAuth: true }
    },
	{
	  path: '/auth',
	  name: 'auth',
	  component: () => import('@/views/AuthView.vue'),
	  meta: { hideNavbar: true }
	}
  ],
});

router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && isAuthenticated) {
    return { name: 'pokedex' }
  }
});

export default router
