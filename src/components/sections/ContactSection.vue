<script setup>
import { computed, reactive, ref } from 'vue'
import { Mail, MapPin } from 'lucide-vue-next'
import { profile } from '../../data/profile.js'
import BaseButton from '../ui/BaseButton.vue'
import BaseCard from '../ui/BaseCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'
import SocialLinks from '../ui/SocialLinks.vue'

const endpoint = (import.meta.env.VITE_FORM_ENDPOINT || '').trim()
const hasEndpoint = computed(() => endpoint.length > 0)

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref('idle')
const statusMessage = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Indiquez votre nom (2 caractères minimum).' : ''
  errors.email = emailPattern.test(form.email.trim()) ? '' : 'Indiquez une adresse e-mail valide.'
  errors.message = form.message.trim().length < 10 ? 'Le message doit contenir au moins 10 caractères.' : ''
  return !errors.name && !errors.email && !errors.message
}

function focusFirstInvalid() {
  const field = ['name', 'email', 'message'].find((key) => errors[key])
  if (!field) return
  document.getElementById(`contact-${field}`)?.focus()
}

function openMailClient() {
  const subject = encodeURIComponent('Contact depuis le portfolio')
  const body = encodeURIComponent(`Nom : ${form.name.trim()}\n\n${form.message.trim()}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  status.value = 'mailto'
  statusMessage.value = 'Votre messagerie s’ouvre avec le message prérempli.'
}

async function onSubmit() {
  status.value = 'idle'
  statusMessage.value = ''
  if (!validate()) {
    focusFirstInvalid()
    return
  }

  if (!hasEndpoint.value) {
    openMailClient()
    return
  }

  status.value = 'sending'
  statusMessage.value = 'Envoi en cours…'

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    })

    if (!response.ok) throw new Error('Échec de l’envoi')

    form.name = ''
    form.email = ''
    form.message = ''
    status.value = 'success'
    statusMessage.value = 'Message envoyé. Merci pour votre prise de contact.'
  } catch {
    status.value = 'error'
    statusMessage.value = `L’envoi n’a pas abouti. Vous pouvez écrire à ${profile.email}.`
  }
}
</script>

<template>
  <section id="contact" aria-labelledby="titre-contact" class="relative overflow-hidden bg-page-alt">
    <div class="halo halo-rose -bottom-32 right-0" aria-hidden="true"></div>
    <div class="shell section relative">
      <SectionTitle id="titre-contact" before="Me" emphasis="contacter" />
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{{ profile.contactLead }}</p>

      <div class="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.8fr)]">
        <BaseCard :hover="false" as="div" class="p-6 md:p-8" v-reveal>
          <form novalidate aria-describedby="contact-hint" :aria-busy="status === 'sending'" @submit.prevent="onSubmit">
            <p id="contact-hint" class="text-sm text-muted">Tous les champs sont obligatoires.</p>
            <p v-if="!hasEndpoint" class="mt-2 text-sm text-muted">
              Le message s’ouvrira dans votre application de messagerie.
            </p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="contact-name" class="mb-2 block text-sm font-semibold text-ink">
                  Nom <span class="text-danger" aria-hidden="true">*</span>
                  <span class="sr-only">(obligatoire)</span>
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  class="field"
                  name="name"
                  type="text"
                  autocomplete="name"
                  maxlength="120"
                  required
                  :aria-invalid="errors.name ? 'true' : undefined"
                  :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                />
                <p v-if="errors.name" id="contact-name-error" class="mt-2 text-sm text-danger" role="alert">
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label for="contact-email" class="mb-2 block text-sm font-semibold text-ink">
                  Adresse e-mail <span class="text-danger" aria-hidden="true">*</span>
                  <span class="sr-only">(obligatoire)</span>
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  class="field"
                  name="email"
                  type="email"
                  autocomplete="email"
                  maxlength="160"
                  required
                  :aria-invalid="errors.email ? 'true' : undefined"
                  :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                />
                <p v-if="errors.email" id="contact-email-error" class="mt-2 text-sm text-danger" role="alert">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label for="contact-message" class="mb-2 block text-sm font-semibold text-ink">
                  Message <span class="text-danger" aria-hidden="true">*</span>
                  <span class="sr-only">(obligatoire)</span>
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  class="field min-h-40 resize-y"
                  name="message"
                  maxlength="4000"
                  required
                  :aria-invalid="errors.message ? 'true' : undefined"
                  :aria-describedby="errors.message ? 'contact-message-error' : undefined"
                ></textarea>
                <p v-if="errors.message" id="contact-message-error" class="mt-2 text-sm text-danger" role="alert">
                  {{ errors.message }}
                </p>
              </div>
            </div>

            <div class="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <BaseButton type="submit" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Envoi…' : 'Envoyer' }}
              </BaseButton>
              <p
                role="status"
                aria-live="polite"
                class="text-sm"
                :class="status === 'error' ? 'text-danger' : status === 'success' ? 'text-ok' : 'text-muted'"
              >
                {{ statusMessage }}
              </p>
            </div>
          </form>
        </BaseCard>

        <div v-reveal="80" class="space-y-5">
          <BaseCard :hover="false" as="aside" class="p-6 md:p-7">
            <h3 class="text-lg font-semibold text-ink">Coordonnées</h3>
            <ul class="mt-5 space-y-4">
              <li>
                <a :href="`mailto:${profile.email}`" class="inline-flex items-start gap-3 text-muted hover:text-ink">
                  <Mail class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{{ profile.email }}</span>
                </a>
              </li>
              <li class="inline-flex items-start gap-3 text-muted">
                <MapPin class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{{ profile.location }}</span>
              </li>
            </ul>
            <div class="mt-6">
              <SocialLinks />
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </section>
</template>
