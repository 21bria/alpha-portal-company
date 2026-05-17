<script setup lang="ts">
const api = usePublicApi()

const { data: page } = await useAsyncData(
  "esg-page",
  () => api.request<any>("/api/public/pages/esg/")
)

const section = computed(() => {
  return page.value?.sections?.find(
    (item: any) => item.section_type === "structured_content"
  )
})

const cards = computed(() => {
  return section.value?.data?.cards ?? []
})

const approaches = computed(() => {
  return section.value?.data?.approaches ?? []
})

// News
type NewsCategory = {
  id: number
  name: string
  slug: string
}

type NewsItem = {
  id: number
  title: string
  slug: string
  excerpt?: string
  cover_image_url?: string | null
  cover_thumbnail_url?: string | null
  published_at?: string | null
  category_detail?: NewsCategory | null
}

type NewsListResponse = {
  count: number
  results: NewsItem[]
}

const { data: newsData } = await useAsyncData(
  "esg-latest-news",
  () =>
    api.request<NewsListResponse>(
      // "/api/public/news/?category=sustainability&page_size=3"
      "/api/public/news/?category=sustainability&tag=esg&page_size=3"
    )
)

const latestNews = computed(() => {
  return newsData.value?.results ?? []
})

function formatDate(date?: string | null) {
  if (!date) return "Latest Update"

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getNewsImage(item: NewsItem) {
  return (
    item.cover_thumbnail_url ||
    item.cover_image_url ||
    "/images/news-placeholder.jpg"
  )
}
</script>

<template>
  <main v-if="page && section" class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.10),transparent_28%)]" />

    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(6,182,212,0.08),transparent_30%)]" />

    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.06),transparent_35%)]" />

    <div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
      <SustainabilitySidebar />

      <section class="px-0 lg:px-10">
        <h1
          class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
          {{ section.title }}
        </h1>

        <div v-if="section.content" v-html="section.content" />

        <div v-if="section.image_url" class="mt-12 overflow-hidden rounded-[1rem]">
          <img :src="section.image_url" :alt="section.image_alt || section.title"
            class="aspect-[16/9] w-full object-cover md:h-[360px] md:aspect-auto" />
        </div>

        <div v-if="cards.length" class="mt-16 grid gap-6 md:grid-cols-3">
          <div v-for="item in cards" :key="item.title"
            class="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.10)]">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              {{ item.eyebrow }}
            </p>

            <h3 class="mt-4 text-xl font-bold text-zinc-900">
              {{ item.title }}
            </h3>

            <p class="mt-4 text-sm leading-relaxed text-zinc-600">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div v-if="approaches.length" class="mt-20">
          <h2 class="text-2xl font-bold text-zinc-900">
            Our ESG Approach
          </h2>

          <div class="mt-8 space-y-5">
            <div v-for="point in approaches" :key="point.title" class="border-l-2 border-emerald-400 pl-5">
              <h3 class="text-lg font-semibold text-zinc-900">
                {{ point.title }}
              </h3>

              <p class="mt-2 leading-relaxed text-zinc-600">
                {{ point.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- News -->
        <div v-if="latestNews.length" class="mt-24">
            <div class="mb-10 flex items-end justify-between gap-6">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
                  Latest ESG News
                </p>

                <h2 class="mt-3 text-2xl font-bold text-zinc-900">
                  Sustainability updates & insights.
                </h2>
              </div>

              <NuxtLink
                to="/news/topics/esg-news"
                class="hidden text-sm font-semibold text-amber-600 transition hover:text-amber-500 md:block">
                View all ESG news →
              </NuxtLink>
            </div>

            <div class="grid gap-6 md:grid-cols-3">
              <NuxtLink
                v-for="item in latestNews"
                :key="item.slug"
                :to="`/news/${item.slug}`"
                class="group overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.10)]"
                >
                <div class="relative overflow-hidden">
                  <img
                    :src="getNewsImage(item)"
                    :alt="item.title"
                    class="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div cass="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div class="p-5">
                  <div class="flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
                    <span class="font-semibold text-amber-500">
                      {{ item.category_detail?.name || "News" }}
                    </span>
                    <span class="text-zinc-400">•</span>
                    <span class="text-zinc-500">
                      {{ formatDate(item.published_at) }}
                    </span>
                  </div>

                  <h3 class="mt-3 line-clamp-2 text-lg font-bold leading-snug text-zinc-900 transition group-hover:text-amber-600">
                    {{ item.title }}
                  </h3>

                  <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                    {{ item.excerpt }}
                  </p>

                  <div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-500 transition-all duration-300 group-hover:gap-3">
                    Read more
                    <span>→</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
        </div>

      </section>
    </div>
  </main>
</template>