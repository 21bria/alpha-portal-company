<script setup lang="ts">

const api = usePublicApi()

import { Linkedin, Youtube, Instagram, Twitter } from "lucide-vue-next"
const currentYear = new Date().getFullYear()

type CompanyProfile = {
    company_name?: string
    legal_name?: string
    tagline?: string
    white_logo_url?: string | null
    primary_logo_url?: string | null
    address?: string
    phone?: string
    email?: string
    x_url?: string
    linkedin_url?: string
    instagram_url?: string
    youtube_url?: string
    privacy_policy_url?: string
    cookie_policy_url?: string
    terms_url?: string
    copyright_text?: string
    designer_name?: string
    designer_url?: string
}


const { data: company } = await useAsyncData<CompanyProfile | null>(
  "public-company-profile",
  () => api.request<CompanyProfile>("/api/public/company-profile/"),
  {
    default: () => null,
  }
)

const addressLines = computed(() =>
    company.value?.address
        ? company.value.address.split(/\r?\n/).filter(Boolean)
        : []
)

const socials = computed(() =>
    [
        { label: "X", url: company.value?.x_url, icon: Twitter },
        { label: "in", url: company.value?.linkedin_url, icon: Linkedin },
        { label: "IG", url: company.value?.instagram_url, icon: Instagram },
        { label: "YT", url: company.value?.youtube_url, icon: Youtube },
    ].filter((item) => item.url)
)

const products = [
    { label: "ERP Platform", url: "#" },
    { label: "Mining Dashboard", url: "#" },
    { label: "GIS System", url: "#" },
    { label: "Mobile Apps", url: "#" },
]


</script>

<template>
    <footer class="relative overflow-hidden border-t border-white/10 bg-black">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(245,158,11,0.08),transparent_25%),radial-gradient(circle_at_60%_30%,rgba(34,211,238,0.06),transparent_25%)]" />

        <div
            class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <!-- TOP CYAN GLOW -->
        <div class="absolute left-0 right-0 top-0 z-[1]">
            <!-- line -->
            <div class="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <!-- glow -->
            <div
                class="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent blur-2xl" />
        </div>
        <div class="relative mx-auto max-w-7xl px-6 py-20">
            <div class="grid gap-14 md:grid-cols-2 lg:grid-cols-5">
                <div class="lg:col-span-2">
                    <div class="flex items-center gap-3">
                        <img v-if="company?.white_logo_url || company?.primary_logo_url"
                            :src="company?.white_logo_url ?? company?.primary_logo_url ?? undefined"
                            :alt="company?.company_name || 'Company Logo'" class="h-10 w-auto object-contain" />

                        <div v-else
                            class="h-10 w-10 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/20 to-cyan-400/10" />

                        <h2 class="text-lg font-semibold tracking-[0.25em] text-zinc-100">
                            {{ company?.company_name || "KARYA WIJAYA" }}
                        </h2>
                    </div>

                    <p class="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
                        {{ company?.tagline || "Integrated digital mining ecosystem." }}
                    </p>

                    <div v-if="socials.length" class="mt-16 flex items-center gap-4">
                        <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank"
                            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-amber-300/30 hover:text-white">
                            <component :is="item.icon" class="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="text-sm font-semibold text-zinc-100">
                        {{ company?.legal_name || "PT KARYA WIJAYA" }}
                    </h3>

                    <div class="mt-2 space-y-3 text-sm leading-relaxed text-zinc-500">
                        <p v-if="addressLines.length">
                            <template v-for="line in addressLines" :key="line">
                                {{ line }}
                                <br />
                            </template>
                        </p>

                        <div class="space-y-2 pt-2">
                            <p v-if="company?.phone">
                                T
                                <a :href="`tel:${company.phone}`" class="ml-2 transition hover:text-white">
                                    {{ company.phone }}
                                </a>
                            </p>

                            <p v-if="company?.email">
                                E
                                <a :href="`mailto:${company.email}`" class="ml-2 transition hover:text-white">
                                    {{ company.email }}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-sm font-semibold text-zinc-100">
                        Products
                    </h3>

                    <ul class="mt-6 space-y-4 text-sm text-zinc-500">
                        <li v-for="item in products" :key="item.label">
                            <a :href="item.url" class="transition hover:text-white">
                                {{ item.label }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="relative mt-20 pt-8">
                <!-- glow line -->
                <div class="absolute left-0 right-0 top-0">
                    <!-- line -->
                    <div class="h-px w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

                    <!-- glow -->
                    <div
                        class="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent blur-2xl" />
                </div>

                <!-- content -->
                <div
                    class="flex flex-col items-start justify-between gap-6 text-sm text-zinc-600 md:flex-row md:items-center">

                    <p class="flex flex-wrap items-center gap-1">
                        <span>
                            Copyright {{ currentYear }} ©
                            {{ company?.company_name || "KAWI" }}.
                            {{ company?.copyright_text || "All rights reserved." }}
                        </span>

                        <template v-if="company?.designer_name">
                            <span>Designed by</span>

                            <a v-if="company?.designer_url" :href="company.designer_url" target="_blank"
                                class="font-medium text-amber-600 transition hover:text-amber-400">
                                {{ company.designer_name }}
                            </a>

                            <span v-else class="font-medium text-amber-600">
                                {{ company.designer_name }}
                            </span>
                        </template>
                    </p>

                    <div class="flex items-center gap-6">
                        <a v-if="company?.privacy_policy_url" :href="company.privacy_policy_url"
                            class="transition hover:text-white">
                            Privacy Policy
                        </a>

                        <a v-if="company?.cookie_policy_url" :href="company.cookie_policy_url"
                            class="transition hover:text-white">
                            Cookie Policy
                        </a>

                        <a v-if="company?.terms_url" :href="company.terms_url" class="transition hover:text-white">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>