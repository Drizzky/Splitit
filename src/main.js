import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import App from './App.vue'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { definePreset } from '@primevue/themes'

const DeepCactusLara = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#e6f4ea',
      100: '#cce9d4',
      200: '#99d3a9',
      300: '#66bd7f',
      400: '#33a754', // light green for primary
      500: '#289043',
      600: '#1f7034',
      700: '#18562a',
      800: '#143B19', // darker green
      900: '#0f2c13',
    },
    surface: {
      0: '#143B19',
      50: '#143B19',
      100: '#143B19',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#33a754',
          inverseColor: '#ffffff',
          hoverColor: '#289043',
          activeColor: '#1f7034',
        },
        highlight: {
          background: '#d8f2e2',
          focusBackground: '#c0e9d2',
          color: '#143B19',
          focusColor: '#143B19',
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
app.mount('#app')
