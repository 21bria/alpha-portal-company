<script setup lang="ts">
const api = usePublicApi()

const { data: page } = await useAsyncData(
  "vision-mission-page",
  () => api.request<any>("/api/public/pages/vision-mission/")
)

const contentSection = computed(() => {
  return page.value?.sections?.find(
    (section: any) => section.section_type === "content"
  )
})

const valuesSection = computed(() => {
  return page.value?.sections?.find(
    (section: any) => section.section_type === "values"
  )
})

const values = computed(() => {
  return valuesSection.value?.data?.items ?? []
})

const currentIndex = ref(0)

const currentValue = computed(() => {
  return values.value[currentIndex.value] ?? values.value[0]
})

function nextValue() {
  if (!values.value.length) return

  currentIndex.value =
    (currentIndex.value + 1) % values.value.length
}

function prevValue() {
  if (!values.value.length) return

  currentIndex.value =
    (currentIndex.value - 1 + values.value.length) % values.value.length
}
</script>

<template>
  <main v-if="page" class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.10),transparent_28%)]" />

    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(6,182,212,0.08),transparent_30%)]" />

    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.06),transparent_35%)]" />

    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

    <div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
      <CompanySidebar />

      <section class="relative overflow-hidden px-10">
        <h1 v-if="contentSection?.title"
          class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
          {{ contentSection.title }}
        </h1>

        <div v-if="contentSection?.image_url"
          class="mt-8 hidden overflow-hidden rounded-[1rem] bg-zinc-100 md:mt-14 md:block">
          <img :src="contentSection.image_url" :alt="contentSection.image_alt || contentSection.title"
            class="h-[320px] w-full object-cover object-center xl:h-[380px]" />
        </div>

        <div v-if="contentSection?.content" v-html="contentSection.content" />

        <div v-if="valuesSection && values.length" class="mt-12">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
              {{ valuesSection.data?.eyebrow || valuesSection.title }}
            </p>

            <h3
              class="mt-3 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-2xl font-black uppercase tracking-[0.18em] text-transparent md:text-3xl">
              {{ currentValue?.title }}
            </h3>
          </div>

          <div v-if="valuesSection.image_url" class="relative mt-8 flex justify-start">
            <img :src="valuesSection.image_url" :alt="valuesSection.image_alt || valuesSection.title"
              class="w-[260px] md:w-[460px]" />
          </div>

          <div class="mt-10 max-w-3xl space-y-3">
            <div v-for="point in currentValue?.points ?? []" :key="point" class="flex gap-4">
              <div class="mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />

              <p class="text-lg leading-relaxed text-zinc-600">
                {{ point }}
              </p>
            </div>
          </div>

          <div class="mt-10 mb-2 flex items-center gap-3">
            <button
              class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-2xl text-white transition hover:scale-105"
              @click="prevValue">
              ←
            </button>

            <button
              class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-2xl text-white transition hover:scale-105"
              @click="nextValue">
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>