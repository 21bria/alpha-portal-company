<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

type ProjectBullet = {
  title: string
  description?: string
}

type PublicProjectSection = {
  id: number
  section_type: string
  eyebrow?: string
  title?: string
  subtitle?: string
  content?: string
  image_url?: string | null
  image_alt?: string
  image_position?: string
  data?: {
    title?: string
    subtitle?: string
    content?: string
    quote?: string
    bullets?: ProjectBullet[]
    cards?: any[]
    layout?: string
  }
  sort_order?: number
}

type PublicProject = {
  id: number
  title: string
  slug: string
  subtitle?: string
  description?: string
  overview?: string
  location?: string
  province?: string
  commodity?: string
  status?: string
  cover_image_url?: string | null
  latitude?: string | number | null
  longitude?: string | number | null
  highlights?: string[]
  seo_title?: string
  seo_description?: string
  sections?: PublicProjectSection[]
}

const slug = computed(() => String(route.params.slug || ""))

const { data: project, pending, error } =
  await useAsyncData<PublicProject | null>(
    () => `public-project-${slug.value}`,
    () =>
      api.request<PublicProject>(
        `/api/public/projects/${slug.value}/`
      ),
    {
      watch: [slug],
      default: () => null,
    }
  )

const mainSection = computed(() => {
  return project.value?.sections?.[0] || null
})

const contentSection = computed(() => {
  return (
    project.value?.sections?.find((section) =>
      ["structured_content", "content", "overview"].includes(section.section_type)
    ) || mainSection.value
  )
})

const projectImage = computed(() => {
  return (
    project.value?.cover_image_url ||
    project.value?.sections?.find((section) => section.image_url)?.image_url ||
    "/images/hero-project.png"
  )
})

const pageTitle = computed(() => {
  return (
    mainSection.value?.data?.title ||
    mainSection.value?.title ||
    project.value?.title ||
    ""
  )
})

const pageSubtitle = computed(() => {
  return (
    mainSection.value?.data?.subtitle ||
    mainSection.value?.subtitle ||
    project.value?.description ||
    project.value?.subtitle ||
    ""
  )
})

const htmlContent = computed(() => {
  return (
    contentSection.value?.data?.content ||
    contentSection.value?.content ||
    project.value?.overview ||
    ""
  )
})

const bullets = computed<ProjectBullet[]>(() => {
  return (
    contentSection.value?.data?.bullets ||
    project.value?.highlights?.map((title) => ({ title })) ||
    []
  )
})

const quote = computed(() => {
  return contentSection.value?.data?.quote || ""
})

function formatStatus(status?: string) {
  const map: Record<string, string> = {
    active: "Active Site",
    development: "Development",
    operational: "Operational",
    exploration: "Exploration",
  }

  return map[status || ""] || status || "Project"
}

useHead(() => ({
  title: project.value?.seo_title || project.value?.title || "Project",
  meta: [
    {
      name: "description",
      content:
        project.value?.seo_description ||
        pageSubtitle.value ||
        "Project detail",
    },
  ],
}))
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-18 text-black">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.10),transparent_28%)]" />

    <div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
      <ProjectsSidebar />

      <section v-if="pending" class="relative px-0 py-20 lg:px-10">
        <p class="text-sm text-zinc-500">Loading project...</p>
      </section>

      <section v-else-if="error || !project" class="relative px-0 py-20 lg:px-10">
        <p class="text-sm text-red-500">Failed to load project.</p>
      </section>

      <section v-else class="relative overflow-hidden px-0 lg:px-10">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
          Project
        </p>

        <h1
          class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
          {{ pageTitle }}
        </h1>

        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600">
          {{ pageSubtitle }}
        </p>

        <div class="mt-10 overflow-hidden rounded-[1rem]">
          <img :src="projectImage" :alt="pageTitle"
            class="aspect-[16/9] w-full object-cover md:h-[360px] md:aspect-auto" />
        </div>

        <div v-if="htmlContent" class="mt-16">
          <div class="project-content" v-html="htmlContent" />
        </div>

        <div class="mt-16 grid gap-6 md:grid-cols-3">
          <div class="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              Location
            </p>

            <h3 class="mt-4 text-2xl font-bold text-zinc-900">
              {{ project.location || project.province || "-" }}
            </h3>
          </div>

          <div class="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500">
              Status
            </p>

            <h3 class="mt-4 text-2xl font-bold text-zinc-900">
              {{ formatStatus(project.status) }}
            </h3>
          </div>

          <div class="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
              Commodity
            </p>

            <h3 class="mt-4 text-2xl font-bold text-zinc-900">
              {{ project.commodity || "Nickel Ore" }}
            </h3>
          </div>
        </div>

        <div v-if="bullets.length" class="mt-20">
          <h2 class="text-2xl font-bold text-zinc-900">
            Operational Highlights
          </h2>

          <div class="mt-8 space-y-5">
            <div v-for="item in bullets" :key="item.title" class="flex gap-4">
              <div class="mt-2 h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />

              <div>
                <p class="text-lg leading-relaxed text-zinc-600">
                  {{ item.title }}
                </p>

                <p v-if="item.description" class="mt-1 text-sm leading-relaxed text-zinc-500">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="quote"
          class="mt-20 rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-8">
          <p class="text-2xl font-bold leading-relaxed text-zinc-900">
            {{ quote }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>