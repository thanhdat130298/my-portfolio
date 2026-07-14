<script setup lang="ts">
import PersonalProjectsSection from '~/components/projects/PersonalProjectsSection.vue'
import ScrollFabs from '~/components/layout/ScrollFabs.vue'
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <ProjectsSection />
      <PersonalProjectsSection />
      <ProfileSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <ChatSection />
    </main>
    <AppFooter />
    <ScrollFabs />
  </div>
</template>
