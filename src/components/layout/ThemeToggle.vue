<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '../../composables/useTheme.js'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="icon-button"
    :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <Sun v-if="isDark" class="h-5 w-5" aria-hidden="true" />
    <Moon v-else class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
