<template>
  <div
    class="flex flex-col gap-5 rounded-[2rem] border border-zinc-200 bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
    <!-- categories -->
    <div class="flex flex-wrap gap-3">
      <button v-for="item in categories" :key="item"
        class="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-amber-300 hover:text-amber-600">
        {{ item }}
      </button>
    </div>

    <!-- search -->
    <div class="relative w-full lg:w-80">
      <input type="text" placeholder="Search news..."
        class="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm outline-none transition focus:border-amber-400" />

      <span class="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
        ⌕
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  'All',
  'Mining',
  'Operations',
  'Sustainability',
  'Technology',
]
</script>