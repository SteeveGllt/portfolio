import { createApp } from 'vue'
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/playfair-display/latin-500-italic.css'
import './style.css'
import App from './App.vue'
import { warnIncompleteExperiences } from './data/experiences.js'
import { vReveal } from './composables/useReveal.js'

warnIncompleteExperiences()

const app = createApp(App)
app.directive('reveal', vReveal)
app.mount('#app')
