<script setup lang="ts">
const api = usePublicApi()

const { data: page } = await useAsyncData(
  "community-page",
  () => api.request<any>("/api/public/pages/community/")
)

const section = computed(() => {
  return page.value?.sections?.find(
    (item: any) => item.section_type === "structured_content"
  )
})

const cards = computed(() => section.value?.data?.cards ?? [])
const bullets = computed(() => section.value?.data?.bullets ?? [])
const quote = computed(() => section.value?.data?.quote ?? "")
</script>

<template>
  <main v-if="page && section" class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.10),transparent_28%)]" />

    <div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
      <SustainabilitySidebar />

      <section class="px-0 lg:px-10">
        <h1
          class="mt-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
          {{ section.title }}
        </h1>

        <div v-if="section.content" class="mt-8 max-w-4xl space-y-7 text-lg leading-relaxed text-zinc-600"
          v-html="section.content" />

        <div v-if="section.image_url" class="mt-12 overflow-hidden rounded-[1rem]">
          <img :src="section.image_url" :alt="section.image_alt || section.title"
            class="aspect-[16/9] w-full object-cover md:h-[360px] md:aspect-auto" />
        </div>

        <div v-if="cards.length" class="mt-16 grid gap-6 md:grid-cols-2">
          <div v-for="item in cards" :key="item.title"
            class="group rounded-[1.6rem] border border-zinc-200 bg-zinc-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_40px_rgba(14,165,233,0.10)]">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500">
              {{ item.eyebrow }}
            </p>

            <h3 class="mt-4 text-2xl font-bold text-zinc-900">
              {{ item.title }}
            </h3>

            <p class="mt-4 leading-relaxed text-zinc-600">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div v-if="bullets.length" class="mt-20">
          <h2 class="text-2xl font-bold text-zinc-900">
            Community Commitment
          </h2>

          <div class="mt-8 space-y-5">
            <div v-for="item in bullets" :key="item.title" class="flex gap-4">
              <div class="mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />

              <div>
                <h3 class="text-lg font-semibold text-zinc-900">
                  {{ item.title }}
                </h3>

                <p class="mt-2 leading-relaxed text-zinc-600">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="quote"
          class="mt-20 rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-8">
          <p class="text-2xl font-bold leading-relaxed text-zinc-900">
            {{ quote }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>