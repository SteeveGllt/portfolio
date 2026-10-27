<script setup>
import { skills } from '../../data/skills.js'
import SectionTitle from '../ui/SectionTitle.vue'
import SkillCategoryCard from '../ui/SkillCategoryCard.vue'
</script>

<template>
  <section id="competences" aria-labelledby="titre-competences" class="bg-page">
    <div class="shell section">
      <SectionTitle id="titre-competences" before="Mes" emphasis="compétences" />
      <ul class="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <li v-for="(category, index) in skills" :key="category.title" v-reveal="index * 60" class="flex h-full">
          <SkillCategoryCard :title="category.title" :items="category.items" />
        </li>
      </ul>
    </div>
  </section>
</template>
