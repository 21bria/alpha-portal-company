<script setup lang="ts">
const api = usePublicApi()

type NewsCategory = {
    id: number
    name: string
    slug: string
}

type PublicNews = {
    id: number
    title: string
    slug: string
    excerpt?: string
    cover_image_url?: string | null
    cover_thumbnail_url?: string | null
    published_at?: string | null
    category_detail?: NewsCategory | null
}

type ApiList<T> = {
    count: number
    results: T[]
}

const { data: newsData, pending, error } = await useAsyncData(
  "public-news-home",
  () =>
    api.request<ApiList<PublicNews>>(
      "/api/public/news/",
      {
        query: {
          page_size: 3
        }
      }
    ),
  {
    default: () => ({
      count: 0,
      results: [],
    }),
  }
)

const newsItems = computed(() => {
    return newsData.value?.results || []
})

function formatDate(date?: string | null) {
    if (!date) return "Latest Update"

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}
</script>

<template>
  <section class="relative overflow-hidden bg-zinc-50 px-6 py-20 text-black">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(245,158,11,0.10),transparent_28%)]" />

    <div class="relative mx-auto max-w-7xl">
      <div class="mb-14">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
          Latest News
        </p>

        <h2 class="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
          Mining insights & company updates.
        </h2>

        <p class="mt-5 max-w-2xl text-zinc-600">
          Explore the latest operational updates, sustainability initiatives,
          and strategic developments across our integrated nickel ecosystem.
        </p>
      </div>

      <div v-if="pending" class="py-20 text-center text-zinc-500">
        Loading latest news...
      </div>

      <div v-else-if="error" class="py-20 text-center text-red-500">
        Failed to load latest news.
      </div>

      <div v-else-if="!newsItems.length" class="py-20 text-center text-zinc-500">
        No news available.
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="news in newsItems"
          :key="news.slug"
          :to="`/news/${news.slug}`"
          class="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.10)]"
        >
          <div class="relative overflow-hidden">
            <img
              :src="news.cover_thumbnail_url || news.cover_image_url || '/images/news-placeholder.png'"
              :alt="news.title"
              class="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          <div class="p-5">
            <div class="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <span class="font-semibold text-amber-500">
                {{ news.category_detail?.name || "News" }}
              </span>

              <span class="text-zinc-400">•</span>

              <span class="text-zinc-500">
                {{ formatDate(news.published_at) }}
              </span>
            </div>

            <h3 class="mt-2 text-2xl font-semibold leading-snug text-zinc-900 transition group-hover:text-amber-600">
              {{ news.title }}
            </h3>

            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
              {{ news.excerpt }}
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
</template>