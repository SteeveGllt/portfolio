<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { navLinks, profile } from '../../data/profile.js'
import { useScrollSpy } from '../../composables/useScrollSpy.js'
import ThemeToggle from './ThemeToggle.vue'
import BaseButton from '../ui/BaseButton.vue'

const { activeId } = useScrollSpy(navLinks.map((link) => link.id))
const open = ref(false)
const menuButton = ref(null)
const menuPanel = ref(null)

function closeMenu() {
  open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    menuButton.value?.focus()
  }
}

function onResize() {
  if (window.innerWidth >= 768) open.value = false
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  menuPanel.value?.querySelector('a')?.focus()
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/10 bg-page/80 backdrop-blur-lg">
    <nav class="shell grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3" aria-label="Navigation principale">
      <a
        href="#accueil"
        class="grid h-11 w-11 place-items-center rounded-xl bg-gradient-signature text-sm font-semibold tracking-wide text-[var(--on-gradient)]"
        aria-label="Steeve Guillot, retour à l'accueil"
      >
        {{ profile.monogram }}
      </a>

      <ul class="hidden items-center justify-center gap-6 md:flex lg:gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="link.href"
            class="text-sm font-medium transition-colors"
            :class="activeId === link.id ? 'text-gradient' : 'text-muted hover:text-ink'"
            :aria-current="activeId === link.id ? 'location' : undefined"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="flex items-center justify-end gap-2">
        <ThemeToggle />
        <BaseButton href="#contact" size="sm" class="hidden sm:inline-flex">Me contacter</BaseButton>
        <button
          ref="menuButton"
          type="button"
          class="icon-button md:hidden"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="open = !open"
        >
          <X v-if="open" class="h-5 w-5" aria-hidden="true" />
          <Menu v-else class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <div v-if="open" id="menu-mobile" ref="menuPanel" class="border-t border-line/10 bg-page/95 px-5 py-4 md:hidden">
      <ul class="space-y-1">
        <li v-for="link in navLinks" :key="`mobile-${link.id}`">
          <a
            :href="link.href"
            class="block rounded-lg px-2 py-2.5 text-base font-medium"
            :class="activeId === link.id ? 'text-gradient' : 'text-ink'"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
      <BaseButton href="#contact" class="mt-4 w-full" @click="closeMenu">Me contacter</BaseButton>
    </div>
  </header>
</template>
