<script setup lang="ts">
const api = usePublicApi()

const { data: page } = await useAsyncData(
  "career-page",
  () => api.request<any>("/api/public/pages/career/")
)

const hero = computed(() =>
  page.value?.sections?.find((s: any) => s.section_type === "hero")
)

const feature = computed(() =>
  page.value?.sections?.find((s: any) => s.section_type === "landing_feature")
)

const benefitsSection = computed(() =>
  page.value?.sections?.find((s: any) => s.section_type === "cards")
)

const currentImage = ref(0)

const heroImages = computed(() => {
  return hero.value?.data?.images ?? []
})

const cultureItems = computed(() => {
  return feature.value?.data?.stats ?? []
})

const benefits = computed(() => {
  return benefitsSection.value?.data?.items ?? []
})

const { data: careersData } = await useAsyncData(
  "public-careers",
  () =>
    api.request<any>("/api/public/careers/?page_size=6")
)

const jobs = computed(() => {
  return careersData.value?.results ?? []
})

// Slider Images
let sliderTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  sliderTimer = setInterval(() => {
    if (!heroImages.value.length) return

    currentImage.value =
      (currentImage.value + 1) % heroImages.value.length
  }, 4000)
})

onUnmounted(() => {
  if (sliderTimer) {
    clearInterval(sliderTimer)
  }
})
</script>

<template>
  <main v-if="page" class="relative min-h-screen overflow-hidden bg-white px-6 pt-30 pb-20 text-black">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_16%,rgba(16,185,129,0.10),transparent_28%)]" />

    <section class="relative mx-auto max-w-7xl">
      <p v-if="hero?.data?.eyebrow" class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
        {{ hero.data.eyebrow }}
      </p>

      <div class="mt-4 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1
            class="bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
            {{ hero?.title }}
          </h1>

          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {{ hero?.subtitle }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <a v-if="hero?.data?.primary_button_text" :href="hero?.data?.primary_button_url || '#positions'"
              class="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500">
              {{ hero.data.primary_button_text }}
            </a>

            <NuxtLink v-if="hero?.data?.secondary_button_text" :to="hero?.data?.secondary_button_url || '#'"
              class="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-amber-300 hover:text-amber-600">
              {{ hero.data.secondary_button_text }}
            </NuxtLink>
          </div>
        </div>

        <div v-if="heroImages.length">
        <div class="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50">
          <Transition name="hero-slide" mode="out-in">
            <img
              :key="heroImages[currentImage]?.url"
              :src="heroImages[currentImage]?.url"
              :alt="heroImages[currentImage]?.title || hero?.title"
              class="aspect-[16/10] w-full object-cover"
            />
          </Transition>
         </div>

          <div class="mt-5 flex justify-center gap-3">
            <button
              v-for="(_, index) in heroImages"
              :key="index"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="currentImage === Number(index) ? 'w-12 bg-zinc-900' : 'w-8 bg-zinc-300'"
              @click="currentImage = Number(index)"
            />
          </div>
        </div>
      </div>

      <div v-if="feature" class="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 class="text-3xl font-black text-zinc-900">
            {{ feature.title }}
          </h2>

          <p class="mt-5 text-lg leading-relaxed text-zinc-600">
            {{ feature.subtitle }}
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div v-for="item in cultureItems" :key="item.label"
            class="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              {{ item.label }}
            </p>

            <h3 class="mt-4 text-xl font-bold text-zinc-900">
              {{ item.value }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-zinc-600">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="benefitsSection" class="mt-24">
        <div class="text-center">
          <p v-if="benefitsSection.data?.eyebrow"
            class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
            {{ benefitsSection.data.eyebrow }}
          </p>

          <h2 class="mt-4 text-4xl font-black text-zinc-900">
            {{ benefitsSection.title }}
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="item in benefits" :key="item.title"
            class="group rounded-[1.6rem] border border-zinc-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.10)]">
            <div class="text-2xl">
              {{ item.metric || item.icon }}
            </div>

            <h3 class="mt-5 text-xl font-bold text-zinc-900">
              {{ item.title }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-zinc-600">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <div id="positions" class="mt-16">
        <div class="flex flex-col gap-4 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
              Open Positions
            </p>

            <h2 class="mt-4 text-4xl font-black text-zinc-900">
              Career opportunities
            </h2>
          </div>

          <p class="max-w-xl text-zinc-600">
            Explore current openings and become part of our operational growth.
          </p>
        </div>

       <div class="mt-5 space-y-4">
        <NuxtLink
          v-for="job in jobs"
          :key="job.slug"
          :to="`/career/${job.slug}`"
          class="group flex flex-col gap-4 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6 transition-all duration-500 hover:border-amber-300/40 hover:bg-white hover:shadow-[0_0_35px_rgba(245,158,11,0.10)] md:flex-row md:items-center md:justify-between"
          >
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              {{ job.department }}
            </p>

            <h3 class="mt-2 text-2xl font-bold text-zinc-900">
              {{ job.title }}
            </h3>

            <p class="mt-2 text-zinc-600">
              {{ job.location }} • {{ job.employment_type }}
            </p>
          </div>

          <span
            class="text-sm font-semibold text-amber-600 transition group-hover:translate-x-1" >
            View role →
          </span>
        </NuxtLink>
      </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: opacity 900ms linear;
}

.hero-slide-enter-from,
.hero-slide-leave-to {
  opacity: 0.70;
}

.hero-slide-enter-to,
.hero-slide-leave-from {
  opacity: 1;
}
</style>