<script setup lang="ts">
const props = defineProps<{
  section?: any
}>()

const stats = computed(() => {
  return props.section?.data?.stats ?? []
})

const cards = computed(() => {
  return props.section?.data?.cards ?? []
})
</script>

<template>
  <section class="relative overflow-hidden bg-black px-6 py-20 text-white">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_25%),radial-gradient(circle_at_80%_50%,rgba(245,158,11,0.10),transparent_30%)]"
    />

    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
    />

    <div v-if="!section" class="relative mx-auto max-w-7xl text-zinc-500">
      Loading...
    </div>

    <div v-else class="relative mx-auto max-w-7xl">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p
            v-if="section.data?.eyebrow"
            class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300"
          >
            {{ section.data.eyebrow }}
          </p>

          <h2
            class="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            {{ section.title }}
          </h2>

          <p
            v-if="section.subtitle"
            class="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
          >
            {{ section.subtitle }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink
              v-if="section.data?.primary_button_text"
              :to="section.data?.primary_button_url || '/'"
              class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 backdrop-blur transition hover:bg-emerald-400 hover:text-black"
            >
              {{ section.data.primary_button_text }}
            </NuxtLink>

            <NuxtLink
              v-if="section.data?.secondary_button_text"
              :to="section.data?.secondary_button_url || '/'"
              class="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300/30 hover:bg-white/[0.06]"
            >
              {{ section.data.secondary_button_text }}
            </NuxtLink>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute inset-0 rounded-[2rem] bg-emerald-400/10 blur-3xl"
          />

          <div
            class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
          >
            <div class="grid gap-6 sm:grid-cols-2">
              <div
                v-for="item in stats"
                :key="item.title"
                class="rounded-3xl border border-white/10 bg-black/30 p-6"
              >
                <p class="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  {{ item.label }}
                </p>

                <h3 class="mt-4 text-4xl font-bold text-white">
                  {{ item.value }}
                </h3>

                <p class="mt-3 text-sm leading-relaxed text-zinc-400">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24 grid gap-8 md:grid-cols-3">
        <div
          v-for="item in cards"
          :key="item.title"
          class="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-amber-300/20 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(245,158,11,0.10)]"
        >
          <div
            class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-2xl"
          >
            {{ item.icon }}
          </div>

          <h3 class="text-2xl font-semibold text-white">
            {{ item.title }}
          </h3>

          <p class="mt-4 text-sm leading-relaxed text-zinc-400">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>