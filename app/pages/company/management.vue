<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

const { data: page, pending, error } = await useAsyncData(
  () => `public-page-management-${route.fullPath}`,
  () => api.request<any>("/api/public/pages/management/"),
  {
    watch: [() => route.fullPath],
    default: () => null,
  }
)

const cardsSection = computed(() => {
  return page.value?.sections?.find(
    (section: any) => section.section_type === "cards"
  )
})

const items = computed(() => {
  return cardsSection.value?.data?.items ?? []
})

const colors = [
  "text-emerald-500",
  "text-cyan-500",
  "text-lime-500",
  "text-amber-500",
]
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black">
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

      <section>
        <div v-if="pending" class="mt-10 text-zinc-500">
          Loading...
        </div>

        <div v-else-if="error" class="mt-10 text-red-500">
          Failed to load page.
        </div>

        <div v-else>
          <h1
            v-if="cardsSection?.title"
            class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl"
          >
            {{ cardsSection.title }}
          </h1>

          <div class="mt-14 grid gap-6 md:grid-cols-2">
            <div
              v-for="(item, index) in items"
              :key="item.title"
              class="rounded-[1.8rem] border border-zinc-200 bg-zinc-50/80 p-7 backdrop-blur"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.25em]"
                :class="colors[Number(index) % colors.length]"
              >
                {{ item.metric }}
              </p>

              <h3 class="mt-4 text-2xl font-bold text-zinc-900">
                {{ item.title }}
              </h3>

              <p class="mt-4 leading-relaxed text-zinc-600">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>