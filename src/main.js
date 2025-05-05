import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import App from './App.vue'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { definePreset } from '@primevue/themes'
import ToastService from 'primevue/toastservice'

const DeepCactusLara = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#fff4e6',
      100: '#ffe0b3',
      200: '#ffcc80',
      300: '#ffb84d',
      400: '#ffa500', // main orange
      500: '#e69500',
      600: '#cc8400',
      700: '#b37300',
      800: '#8c5900',
      900: '#664000',
    },
    surface: {
      0: '#000000', // base black surface
      50: '#1a1a1a', // slightly lighter black
      100: '#1a1a1a',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#ffa500', // vibrant orange
          inverseColor: '#ffffff', // white text on orange
          hoverColor: '#e69500',
          activeColor: '#cc8400',
        },
        highlight: {
          background: '#fff4e6', // soft orange glow
          focusBackground: '#ffe0b3',
          color: '#8c5900', // readable dark orange
          focusColor: '#664000', // deeper focus orange
        },
      },
    },
  },
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: DeepCactusLara,
    prefix: 'p',
    darkModeSelector: 'system',
    cssLayer: false,
  },
})

app.use(ToastService)
app.mount('#app')
