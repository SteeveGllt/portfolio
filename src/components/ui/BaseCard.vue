<script setup>
defineProps({
  as: { type: String, default: 'div' },
  hover: { type: Boolean, default: true },
})
</script>

<template>
  <component :is="as" class="surface-card" :class="{ 'surface-card--hover': hover }">
    <slot />
  </component>
</template>
