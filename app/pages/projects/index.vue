<script setup lang="ts">
type PublicProjectSection = {
    id: number
    section_type: string
    title?: string
    subtitle?: string
    content?: string
    image_url?: string | null
    data?: Record<string, any>
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
    sections?: PublicProjectSection[]
}

const config = useRuntimeConfig()

const { data: projects, pending, error } = await useFetch<PublicProject[]>(
    `${config.public.apiBaseUrl}/api/public/projects/`,
    {
        default: () => [],
    }
)

function getProjectImage(project: PublicProject) {
    return (
        project.cover_image_url ||
        project.sections?.find((section) => section.image_url)?.image_url ||
        "/images/hero-project.png"
    )
}

function getProjectDescription(project: PublicProject) {
    return (
        project.description ||
        project.subtitle ||
        project.sections?.[0]?.subtitle ||
        "Explore our integrated mining operational areas."
    )
}

function getProjectLocation(project: PublicProject) {
    return project.province || project.location || "Indonesia"
}

function formatStatus(status?: string) {
    const map: Record<string, string> = {
        active: "Active Site",
        development: "Development",
        operational: "Operational",
        exploration: "Exploration",
    }

    return map[status || ""] || status || "Project"
}
</script>

<template>
    <main class="relative min-h-screen overflow-hidden bg-white px-6 pt-36 pb-24 text-black">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.10),transparent_28%)]" />

        <section class="relative mx-auto max-w-7xl px-6">
            <div class="max-w-3xl">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
                    Projects
                </p>

                <h1
                    class="mt-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
                    Strategic mining operations across Indonesia.
                </h1>

                <p class="mt-8 text-lg leading-relaxed text-zinc-600">
                    Explore our integrated mining operational areas supporting nickel ore
                    production, logistics coordination, stockpile visibility, and
                    sustainable operational development.
                </p>
            </div>

            <div class="mt-12 hidden overflow-hidden rounded-[1rem] border border-zinc-200 md:block">
                <img src="/images/hero-project.png" alt="Projects" class="aspect-[21/8] w-full object-cover" />
            </div>

            <div v-if="pending" class="mt-20 text-sm text-zinc-500">
                Loading projects...
            </div>

            <div v-else-if="error" class="mt-20 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Failed to load projects.
            </div>

            <div v-else-if="!projects?.length"
                class="mt-20 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-500">
                No projects available.
            </div>

            <div v-else class="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                <NuxtLink v-for="project in projects" :key="project.slug" :to="`/projects/${project.slug}`"
                    class="group overflow-hidden rounded-[1rem] border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.10)]">
                    <div class="overflow-hidden">
                        <img :src="getProjectImage(project)" :alt="project.title"
                            class="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>

                    <div class="p-6">
                        <div class="flex items-center gap-3">
                            <div class="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />

                            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
                                {{ formatStatus(project.status) }}
                            </p>
                        </div>

                        <h2 class="mt-5 text-2xl font-bold text-zinc-900">
                            {{ project.title }}
                        </h2>

                        <p class="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                            {{ getProjectDescription(project) }}
                        </p>

                        <div class="mt-6 flex items-center justify-between gap-4">
                            <span class="line-clamp-1 text-sm font-semibold text-zinc-900">
                                {{ getProjectLocation(project) }}
                            </span>

                            <span
                                class="shrink-0 text-sm font-semibold text-amber-600 transition group-hover:translate-x-1">
                                Explore →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>