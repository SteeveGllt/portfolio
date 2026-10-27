<script setup>
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import TimelineSection from './components/sections/TimelineSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <TheNavbar />
  <main id="contenu" tabindex="-1">
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <TimelineSection />
    <AboutSection />
    <ContactSection />
  </main>
  <TheFooter />
</template>
