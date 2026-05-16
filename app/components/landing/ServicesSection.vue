<template>
      <section class="relative -mt-8 px-6 pt-6 pb-24">
            <div class="mx-auto max-w-7xl">
                <div class="mb-14">
                    <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                        Our Services
                    </p>
                    <h2 class="mt-4 text-4xl font-bold text-zinc-100">
                        Mining solutions, digitally connected.
                    </h2>
                </div>

                <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div v-for="item in services" :key="item.title"
                        class="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.06]">
                        <div class="mb-6 h-12 w-12 rounded-2xl border border-amber-300/20 bg-amber-300/10" />
                        <h3 class="text-lg font-semibold text-zinc-100">{{ item.title }}</h3>
                        <p class="mt-4 text-sm leading-relaxed text-zinc-400">
                            {{ item.description }}
                        </p>
                        <button class="mt-6 text-sm font-semibold text-amber-300">
                            Learn more →
                        </button>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup lang="ts">
const services = [
    {
        title: 'Mining Operations',
        description: 'Production, hauling, equipment performance, and daily operational monitoring.',
    },
    {
        title: 'Ore Quality Management',
        description: 'Grade control for Ni, Fe, MgO, moisture, sampling, and blending decisions.',
    },
    {
        title: 'Stockpile Inventory',
        description: 'Real-time stockpile balance, dome/pile tracking, and material movement.',
    },
    {
        title: 'GIS & ESG Monitoring',
        description: 'Spatial operation visibility with environmental and sustainability reporting.',
    },
]

</script>