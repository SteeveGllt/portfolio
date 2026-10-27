<script setup>
defineProps({
  title: { type: String, required: true },
  items: {
    type: Array,
    required: true,
    validator: (items) =>
      items.every(
        (item) =>
          item &&
          typeof item.name === 'string' &&
          item.name.length > 0 &&
          (item.context === undefined ||
            ['entreprise', 'formation', 'projet personnel'].includes(item.context)),
      ),
  },
})
</script>

<template>
  <article class="surface-card surface-card--hover flex h-full w-full flex-col p-6 md:p-7">
    <h3 class="text-gradient text-lg font-semibold">{{ title }}</h3>
    <ul class="mt-5 space-y-2.5">
      <li v-for="item in items" :key="item.name" class="flex items-start gap-3 text-[0.97rem]">
        <span class="dot" aria-hidden="true"></span>
        <span class="flex min-w-0 flex-1 items-baseline justify-between gap-4">
          <span class="text-muted">{{ item.name }}</span>
          <span v-if="item.context" class="shrink-0 text-xs text-muted">{{ item.context }}</span>
        </span>
      </li>
    </ul>
  </article>
</template>
