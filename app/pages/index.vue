<script setup lang="ts">
const api = usePublicApi()

const { data: page, pending, error } = await useAsyncData(
  "home-page",
  () => api.request<any>("/api/public/home/"),
  {
    default: () => null,
  }
)

function getSection(type: string) {
  return page.value?.sections?.find(
    (s: any) => s.section_type === type || s.type === type
  ) ?? null
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-black text-white">
    <div v-if="pending" class="flex min-h-screen items-center justify-center text-white/60">
      Loading...
    </div>

    <div v-else-if="error" class="flex min-h-screen items-center justify-center text-red-400">
      Failed to load page.
    </div>

    <template v-else>
      <LandingHeroSection :section="getSection('hero')" />

      <LandingAboutSection :section="getSection('split_content')" />

      <LandingOperationalSection :section="getSection('cards')" />

      <LandingSustainabilitySection :section="getSection('landing_feature')" />

      <LandingNewsSection />

      <LandingProjectMapSection :section="getSection('project_location')" />
    </template>
  </main>
</template>