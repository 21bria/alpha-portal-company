<script setup lang="ts">
const props = defineProps<{
    section?: any
}>()

const projects = computed(() => {
    return props.section?.data?.projects ?? []
})

const mapImage = computed(() => {
    return props.section?.data?.map_image || "/images/indonesia-map.svg"
})
</script>

<template>
  <section class="relative overflow-hidden bg-black px-6 py-20 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_30%)]" />

    <div v-if="!section" class="relative mx-auto max-w-7xl text-zinc-500">
      Loading...
    </div>

    <div v-else class="relative mx-auto max-w-7xl">
      <div class="mb-12 text-center">
        <p
          v-if="section.data?.eyebrow"
          class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300"
        >
          {{ section.data.eyebrow }}
        </p>

        <h2 class="mt-4 text-4xl font-bold">
          {{ section.title }}
        </h2>

        <p v-if="section.subtitle" class="mx-auto mt-5 max-w-2xl text-zinc-400">
          {{ section.subtitle }}
        </p>
      </div>

      <div class="relative mx-auto max-w-7xl p-6 shadow-2xl">
        <div class="relative min-h-[500px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative w-full max-w-8xl">
              <img
                :src="mapImage"
                :alt="section.image_alt || 'Indonesia Map'"
                class="h-auto w-full opacity-70 grayscale contrast-125 drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]"
              />

              <NuxtLink
                v-for="project in projects"
                :key="project.slug"
                :to="`/projects/${project.slug}`"
                class="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                :style="{
                  left: `${project.x ?? 50}%`,
                  top: `${project.y ?? 50}%`
                }"
              >
                <span class="absolute -left-1.5 -top-1.5 h-7 w-7 animate-ping rounded-full bg-amber-300 opacity-60" />

                <span class="relative block h-4 w-4 rounded-full border-2 border-white bg-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.9)]" />

                <div class="absolute left-1/2 top-8 hidden w-45 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur transition-all duration-300 group-hover:border-amber-300/30 group-hover:bg-black/90 md:block">
                  <p class="text-sm font-semibold text-white">
                    {{ project.label || project.name }}
                  </p>

                  <p class="mt-1 text-xs text-amber-200/80">
                    {{ project.location }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>