<script setup>
defineProps({
  id: { type: String, required: true },
  before: { type: String, default: '' },
  emphasis: {
    type: String,
    required: true,
    validator: (value) => value.trim().length > 0,
  },
  after: { type: String, default: '' },
})
</script>

<template>
  <h2 :id="id" class="text-section text-gradient">
    <span v-if="before">{{ before }}</span><span v-if="before">{{ ' ' }}</span><span class="font-display font-medium italic">{{ emphasis }}</span><span v-if="after">{{ ` ${after}` }}</span>
  </h2>
</template>
