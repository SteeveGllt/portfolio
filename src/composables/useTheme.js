import { onMounted, ref } from 'vue'

const isDark = ref(
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
)

let listening = false

function applyTheme(dark, persist = true) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  isDark.value = dark

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', dark ? '#0a0813' : '#faf8ff')

  if (!persist) return

  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    /* Le choix reste appliqué pour la session. */
  }
}

function watchSystemTheme() {
  if (listening) return
  listening = true

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', (event) => {
    let stored = null
    try {
      stored = localStorage.getItem('theme')
    } catch {
      return
    }
    if (stored) return
    applyTheme(event.matches, false)
  })
}

export function useTheme() {
  onMounted(watchSystemTheme)

  function toggle() {
    applyTheme(!document.documentElement.classList.contains('dark'))
  }

  return { isDark, toggle }
}
