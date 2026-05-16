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

type PublicNews = {
  id: number
  title: string
  slug: string
  excerpt?: string
  content?: string
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

const selectedCategory = ref("all")
const search = ref("")
const page = ref(1)
const pageSize = 9

const { data: categoriesData } = await useFetch<NewsCategory[]>(
  `${config.public.apiBaseUrl}/api/public/news/categories/`,
  {
    default: () => [],
  }
)

const categories = computed<NewsCategory[]>(() => [
  {
    name: "All",
    slug: "all",
  },
  ...(categoriesData.value || []),
])

const { data, pending, error } = await useFetch<ApiList<PublicNews> | PublicNews[]>(
  () => `${config.public.apiBaseUrl}/api/public/news/`,
  {
    query: {
      page,
      page_size: pageSize,
      search,
      category: computed(() =>
        selectedCategory.value !== "all" ? selectedCategory.value : undefined
      ),
    },
    watch: [page, search, selectedCategory],
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

function formatDate(date?: string | null) {
  if (!date) return "Latest Update"

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function selectCategory(slug: string) {
  selectedCategory.value = slug || "all"
  page.value = 1
}

function getNewsImage(item: PublicNews) {
  return (
    item.cover_thumbnail_url ||
    item.cover_image_url ||
    "/images/news-esg.jpg"
  )
}
</script>

<template>
   <main v-if="page" class="relative min-h-screen overflow-hidden bg-white pt-10 pb-0 text-black">
    <LandingHeader light />
    <NewsHero />

    <section class="px-6 py-20">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col gap-5 rounded-[2rem] border border-zinc-200 bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-3">
            <button v-for="item in categories" :key="item.slug"
              class="rounded-full border px-4 py-2 text-sm font-medium transition" :class="selectedCategory === item.slug
                  ? 'border-amber-400 bg-amber-50 text-amber-600'
                  : 'border-zinc-200 text-zinc-700 hover:border-amber-300 hover:text-amber-600'
                " @click="selectCategory(item.slug)">
              {{ item.name }}
            </button>
          </div>

          <div class="relative w-full lg:w-80">
            <input
              v-model="search"
              type="text"
              placeholder="Search news..."
              class="
                w-full
                rounded-full
                border
                border-zinc-200
                bg-zinc-50
                px-5
                py-3
                text-sm
                text-zinc-900
                placeholder:text-zinc-400
                outline-none
                transition
                focus:border-amber-400
              "
              @input="page = 1"
            />

            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
              ⌕
            </span>
          </div>
        </div>

        <div v-if="pending" class="mt-12 text-sm text-zinc-500">
          Loading news...
        </div>

        <div v-else-if="error" class="mt-12 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Failed to load news.
        </div>

        <div v-else-if="!newsItems.length"
          class="mt-12 rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          No news available.
        </div>

        <div v-else class="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <NewsCard v-for="item in newsItems" :key="item.slug" :slug="item.slug" :title="item.title"
            :description="item.excerpt || ''" :category="item.category_detail?.name || 'News'"
            :date="formatDate(item.published_at)" :image="getNewsImage(item)" />
        </div>

        <div v-if="totalPages > 1" class="mt-14 flex items-center justify-center gap-3">
          <button
            class="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-500 transition hover:border-amber-300 hover:text-amber-600 disabled:opacity-40"
            :disabled="page <= 1" @click="page--">
            Previous
          </button>

          <button v-for="n in totalPages" :key="n"
            class="flex h-11 w-11 items-center justify-center rounded-full border text-sm transition" :class="page === n
                ? 'border-amber-400 bg-amber-400/10 font-semibold text-amber-600'
                : 'border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-amber-600'
              " @click="page = n">
            {{ n }}
          </button>

          <button
            class="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-500 transition hover:border-amber-300 hover:text-amber-600 disabled:opacity-40"
            :disabled="page >= totalPages" @click="page++">
            Next
          </button>
        </div>
      </div>
    </section>
  </main>
</template>