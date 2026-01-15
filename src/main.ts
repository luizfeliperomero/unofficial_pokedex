import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'

const app = createApp(App)

const MyAura = definePreset(Aura, {
  semantic: {
    primary: {
      500: '#011763',
    }
  }
});

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyAura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});
app.use(ToastService);

app.mount('#app')
