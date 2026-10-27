import { onMounted, onUnmounted, ref } from 'vue'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReveal(options = {}) {
  const el = ref(null)
  const isVisible = ref(false)
  let observer

  onMounted(() => {
    const node = el.value
    if (!node) return

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        isVisible.value = true
        observer?.disconnect()
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, isVisible }
}

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = Number(binding.value ?? 0)
    if (delay > 0) el.style.animationDelay = `${delay}ms`

    const show = () => el.classList.add('is-in')

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        show()
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
