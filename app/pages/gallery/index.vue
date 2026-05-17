<script setup lang="ts">
const api = usePublicApi()
const route = useRoute()

type PublicMedia = {
    id: number
    title?: string | null
    file_url?: string | null
    thumbnail_url?: string | null
    alt_text?: string | null
    caption?: string | null
}



const { data, pending, error } = await useAsyncData(
  () => `public-media-gallery-${route.fullPath}`,
  () => api.request<any>("/api/public/media/?type=IMAGE"),
  {
    watch: [() => route.fullPath],
    default: () => ({
      results: [],
    }),
  }
)
const images = computed<PublicMedia[]>(() => {
    return data.value?.results ?? data.value ?? []
})

const previewOpen = ref(false)
const activeIndex = ref(0)

const activeImage = computed(() => images.value[activeIndex.value])

function openPreview(index: number) {
    activeIndex.value = index
    previewOpen.value = true
}

function closePreview() {
    previewOpen.value = false
}

function nextImage() {
    if (!images.value.length) return
    activeIndex.value = (activeIndex.value + 1) % images.value.length
}

function prevImage() {
    if (!images.value.length) return
    activeIndex.value =
        activeIndex.value === 0
            ? images.value.length - 1
            : activeIndex.value - 1
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-black px-6 pt-30 pb-20 text-white">
    <section class="mx-auto max-w-7xl">
      <div class="mb-8">
        <h1 class="text-4xl font-black tracking-tight md:text-5xl">
          Welcome to image gallery
        </h1>

        <p class="mt-3 text-base text-white/60">
          Explore our public media collection, operational documentation,
          and company gallery assets.
        </p>
      </div>

      <div class="pointer-events-none fixed inset-0">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(255,140,0,0.22),transparent_25%)]"
        />

        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_92%_88%,rgba(255,180,0,0.14),transparent_30%)]"
        />

        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,120,0,0.08),transparent_20%)]"
        />

        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black" />
      </div>

      <!-- loading -->
      <div v-if="pending" class="py-20 text-center text-white/60">
        Loading gallery...
      </div>

      <!-- error -->
      <div v-else-if="error" class="py-20 text-center text-red-400">
        Failed to load gallery.
      </div>

      <!-- empty -->
      <div v-else-if="!images.length" class="py-20 text-center text-white/50">
        No gallery images available.
      </div>

      <!-- gallery -->
      <div
        v-else
        class="relative columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        <figure
          v-for="(image, index) in images"
          :key="image.id"
          class="group mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5"
          @click="openPreview(index)"
        >
          <img
            :src="image.thumbnail_url || image.file_url || ''"
            :alt="image.alt_text || image.title || 'Gallery image'"
            class="w-full object-cover transition duration-500 group-hover:scale-105"
            :class="
              index % 5 === 0
                ? 'aspect-[4/5]'
                : index % 3 === 0
                  ? 'aspect-[16/10]'
                  : 'aspect-[4/3]'
            "
          />

          <figcaption
            v-if="image.title || image.caption"
            class="bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <h3 class="text-sm font-semibold">
              {{ image.title }}
            </h3>

            <p
              v-if="image.caption"
              class="mt-1 line-clamp-2 text-xs text-white/60"
            >
              {{ image.caption }}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- preview modal -->
    <div
      v-if="previewOpen && activeImage"
      class="fixed inset-0 z-50 bg-black/95 text-white"
    >
      <button
        class="absolute right-6 top-6 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20"
        @click="closePreview"
      >
        Close
      </button>

      <div class="absolute left-0 right-0 top-4 z-10 flex gap-3 overflow-x-auto px-6">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          class="h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition"
          :class="index === activeIndex ? 'border-white' : 'border-white/10 opacity-50'"
          @click="activeIndex = index"
        >
          <img
            :src="image.thumbnail_url || image.file_url || ''"
            class="h-full w-full object-cover"
          />
        </button>
      </div>

      <button
        class="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl backdrop-blur hover:bg-white/20"
        @click="prevImage"
      >
        ‹
      </button>

      <button
        class="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl backdrop-blur hover:bg-white/20"
        @click="nextImage"
      >
        ›
      </button>

      <div class="flex h-full items-center justify-center px-8 py-24">
        <img
          :src="activeImage.file_url || activeImage.thumbnail_url || ''"
          :alt="activeImage.alt_text || activeImage.title || 'Preview image'"
          class="max-h-full max-w-full rounded-xl object-contain"
        />
      </div>

      <div
        v-if="activeImage.title || activeImage.caption"
        class="absolute bottom-8 left-1/2 w-[min(720px,90vw)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 backdrop-blur"
      >
        <h2 class="text-sm font-semibold">
          {{ activeImage.title }}
        </h2>

        <p
          v-if="activeImage.caption"
          class="mt-1 text-xs text-white/60"
        >
          {{ activeImage.caption }}
        </p>
      </div>
    </div>
  </main>
</template>