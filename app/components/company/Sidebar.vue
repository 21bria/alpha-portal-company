<template>
  <aside class="sticky top-32 hidden lg:block">
    <div>
      <p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-600">
        Company
      </p>

      <div class="border-t border-zinc-200">
        <NuxtLink v-for="item in menus" :key="item.to" :to="item.to"
          class="group block border-b border-zinc-200 py-4 transition-all duration-500" active-class="text-black">
          <div class="flex items-center justify-between">
            <span
              class="text-[1.05rem] font-medium tracking-[-0.02em] text-zinc-500 transition-all duration-500 group-hover:translate-x-1 group-hover:text-black">
              {{ item.label }}
            </span>

            <span
              class="translate-x-0 text-sm text-zinc-300 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const menus = [
  {
    label: 'About Us',
    to: '/company/about'
  },
  {
    label: 'Vision & Mission',
    to: '/company/vision-mission'
  },
  {
    label: 'Management',
    to: '/company/management'
  },
]
</script>