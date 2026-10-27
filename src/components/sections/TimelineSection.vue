<script setup>
import { education } from '../../data/education.js'
import { experiences } from '../../data/experiences.js'
import BaseCard from '../ui/BaseCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'

const columns = [
  { id: 'experience', title: 'Expérience', entries: experiences },
  { id: 'formation', title: 'Formation', entries: education },
]
</script>

<template>
  <section id="parcours" aria-labelledby="titre-parcours" class="bg-page-alt">
    <div class="shell section">
      <SectionTitle id="titre-parcours" before="Mon" emphasis="parcours" />
      <div class="mt-12 grid gap-12 lg:grid-cols-2">
        <div v-for="column in columns" :key="column.id">
          <h3 class="text-xl font-semibold text-ink">{{ column.title }}</h3>
          <ol class="mt-5 space-y-4">
            <li
              v-for="(entry, index) in column.entries"
              :key="`${column.id}-${entry.title}`"
              v-reveal="index * 70"
            >
              <BaseCard as="article" class="p-6 md:p-7">
                <p class="text-gradient text-base font-semibold">{{ entry.period }}</p>
                <h4 class="mt-3 text-lg font-semibold leading-snug text-ink">{{ entry.title }}</h4>
                <p v-if="entry.organization" class="mt-1 text-sm text-muted">
                  {{ entry.organization }}<span v-if="entry.location"> · {{ entry.location }}</span>
                </p>
                <p v-if="entry.summary" class="mt-4 text-sm leading-relaxed text-muted">{{ entry.summary }}</p>
              </BaseCard>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
