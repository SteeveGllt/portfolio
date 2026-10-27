<script setup>
defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <div class="border-t border-line/10 pt-4">
    <p class="text-gradient text-2xl font-semibold tracking-tight md:text-3xl">{{ value }}</p>
    <p class="mt-1 text-sm leading-snug text-muted">{{ label }}</p>
  </div>
</template>
