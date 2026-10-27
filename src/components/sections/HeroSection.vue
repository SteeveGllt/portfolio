<script setup>
import { Download, MapPin } from 'lucide-vue-next'
import { profile, publicPath } from '../../data/profile.js'
import BaseButton from '../ui/BaseButton.vue'
import SocialLinks from '../ui/SocialLinks.vue'
import StatItem from '../ui/StatItem.vue'
</script>

<template>
  <section id="accueil" aria-labelledby="hero-title" class="relative overflow-hidden bg-page">
    <div class="halo halo-violet -right-24 -top-28" aria-hidden="true"></div>
    <div class="halo halo-rose -left-20 top-48" aria-hidden="true"></div>

    <div class="shell relative grid items-center gap-14 pb-12 pt-16 md:pt-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:pt-24">
      <div class="hero-rise">
        <p class="flex items-center gap-2 text-sm font-medium text-muted">
          <span class="dot mt-0" aria-hidden="true"></span>
          {{ profile.availability }}
        </p>
        <p class="mt-5 text-lg text-ink md:text-xl">
          {{ profile.greeting }}
          <strong class="font-semibold">{{ profile.fullName }}</strong>
        </p>
        <h1 id="hero-title" class="text-display text-gradient mt-3">{{ profile.role }}</h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {{ profile.tagline }}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <BaseButton :href="publicPath(profile.cvFile)" :download="profile.cvFile" variant="secondary">
            <Download class="h-4 w-4" aria-hidden="true" />
            Télécharger mon CV
          </BaseButton>
          <BaseButton href="#contact">Me contacter</BaseButton>
        </div>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <SocialLinks />
          <p class="inline-flex items-center gap-2 text-sm text-muted">
            <MapPin class="h-4 w-4" aria-hidden="true" />
            {{ profile.location }}
          </p>
        </div>
      </div>

      <div class="hero-rise relative mx-auto w-full max-w-sm" style="animation-delay: 90ms">
        <div class="halo halo-violet -inset-10" aria-hidden="true"></div>
        <div class="relative rounded-[1.75rem] bg-gradient-signature p-px">
          <div class="overflow-hidden rounded-[calc(1.75rem-1px)] bg-card">
            <img
              v-if="profile.photo"
              :src="publicPath(profile.photo)"
              :alt="profile.photoAlt"
              width="640"
              height="800"
              decoding="async"
              class="aspect-[4/5] w-full object-cover"
            />
            <div v-else class="portrait-fallback flex aspect-[4/5] items-center justify-center">
              <span class="font-display text-7xl italic text-gradient">{{ profile.monogram }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shell relative pb-20 md:pb-28">
      <ul class="grid gap-6 sm:grid-cols-3">
        <li v-for="stat in profile.stats" :key="stat.value">
          <StatItem :value="stat.value" :label="stat.label" />
        </li>
      </ul>
    </div>
  </section>
</template>
