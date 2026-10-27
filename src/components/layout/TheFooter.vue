<script setup>
import { navLinks, profile } from '../../data/profile.js'
import SocialLinks from '../ui/SocialLinks.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line/10 bg-page">
    <div class="shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
      <a href="#accueil" class="inline-flex items-center gap-3 text-ink" aria-label="Steeve Guillot, retour à l'accueil">
        <span
          class="grid h-11 w-11 place-items-center rounded-xl bg-gradient-signature text-sm font-semibold text-[var(--on-gradient)]"
          aria-hidden="true"
        >
          {{ profile.monogram }}
        </span>
        <span class="font-semibold">{{ profile.fullName }}</span>
      </a>

      <nav aria-label="Navigation du pied de page">
        <ul class="flex flex-wrap gap-x-5 gap-y-2">
          <li v-for="link in navLinks" :key="`footer-${link.id}`">
            <a :href="link.href" class="text-sm text-muted hover:text-ink">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <SocialLinks />
    </div>
    <p class="shell pb-8 text-sm text-muted">© {{ year }} {{ profile.fullName }}</p>
  </footer>
</template>
