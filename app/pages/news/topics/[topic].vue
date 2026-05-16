<script setup lang="ts">
type NewsCategory = {
  id?: number
  name: string
  slug: string
}

type NewsTag = {
  id: number
  name: string
  slug: string
}

type NewsTopic = {
  id: number
  title: string
  slug: string
  subtitle?: string
  cover_image_url?: string | null
  category_detail?: NewsCategory | null
  tags_detail?: NewsTag[]
}

type PublicNews = {
  id: number
  title: string
  slug: string
  excerpt?: string
  cover_image_url?: string | null
  cover_thumbnail_url?: string | null
  published_at?: string | null
  reading_time?: number
  category_detail?: NewsCategory | null
  tags_detail?: NewsTag[]
}

type ApiList<T> = {
  count: number
  results: T[]
}

const config = useRuntimeConfig()
const route = useRoute()

const pageSize = 9
const page = ref(Number(route.query.page || 1))
const search = ref(String(route.query.search || ""))

const topic = computed(() => String(route.params.topic || ""))

const { data: currentTopic, pending: topicPending, error: topicError } =
  await useFetch<NewsTopic>(
    () => `${config.public.apiBaseUrl}/api/public/news/topics/${topic.value}/`,
    {
      watch: [topic],
    }
  )

const topicTagSlugs = computed(() => {
  return (
    currentTopic.value?.tags_detail
      ?.map((item) => item.slug)
      .filter(Boolean)
      .join(",") || ""
  )
})

const { data, pending, error } = await useFetch<ApiList<PublicNews> | PublicNews[]>(
  () => `${config.public.apiBaseUrl}/api/public/news/`,
  {
    query: {
      page,
      page_size: pageSize,
      search,

      category: computed(() => currentTopic.value?.category_detail?.slug),

      tags: computed(() => topicTagSlugs.value || undefined),
    },
    watch: [page, search, topic, currentTopic],
  }
)

const newsItems = computed<PublicNews[]>(() => {
  if (Array.isArray(data.value)) {
    return data.value
  }

  return data.value?.results || []
})

const totalPages = computed(() => {
  if (Array.isArray(data.value)) return 1
  if (!data.value?.count) return 1

  return Math.max(1, Math.ceil(data.value.count / pageSize))
})

const topicTagsLabel = computed(() => {
  return (
    currentTopic.value?.tags_detail
      ?.map((item) => item.name)
      .join(", ") || "-"
  )
})

function formatDate(date?: string | null) {
  if (!date) return "Latest Update"

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getNewsImage(item: PublicNews) {
  return (
    item.cover_thumbnail_url ||
    item.cover_image_url ||
    "/images/news-placeholder.jpg"
  )
}

useHead(() => ({
  title: currentTopic.value?.title || "Topic News",
  meta: [
    {
      name: "description",
      content:
        currentTopic.value?.subtitle ||
        "Latest updates and insights from Kawi Nickel.",
    },
  ],
}))
</script>

<template>
  <main class="min-h-screen bg-zinc-50">
    <LandingHeader light />

    <section class="relative overflow-hidden bg-white px-6 pt-36 pb-20 text-black">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.10),transparent_28%)]"
      />

      <div class="relative mx-auto max-w-7xl">
        <NuxtLink
          to="/news"
          class="text-sm font-semibold text-zinc-500 transition hover:text-amber-600"
        >
          ← Back to all news
        </NuxtLink>

        <div v-if="topicPending" class="mt-10 text-sm text-zinc-500">
          Loading topic...
        </div>

        <div v-else-if="topicError || !currentTopic" class="mt-10 text-sm text-red-500">
          Topic not found.
        </div>

        <div v-else class="mt-10 max-w-3xl">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
            News Topic
          </p>

          <h1 class="mt-4 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
            {{ currentTopic.title }}
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-zinc-600">
            {{ currentTopic.subtitle || "Latest updates and insights." }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="currentTopic" class="px-6 py-20">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col gap-5 rounded-[2rem] border border-zinc-200 bg-white p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p class="text-sm font-semibold text-zinc-900">
              Filtered by:
              <span class="text-amber-600">
                {{ currentTopic.category_detail?.name || "All Categories" }}
                /
                {{ topicTagsLabel }}
              </span>
            </p>

            <p class="mt-1 text-xs text-zinc-500">
              Showing curated articles for this topic.
            </p>
          </div>

          <div class="relative w-full lg:w-80">
            <input
              v-model="search"
              type="text"
              placeholder="Search this topic..."
              class="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-amber-400"
              @input="page = 1"
            />

            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
              ⌕
            </span>
          </div>
        </div>

        <div v-if="pending" class="mt-12 text-sm text-zinc-500">
          Loading topic news...
        </div>

        <div
          v-else-if="error"
          class="mt-12 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        >
          Failed to load topic news.
        </div>

        <div
          v-else-if="!newsItems.length"
          class="mt-12 rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500"
        >
          No articles available for this topic.
        </div>

        <div v-else class="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <NewsCard
            v-for="item in newsItems"
            :key="item.slug"
            :slug="item.slug"
            :title="item.title"
            :description="item.excerpt || ''"
            :category="item.category_detail?.name || 'News'"
            :date="formatDate(item.published_at)"
            :image="getNewsImage(item)"
          />
        </div>

        <div
          v-if="totalPages > 1"
          class="mt-14 flex items-center justify-center gap-3"
        >
          <button
            class="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-500 transition hover:border-amber-300 hover:text-amber-600 disabled:opacity-40"
            :disabled="page <= 1"
            @click="page--"
          >
            Previous
          </button>

          <button
            v-for="n in totalPages"
            :key="n"
            class="flex h-11 w-11 items-center justify-center rounded-full border text-sm transition"
            :class="
              page === n
                ? 'border-amber-400 bg-amber-400/10 font-semibold text-amber-600'
                : 'border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-amber-600'
            "
            @click="page = n"
          >
            {{ n }}
          </button>

          <button
            class="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-500 transition hover:border-amber-300 hover:text-amber-600 disabled:opacity-40"
            :disabled="page >= totalPages"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </main>
</template>