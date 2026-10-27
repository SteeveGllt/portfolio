<script setup>
import { FolderPlus } from 'lucide-vue-next'
</script>

<template>
  <article
    class="flex h-full min-h-[26rem] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-line/25 bg-card px-6 py-10 text-center shadow-card"
  >
    <FolderPlus class="mb-4 h-8 w-8 text-muted" aria-hidden="true" />
    <h3 class="text-lg font-semibold text-ink">Projet à venir</h3>
    <p class="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">Un nouveau projet arrive bientôt</p>
  </article>
</template>
