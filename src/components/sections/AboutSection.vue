<script setup>
import { profile } from '../../data/profile.js'
import BaseCard from '../ui/BaseCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'

const groups = [
  { title: 'Qualités', items: profile.qualities },
  { title: "Centres d'intérêt", items: profile.interests },
]
</script>

<template>
  <section id="a-propos" aria-labelledby="titre-a-propos" class="bg-page">
    <div class="shell section">
      <SectionTitle id="titre-a-propos" before="À" emphasis="propos" />
      <p v-reveal class="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{{ profile.about }}</p>
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <div v-for="(group, index) in groups" :key="group.title" v-reveal="index * 80">
          <BaseCard as="article" class="h-full p-6 md:p-7">
            <h3 class="text-lg font-semibold text-ink">{{ group.title }}</h3>
            <ul class="mt-5 space-y-2.5">
              <li v-for="item in group.items" :key="item" class="flex items-start gap-3 text-muted">
                <span class="dot" aria-hidden="true"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </BaseCard>
        </div>
      </div>
    </div>
  </section>
</template>
