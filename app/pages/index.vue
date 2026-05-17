<script setup lang="ts">
const api = usePublicApi()

const { data: page, pending, error } = await useAsyncData(
  "public-home-page",
  () => api.request<any>("/api/public/home/"),
  {
    default: () => null,
    server: true,
    lazy: false,
    getCachedData: () => undefined,
  }
)

function getSection(type: string) {
  return page.value?.sections?.find(
    (s: any) => s.section_type === type
  )
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-black text-white">
    <LandingHeroSection
      :section="getSection('hero')"
    />

    <LandingAboutSection
      :section="getSection('split_content')"
    />

    <LandingOperationalSection
      :section="getSection('cards')"
    />

    <LandingSustainabilitySection
      :section="getSection('landing_feature')"
    />
    <LandingNewsSection />
    <LandingProjectMapSection
      :section="getSection('project_location')"
    />


  </main>
</template>

