<script setup>
const props = defineProps({
  href: { type: String, default: '' },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
  type: { type: String, default: 'button' },
  download: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  external: { type: Boolean, default: false },
})

function onClick(event) {
  if (props.disabled) event.preventDefault()
}
</script>

<template>
  <a
    v-if="href"
    :href="disabled ? undefined : href"
    :class="['btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', size === 'sm' ? 'btn-sm' : '']"
    :download="download || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="onClick"
  >
    <slot />
    <span v-if="external" class="sr-only"> (nouvel onglet)</span>
  </a>
  <button
    v-else
    :type="type"
    :class="['btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', size === 'sm' ? 'btn-sm' : '']"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
