<script setup>
import { projects } from '../../data/projects.js'
import ProjectCard from '../ui/ProjectCard.vue'
import ProjectPlaceholderCard from '../ui/ProjectPlaceholderCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<template>
  <section id="projets" aria-labelledby="titre-projets" class="bg-page-alt">
    <div class="shell section">
      <SectionTitle id="titre-projets" emphasis="Projets" />
      <ul class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="(project, index) in projects" :key="`${project.title || 'placeholder'}-${index}`" v-reveal="index * 70" class="flex h-full">
          <ProjectCard v-if="!project.isPlaceholder" :project="project" />
          <ProjectPlaceholderCard v-else />
        </li>
      </ul>
    </div>
  </section>
</template>
