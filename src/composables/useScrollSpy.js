import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy(ids) {
  const activeId = ref(ids[0] ?? '')

  function update() {
    if (ids.length === 0) return

    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

    if (nearBottom) {
      activeId.value = ids[ids.length - 1]
      return
    }

    const marker = 96
    let current = ids[0]

    for (const id of ids) {
      const section = document.getElementById(id)
      if (!section) continue
      if (section.getBoundingClientRect().top - marker <= 0) current = id
    }

    activeId.value = current
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { activeId }
}
