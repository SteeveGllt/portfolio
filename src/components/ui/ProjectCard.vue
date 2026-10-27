<script setup>
import { computed } from 'vue'
import { ArrowUpRight, Github } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import { publicPath } from '../../data/profile.js'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) =>
      Boolean(value) &&
      typeof value.title === 'string' &&
      typeof value.description === 'string' &&
      typeof value.image === 'string' &&
      typeof value.githubUrl === 'string' &&
      typeof value.demoUrl === 'string' &&
      typeof value.isPlaceholder === 'boolean',
  },
})

const visualHref = computed(() => props.project.demoUrl || props.project.githubUrl)
</script>

<template>
  <article class="surface-card surface-card--hover group flex h-full min-h-[26rem] w-full flex-col overflow-hidden">
    <component
      :is="visualHref ? 'a' : 'div'"
      :href="visualHref || undefined"
      class="relative block aspect-video overflow-hidden"
      :target="visualHref ? '_blank' : undefined"
      :rel="visualHref ? 'noopener noreferrer' : undefined"
      :aria-label="visualHref ? `Voir le projet ${project.title} (nouvel onglet)` : undefined"
    >
      <img
        v-if="project.image"
        :src="publicPath(project.image)"
        :alt="visualHref ? '' : `Visuel du projet ${project.title}`"
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
      <div v-else class="project-visual" aria-hidden="true">
        <p class="font-display text-4xl italic" :style="{ color: 'var(--on-gradient)' }">
          {{ project.title }}
        </p>
      </div>
      <div class="project-overlay" aria-hidden="true">
        <span class="grid h-12 w-12 place-items-center rounded-full bg-page text-ink">
          <ArrowUpRight class="h-5 w-5" />
        </span>
      </div>
    </component>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-xl font-semibold text-ink">{{ project.title }}</h3>
      <p class="mt-3 flex-1 leading-relaxed text-muted">{{ project.description }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <BaseButton
          v-if="project.githubUrl"
          :href="project.githubUrl"
          variant="secondary"
          size="sm"
          external
        >
          <Github class="h-4 w-4" aria-hidden="true" />
          GitHub
        </BaseButton>
        <BaseButton v-if="project.demoUrl" :href="project.demoUrl" size="sm" external>
          Voir le site
        </BaseButton>
      </div>
    </div>
  </article>
</template>
