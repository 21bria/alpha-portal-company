<script setup lang="ts">
type SidebarProject = {
  id: number
  title: string
  slug: string
}

const config = useRuntimeConfig()
const route = useRoute()

const { data: projects } = await useFetch<SidebarProject[]>(
  `${config.public.apiBaseUrl}/api/public/projects/`,
  {
    default: () => [],
  }
)

const menus = computed(() =>
  (projects.value || []).map((project) => ({
    label: project.title,
    to: `/projects/${project.slug}`,
    slug: project.slug,
  }))
)
</script>

<template>
  <aside class="sticky top-32 hidden lg:block">
    <div>
      <p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-600">
        Our Business
      </p>

      <div class="border-t border-zinc-200">
        <NuxtLink v-for="item in menus" :key="item.slug" :to="item.to"
          class="group block border-b border-zinc-200 py-4 transition-all duration-500" :class="route.path === item.to
              ? 'text-black'
              : 'text-zinc-500'
            ">
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