<script setup lang="ts">
const props = defineProps<{
    section?: any
}>()

const items = computed(() => {
    return props.section?.data?.items ?? []
})
</script>

<template>
    <section v-if="section" class="relative overflow-hidden bg-zinc-100 px-6 py-20 pb-26 text-black">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.08),transparent_28%)]" />

        <div class="relative mx-auto max-w-7xl">
            <p v-if="section.data?.eyebrow" class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">
                {{ section.data.eyebrow }}
            </p>
            <h2 class="mt-4 max-w-2xl text-4xl font-black leading-tight text-zinc-900">
                {{ section.title }}
            </h2>

            <p v-if="section.subtitle" class="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
                {{ section.subtitle }}
            </p>

            <div class="mt-12 grid gap-6 md:grid-cols-3">
                <div v-for="item in items" :key="item.title"
                    class="group relative overflow-hidden rounded-[1rem] border border-white/5 bg-gradient-to-br from-zinc-950 to-black p-6 text-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/20 hover:shadow-[0_0_40px_rgba(245,158,11,0.10)]">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div
                        class="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-amber-300 to-transparent transition-all duration-500 group-hover:w-full" />

                    <div class="relative z-10">
                        <div class="flex items-center gap-2">
                            <div class="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.8)]" />

                            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                                {{ item.metric }}
                            </p>
                        </div>

                        <h3
                            class="mt-10 text-2xl font-bold leading-tight text-white transition group-hover:text-amber-200">
                            {{ item.title }}
                        </h3>

                        <p class="mt-4 text-sm leading-relaxed text-zinc-400">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>