
<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

type NewsCategory = {
  id: number
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
  seo_title?: string
  seo_description?: string
  category_detail?: NewsCategory | null
  tags_detail?: NewsTag[]
}


const slug = computed(() => String(route.params.slug || ""))

const { data: article, pending, error } =
  await useAsyncData<PublicNews | null>(
    () => `public-news-detail-${route.fullPath}`,
    () => {
      if (!slug.value) return Promise.resolve(null)

      return api.request<PublicNews>(
        `/api/public/news/${slug.value}/`
      )
    },
    {
      watch: [() => route.fullPath],
      default: () => null,
    }
  )

type ApiList<T> = {
  count: number
  results: T[]
}

const { data: relatedData } =
  await useAsyncData<ApiList<PublicNews> | PublicNews[]>(
    "public-news-related",
    () =>
      api.request<ApiList<PublicNews> | PublicNews[]>(
        "/api/public/news/",
        {
          query: {
            page_size: 4,
          },
        }
      ),
    {
      default: () => ({
        count: 0,
        results: [],
      }),
    }
  )

const relatedPosts = computed(() => {
  const items = Array.isArray(relatedData.value)
    ? relatedData.value
    : relatedData.value?.results || []

  return items
    .filter((item) => item.slug !== article.value?.slug)
    .slice(0, 3)
})

const tags = computed(() => {
  return article.value?.tags_detail || []
})

const articleHeadings = computed(() => {
  if (!article.value?.content) return []

  const matches = [
    ...article.value.content.matchAll(
      /<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi
    ),
  ]

  return matches.map((match, index) => ({
    id: `section-${index}`,
    title: (match[1] || "").replace(/<[^>]+>/g, ""),
  }))
})

const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }

  return ""
})

async function copyLink() {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
  } catch (e) {
    console.error(e)
  }
}
function formatDate(date?: string | null) {
  if (!date) return "Latest Update"

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

useHead(() => ({
  title: article.value?.seo_title || article.value?.title || "News",
  meta: [
    {
      name: "description",
      content:
        article.value?.seo_description ||
        article.value?.excerpt ||
        "News article",
    },
  ],
}))

</script>

<template>
  <section class="bg-white px-6 py-24 text-black">
    <div class="mx-auto max-w-5xl">
      <NuxtLink to="/news" class="text-sm text-zinc-500 hover:text-amber-600">
        ← Back to news
      </NuxtLink>

      <div v-if="pending" class="py-20 text-sm text-zinc-500">
        Loading article...
      </div>

      <div v-else-if="error || !article" class="py-20 text-sm text-red-500">
        Failed to load article.
      </div>

      <template v-else>
        <div class="mt-10 grid gap-12 lg:grid-cols-[1fr_240px]">
          <article>
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <span class="font-semibold text-amber-500">
                {{ article.category_detail?.name || "News" }}
              </span>

              <span class="text-zinc-400">•</span>

              <span class="text-zinc-500">
                {{ formatDate(article.published_at) }}
              </span>

              <span class="text-zinc-400">•</span>

              <span class="text-zinc-500">
                {{ article.reading_time || 1 }} min read
              </span>
            </div>

            <h1 class="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {{ article.title }}
            </h1>

            <p v-if="article.excerpt" class="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600">
              {{ article.excerpt }}
            </p>

            <div class="mt-7 max-w-3xl overflow-hidden rounded-[1.5rem]">
              <img :src="article.cover_image_url || '/images/news-esg.jpg'" :alt="article.title"
                class="h-[360px] w-full object-cover" />
            </div>

            <div class="news-content mt-12 max-w-3xl" v-html="article.content" />

            <div v-if="tags.length" class="mt-10 flex flex-wrap gap-3">
              <span v-for="tag in tags" :key="tag.slug"
                class="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600">
                #{{ tag.name }}
              </span>
            </div>
          </article>

          <aside class="hidden lg:block">
            <div class="sticky top-28 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
              <p class="text-sm font-bold text-zinc-900">
                In this article
              </p>

              <div class="mt-5 space-y-3 text-sm">
                <a v-for="item in articleHeadings" :key="item.id" href="#"
                  class="block text-zinc-500 transition hover:text-amber-600">
                  {{ item.title }}
                </a>

                <div v-if="tags.length" class="border-t border-zinc-200 pt-4">
                  <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Tags
                  </p>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in tags" :key="tag.slug"
                      class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                      #{{ tag.name }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-8 border-t border-zinc-200 pt-5">
                <p class="text-sm font-bold text-zinc-900">
                  Share article
                </p>

                <div class="mt-4 flex gap-3">
                  <a :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`" target="_blank"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">
                    X
                  </a>

                  <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`"
                    target="_blank"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">
                    in
                  </a>

                  <button class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs text-white"
                    @click="copyLink">
                    ↗
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div v-if="relatedPosts.length" class="mt-18 border-t border-zinc-200 pt-10">
          <h2 class="text-2xl font-bold text-zinc-900">Related posts</h2>

          <div class="mt-8 grid gap-6 md:grid-cols-3">
            <NewsCard v-for="item in relatedPosts" :key="item.slug" :slug="item.slug" :title="item.title"
              :description="item.excerpt || ''" :category="item.category_detail?.name || 'News'"
              :date="formatDate(item.published_at)"
              :image="item.cover_thumbnail_url || item.cover_image_url || '/images/news-esg.jpg'" />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>


<style scoped>
.news-content {
  font-size: 18px;
  line-height: 1.85;
  color: #3f3f46;
}

.news-content :deep(p) {
  margin: 1.25rem 0;
}

.news-content :deep(strong),
.news-content :deep(b) {
  font-weight: 800;
  color: #18181b;
}

.news-content :deep(h2) {
  margin-top: 3.5rem;
  margin-bottom: 1.25rem;
  font-size: 1.875rem;
  line-height: 1.25;
  font-weight: 900;
  color: #d97706;
}

.news-content :deep(h3) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: 800;
  color: #18181b;
}

.news-content :deep(img) {
  width: 100%;
  height: auto;
  margin: 2.5rem 0 1rem;
  border-radius: 1.5rem;
  display: block;
}

.news-content :deep(figure) {
  margin: 2.5rem 0;
}

.news-content :deep(figcaption) {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #71717a;
}

.news-content :deep(p:empty) {
  display: none;
}
</style>