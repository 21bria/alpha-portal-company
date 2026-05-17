<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

const { data: page, pending, error } = await useAsyncData(
  () => `community-page-${route.fullPath}`,
  () => api.request<any>("/api/public/pages/community/"),
  {
    watch: [() => route.fullPath],
    default: () => null,
  }
)

const section = computed(() => {
  return page.value?.sections?.find(
    (item: any) => item.section_type === "structured_content"
  )
})

const cards = computed(() => section.value?.data?.cards ?? [])
const bullets = computed(() => section.value?.data?.bullets ?? [])
const quote = computed(() => section.value?.data?.quote ?? "")

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
  () => `community-latest-news-${route.fullPath}`,
  () =>
    api.request<NewsListResponse>(
      "/api/public/news/?category=sustainability&tag=community&page_size=3"
    ),
  {
    watch: [() => route.fullPath],
    default: () => ({
      results: [],
    }),
  }
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
  <main
    class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.10),transparent_28%)]"
    />

    <div
      class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <SustainabilitySidebar />

      <!-- loading -->
      <div v-if="pending" class="lg:px-10 text-zinc-500">
        Loading...
      </div>

      <!-- error -->
      <div v-else-if="error || !section" class="lg:px-10 text-red-500">
        Failed to load page.
      </div>

      <!-- content -->
      <section v-else class="px-0 lg:px-10">
        <h1
          class="mt-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl"
        >
          {{ section.title }}
        </h1>

        <div
          v-if="section.content"
          class="mt-8 max-w-4xl space-y-7 text-lg leading-relaxed text-zinc-600"
          v-html="section.content"
        />

        <div
          v-if="section.image_url"
          class="mt-12 overflow-hidden rounded-[1rem]"
        >
          <img
            :src="section.image_url"
            :alt="section.image_alt || section.title"
            class="aspect-[16/9] w-full object-cover md:h-[360px] md:aspect-auto"
          />
        </div>

        <!-- cards -->
        <div v-if="cards.length" class="mt-16 grid gap-6 md:grid-cols-2">
          <div
            v-for="item in cards"
            :key="item.title"
            class="group rounded-[1.6rem] border border-zinc-200 bg-zinc-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_40px_rgba(14,165,233,0.10)]"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500"
            >
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

        <!-- bullets -->
        <div v-if="bullets.length" class="mt-20">
          <h2 class="text-2xl font-bold text-zinc-900">
            Community Commitment
          </h2>

          <div class="mt-8 space-y-5">
            <div
              v-for="item in bullets"
              :key="item.title"
              class="flex gap-4"
            >
              <div
                class="mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              />

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

        <!-- quote -->
        <div
          v-if="quote"
          class="mt-20 rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-8"
        >
          <p class="text-2xl font-bold leading-relaxed text-zinc-900">
            {{ quote }}
          </p>
        </div>

        <!-- News -->
        <div v-if="latestNews.length" class="mt-24">
          <div class="mb-10 flex items-end justify-between gap-6">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600"
              >
                Latest Community News
              </p>

              <h2 class="mt-3 text-2xl font-bold text-zinc-900">
                Sustainability updates & insights.
              </h2>
            </div>

            <NuxtLink
              to="/news/topics/community-news"
              class="hidden text-sm font-semibold text-amber-600 transition hover:text-amber-500 md:block"
            >
              View all Community news →
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

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
              </div>

              <div class="p-5">
                <div
                  class="flex items-center gap-3 text-xs uppercase tracking-[0.22em]"
                >
                  <span class="font-semibold text-amber-500">
                    {{ item.category_detail?.name || "News" }}
                  </span>

                  <span class="text-zinc-400">•</span>

                  <span class="text-zinc-500">
                    {{ formatDate(item.published_at) }}
                  </span>
                </div>

                <h3
                  class="mt-3 line-clamp-2 text-lg font-bold leading-snug text-zinc-900 transition group-hover:text-amber-600"
                >
                  {{ item.title }}
                </h3>

                <p
                  class="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600"
                >
                  {{ item.excerpt }}
                </p>

                <div
                  class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-500 transition-all duration-300 group-hover:gap-3"
                >
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