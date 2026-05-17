<script setup lang="ts">
const api = usePublicApi()

const page = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

onMounted(async () => {
  try {
    page.value = await api.request<any>("/api/public/pages/about-us/")
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
})

const sections = computed(() => page.value?.sections ?? [])
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-20 text-black">
    <!-- emerald glow -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.10),transparent_28%)]" />

    <!-- cyan glow -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(6,182,212,0.08),transparent_30%)]" />

    <!-- amber glow -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.06),transparent_35%)]" />

    <!-- subtle grid -->
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

    <div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
      <CompanySidebar />

      <div class="grid gap-16">
        <!-- Loading -->
        <div v-if="pending" class="px-10 text-zinc-500">
          Loading...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="px-10 text-red-500">
          Failed to load page.
        </div>

        <!-- Empty -->
        <div v-else-if="!sections.length" class="px-10 text-zinc-500">
          No content available.
        </div>

        <!-- Content -->
        <template v-else>
          <section v-for="section in sections" :key="section.id" class="relative overflow-hidden px-10">
            <h1 v-if="section.title"
              class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
              {{ section.title }}
            </h1>

            <div v-if="section.content" class="prose prose-zinc mt-6 max-w-none" v-html="section.content" />

            <div v-if="section.image_url" class="mt-10 overflow-hidden rounded-[1rem] md:mt-14">
              <img :src="section.image_url" :alt="section.image_alt || section.title"
                class="aspect-[16/9] w-full object-cover md:h-[360px] md:aspect-auto">
            </div>
          </section>
        </template>
      </div>
    </div>
  </main>
</template>