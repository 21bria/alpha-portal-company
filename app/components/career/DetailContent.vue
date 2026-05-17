<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

type PublicJobVacancy = {
  id: number
  title: string
  slug: string
  department: string
  location: string
  employment_type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  is_open: boolean
  published_at?: string | null
}

const slug = computed(() => String(route.params.slug || ""))

const { data: job, pending, error } =
  await useAsyncData<PublicJobVacancy | null>(
    () => `career-detail-${route.fullPath}`,
    () => {
      if (!slug.value) return Promise.resolve(null)

      return api.request<PublicJobVacancy>(
        `/api/public/careers/${slug.value}/`
      )
    },
    {
      watch: [() => route.fullPath],
      default: () => null,
    }
  )
  
function formatDate(date?: string | null) {
  if (!date) return "Latest Update"

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

useHead(() => ({
  title: job.value?.title || "Career",
  meta: [
    {
      name: "description",
      content: job.value?.summary || "Career opportunity",
    },
  ],
}))
</script>

<template>
  <section class="bg-white px-6 py-24 text-black">
    <div class="mx-auto max-w-5xl">
      <NuxtLink to="/career" class="text-sm text-zinc-500 hover:text-amber-600">
        ← Back to careers
      </NuxtLink>

      <div v-if="pending" class="py-20 text-sm text-zinc-500">
        Loading job vacancy...
      </div>

      <div v-else-if="error || !job" class="py-20 text-sm text-red-500">
        Failed to load job vacancy.
      </div>

      <template v-else>
        <div class="mt-10 grid gap-12 lg:grid-cols-[1fr_280px]">
          <article>
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <span class="font-semibold text-emerald-500">
                {{ job.department }}
              </span>

              <span class="text-zinc-400">•</span>

              <span class="text-zinc-500">
                {{ job.location }}
              </span>

              <span class="text-zinc-400">•</span>

              <span class="text-zinc-500">
                {{ job.employment_type }}
              </span>
            </div>

            <h1 class="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
              {{ job.title }}
            </h1>

            <p class="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600">
              {{ job.summary }}
            </p>

            <div class="mt-10 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6">
              <h2 class="text-2xl font-bold text-zinc-900">
                Responsibilities
              </h2>

              <ul class="mt-6 space-y-4">
                <li
                  v-for="item in job.responsibilities"
                  :key="item"
                  class="flex gap-3 text-zinc-600"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 rounded-[2rem] border border-zinc-200 bg-white p-6">
              <h2 class="text-2xl font-bold text-zinc-900">
                Requirements
              </h2>

              <ul class="mt-6 space-y-4">
                <li
                  v-for="item in job.requirements"
                  :key="item"
                  class="flex gap-3 text-zinc-600"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>

          <aside class="hidden lg:block">
            <div class="sticky top-28 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
              <p class="text-sm font-bold text-zinc-900">
                Job Summary
              </p>

              <div class="mt-5 space-y-4 text-sm">
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Department
                  </p>
                  <p class="mt-1 font-semibold text-zinc-900">
                    {{ job.department }}
                  </p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Location
                  </p>
                  <p class="mt-1 font-semibold text-zinc-900">
                    {{ job.location }}
                  </p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Employment
                  </p>
                  <p class="mt-1 font-semibold text-zinc-900">
                    {{ job.employment_type }}
                  </p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Published
                  </p>
                  <p class="mt-1 font-semibold text-zinc-900">
                    {{ formatDate(job.published_at) }}
                  </p>
                </div>
              </div>

              <div class="mt-8 border-t border-zinc-200 pt-5">
                <NuxtLink
                  to="/contact"
                  class="flex w-full items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-black"
                >
                  Apply / Contact HR →
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </template>
    </div>
  </section>
</template>

