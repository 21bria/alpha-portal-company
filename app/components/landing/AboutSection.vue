<script setup lang="ts">
defineProps<{
  section?: any
}>()
</script>

<template>
  <section
    v-if="section"
    class="relative px-6 pt-10 pb-20 lg:-mt-35 lg:pb-20"
  >
    <div class="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
      <div>
        <p
          v-if="section.data?.eyebrow"
          class="text-sm font-bold uppercase tracking-[0.35em] text-white"
        >
          {{ section.data.eyebrow }}
        </p>

        <h2
          class="mt-10 max-w-3xl text-4xl font-light leading-tight text-white md:text-5xl"
        >
          {{ section.title }}
        </h2>
      </div>

      <div class="flex items-center">
        <div>
          <p class="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {{ section.subtitle }}
          </p>

          <NuxtLink
            v-if="section.data?.primary_button_text"
            :to="section.data?.primary_button_url || '/'"
            class="mt-12 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-teal-500 transition hover:text-teal-600"
          >
            {{ section.data.primary_button_text }}
            <span>»</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>