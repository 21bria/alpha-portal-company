<script setup lang="ts">
const inquiryTypes = [
  "Business Inquiry",
  "Partnership",
  "Career Information",
  // "Media / Document Request",
]

const contacts = [
  {
    label: "Corporate Office",
    value:
      "Menara Prima Tower, 15th Floor.\nKawasan Mega Kuningan\nJl. DR. Ide Anak Agung Gde Agung Blok 6.2\nJakarta Selatan 12950,  Indonesia",
  },
  {
    label: "Email",
    value: "admin.jkt@karyawijaya.com",
  },
  {
    label: "Phone",
    value: "+62 21 5794 8028",
  },
]
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-white px-6 pt-30 pb-10 text-black">
    <!-- background glow -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.10),transparent_28%)]" />

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(245,158,11,0.08),transparent_30%)]" />

    <section class="relative mx-auto max-w-7xl">
      <!-- HEADING -->
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
          Contact
        </p>

        <h1
          class="bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
          Get in touch with Karya Wijaya.
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-zinc-600">
          Connect with our corporate team for business inquiries,
          partnerships, career information, or operational coordination.
        </p>
      </div>

      <!-- LEFT RIGHT -->
      <div class="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <!-- LEFT -->
        <div class="space-y-4">
          <div v-for="item in contacts" :key="item.label"
            class="rounded-[1.0rem] border border-zinc-200 bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              {{ item.label }}
            </p>

            <p class="mt-4 whitespace-pre-line text-base font-semibold text-zinc-900">
            {{ item.value }}
          </p>
          </div>
        </div>

        <!-- RIGHT -->
        <div
          class="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <!-- image -->
          <div class="relative overflow-hidden">
            <img src="/images/foto-overview.jpg" alt="Karya Wijaya Office" class="h-[420px] w-full object-cover" />

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div class="absolute bottom-0 left-0 right-0 p-8">
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                Corporate Office
              </p>

              <h2 class="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                Visit our Jakarta office.
              </h2>

              <p class="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200">
                For business, media, partnership, operational coordination,
                and corporate communication inquiries, please contact our
                corporate office directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM -->
      <div class="mt-20 grid gap-6 md:grid-cols-3">
        <div v-for="item in inquiryTypes" :key="item"
          class="group rounded-[1.0rem] border border-zinc-200 bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white hover:shadow-[0_20px_40px_rgba(245,158,11,0.08)]">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                Inquiry
              </p>

              <h3 class="mt-4 text-xl font-bold text-zinc-900">
                {{ item }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed text-zinc-600">
                Our team will direct your message to the relevant department.
              </p>
            </div>

            <div class="text-zinc-400 transition group-hover:translate-x-1 group-hover:text-amber-500">
              →
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>