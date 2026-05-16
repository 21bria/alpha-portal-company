<script setup lang="ts">
withDefaults(
    defineProps<{
        slug: string
        image?: string | null
        title: string
        description?: string
        category?: string
        date?: string
    }>(),
    {
        image: "/images/news-esg.jpg",
        description: "",
        category: "News",
        date: "Latest Update",
    }
)
</script>

<template>
    <NuxtLink :to="`/news/${slug}`"
        class="group overflow-hidden rounded-[1rem] border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.10)]">
        <!-- image -->
        <div class="relative overflow-hidden">
            <img :src="image || '/images/news-esg.jpg'" :alt="title"
                class="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105" />

            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <!-- content -->
        <div class="p-5">
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
                <span class="font-semibold text-amber-500">
                    {{ category }}
                </span>

                <span class="text-zinc-400">•</span>

                <span class="text-zinc-500">
                    {{ date }}
                </span>
            </div>

            <h3
                class="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-zinc-900 transition group-hover:text-amber-600">
                {{ title }}
            </h3>

            <p class="mt-3 line-clamp-3 text-[15px] leading-relaxed text-zinc-600">
                {{ description }}
            </p>

            <div
                class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-500 transition-all duration-300 group-hover:gap-3">
                Read more

                <span>→</span>
            </div>
        </div>
    </NuxtLink>
</template>