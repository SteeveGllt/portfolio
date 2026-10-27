<script setup>
import { Github, Linkedin } from 'lucide-vue-next'
import { profile } from '../../data/profile.js'
</script>

<template>
  <div class="flex gap-3">
    <a
      :href="profile.githubUrl"
      class="icon-button"
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="GitHub de Steeve Guillot (nouvel onglet)"
    >
      <Github class="h-5 w-5" aria-hidden="true" />
    </a>
    <a
      :href="profile.linkedinUrl"
      class="icon-button"
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="LinkedIn de Steeve Guillot (nouvel onglet)"
    >
      <Linkedin class="h-5 w-5" aria-hidden="true" />
    </a>
  </div>
</template>
