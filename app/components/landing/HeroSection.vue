<script setup lang="ts">
const props = defineProps<{
    section?: any
}>()

const lines = computed(() => {
    const title = props.section?.title || ""

    if (title.includes("|")) {
        return title.split("|")
    }

    return [
        "Empowering",
        "Nickel Operations",
        "Engineering Excellence",
    ]
})
</script>

<template>
    <section v-if="section" class="relative flex min-h-[86vh] items-center px-6 pt-32 pb-24 lg:pt-24 lg:pb-8">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.10),transparent_24%)]" />

        <div
            class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:90px_90px] opacity-40" />

        <div class="relative mx-auto -mt-6 grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
                <p v-if="section.data?.eyebrow"
                    class="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                    {{ section.data.eyebrow }}
                </p>

                <h1
                    class="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-zinc-100 sm:text-5xl md:text-6xl xl:text-7xl">
                    <span class="block">
                        {{ lines[0] }}
                    </span>

                    <span
                        class="block bg-gradient-to-r from-zinc-100 via-amber-200 to-zinc-500 bg-clip-text text-transparent">
                        {{ lines[1] }}
                    </span>

                    <span class="block text-zinc-300">
                        {{ lines[2] }}
                    </span>
                </h1>

                <p class="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                    {{ section.subtitle }}
                </p>

                <div class="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
                    <NuxtLink v-if="section.data?.primary_button_text" :to="section.data?.primary_button_url || '#'"
                        class="rounded-full border border-amber-300/50 bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(245,158,11,0.25)] transition hover:bg-amber-300 hover:text-black sm:px-7 sm:py-4 sm:text-base">
                        {{ section.data.primary_button_text }}
                    </NuxtLink>

                    <NuxtLink v-if="section.data?.secondary_button_text" :to="section.data?.secondary_button_url || '#'"
                        class="group flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white">
                        {{ section.data.secondary_button_text }}
                        <span class="transition group-hover:translate-x-1">→</span>
                    </NuxtLink>
                </div>
            </div>

            <div
                class="relative mt-6 flex min-h-[420px] items-center justify-center px-6 lg:mt-0 lg:min-h-[640px] lg:px-0">
                <div
                    class="absolute h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl lg:h-[680px] lg:w-[680px]" />

                <div
                    class="absolute h-[320px] w-[320px] rounded-full bg-cyan-500/5 blur-3xl lg:h-[440px] lg:w-[440px]" />

                <div
                    class="absolute h-[360px] w-[360px] rounded-full border border-white/10 animate-spin-orbit lg:h-[520px] lg:w-[520px]" />

                <div
                    class="absolute h-[300px] w-[400px] rotate-[-18deg] rounded-full border border-amber-300/10 animate-spin-orbit-reverse lg:h-[420px] lg:w-[580px]" />

                <div class="absolute h-[390px] w-[390px] animate-spin-orbit-slow lg:h-[560px] lg:w-[560px]">
                    <span
                        class="absolute left-1/2 top-0 -translate-x-1/2 text-sm font-semibold tracking-[0.35em] text-white/80">
                        Ni
                    </span>

                    <span
                        class="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-semibold tracking-[0.35em] text-white/65">
                        Fe
                    </span>

                    <span
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.35em] text-white/55">
                        MgO
                    </span>

                    <span
                        class="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-semibold tracking-[0.35em] text-white/60">
                        SiO₂
                    </span>
                </div>

                <img :src="section.image_url || '/images/nickel-core.png'"
                    :alt="section.image_alt || section.title || 'Nickel Core'"
                    class="relative z-10 w-[360px] sm:w-[460px] lg:w-[620px] animate-float animate-spin-slow drop-shadow-[0_0_120px_rgba(245,158,11,0.45)]" />
            </div>
        </div>
    </section>
</template>