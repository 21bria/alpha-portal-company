
<template>
    <header :class="[
        'fixed left-0 top-0 z-50 w-full border-b transition-all duration-300',
        isLightPage
            ? 'border-zinc-200 bg-white/95 shadow-sm backdrop-blur-xl'
            : isScrolled
                ? 'border-white/10 bg-black/75 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
                : 'border-transparent bg-transparent'
    ]">
        <div :class="[
            'mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300',
            isScrolled ? 'py-3' : 'py-5'
        ]">
            <!-- LOGO -->
            <NuxtLink to="/" class="group flex items-center gap-3">
              <div
                class="flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                >
                <img
                    v-if="company?.primary_logo_url || company?.white_logo_url"
                    :src="
                    isLightPage
                        ? company?.primary_logo_url ?? company?.white_logo_url ?? undefined
                        : company?.white_logo_url ?? company?.primary_logo_url ?? undefined
                    "
                    :alt="company?.company_name || 'Logo'"
                    class="h-11 w-11 object-contain drop-shadow-[0_0_14px_rgba(251,191,36,0.35)]Z≈.  "
                />
                </div>
                <h1
                    :class="[
                    'text-sm font-semibold tracking-[0.25em] transition-colors duration-300',
                    isLightPage
                        ? 'text-zinc-900 group-hover:text-amber-600'
                        : 'text-zinc-100 group-hover:text-amber-200'
                    ]"
                >
                    {{ company?.company_name || "KARYA WIJAYA" }}
                </h1>
            </NuxtLink>

            <!-- DESKTOP MENU -->
            <nav class="hidden items-center gap-8 lg:flex">
                <template v-for="menu in menus" :key="menu.label">
                    <div class="group relative">
                        <!-- LINK NORMAL -->
                        <NuxtLink v-if="menu.to && !menu.children" :to="menu.to" :class="[
                            'flex items-center gap-1 text-sm transition',
                            isLightPage
                                ? 'text-zinc-600 hover:text-black'
                                : 'text-zinc-400 hover:text-white'
                        ]">
                            {{ menu.label }}
                        </NuxtLink>

                        <!-- DROPDOWN -->
                        <button v-else :class="[
                            'flex items-center gap-1 text-sm transition',
                            isLightPage
                                ? 'text-zinc-600 hover:text-black'
                                : 'text-zinc-400 hover:text-white'
                        ]">
                            {{ menu.label }}

                            <span v-if="menu.children">
                                ▾
                            </span>
                        </button>
                        <!-- DROPDOWN -->
                        <div v-if="menu.children"
                            class="
                                invisible
                                absolute
                                left-1/2
                                top-full
                                mt-5
                                w-[420px]
                                -translate-x-1/2
                                rounded-3xl
                                border
                                border-white/10
                                bg-black/75
                                p-4
                                opacity-0
                                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                                backdrop-blur-2x
                                transition-all
                                duration-200
                                group-hover:visible
                                group-hover:opacity-100
                                ">
                            <div class="space-y-2">
                                    <a
                                        v-for="child in menu.children"
                                        :key="child.label"
                                        :href="child.to"
                                        class="group/item flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-white/20"
                                    >    
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xl">
                                        {{ child.icon }}
                                    </div>

                                    <div class="min-w-0 flex-1">
                                        <div class="text-base font-semibold text-zinc-100">
                                            {{ child.label }}
                                        </div>

                                        <div class="mt-1 text-sm text-zinc-300">
                                            {{ child.description }}
                                        </div>
                                    </div>

                                   <div class="text-zinc-400 transition group-hover/item:translate-x-1 group-hover/item:text-amber-300">
                                    →
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
            </nav>

            <!-- Translate -->
         <div
           :class="[
                'flex items-center gap-2 text-xs font-medium md:text-sm',
                isLightPage
                    ? 'text-zinc-700'
                    : 'text-white'
                ]"
            >
            <button
                class="transition hover:text-amber-400"
                @click="setLanguage('id')"
            >
                ID
            </button>

            <span class="opacity-40">|</span>

            <button
                class="transition hover:text-amber-400"
                @click="setLanguage('en')"
            >
                EN
            </button>
            </div>
            <!-- MOBILE BUTTON -->
            <button :class="[
                'flex h-11 w-11 items-center justify-center rounded-xl lg:hidden',
                isLightPage
                    ? 'border border-zinc-200 bg-white text-zinc-900'
                    : 'border border-white/10 bg-white/[0.03] text-white'
            ]" @click="mobileOpen = !mobileOpen">
                ☰
            </button>
        </div>

        <!-- MOBILE MENU -->
        <div v-if="mobileOpen" class="border-t border-white/10 bg-black/95 px-6 py-6 lg:hidden">
            <div class="space-y-4">
                <div v-for="menu in menus" :key="menu.label" class="border-b border-white/5 pb-4">
                    <!-- MENU BIASA -->
                    <NuxtLink v-if="menu.to && !menu.children" :to="menu.to"
                        class="block text-zinc-200 transition hover:text-white" @click="mobileOpen = false">
                        {{ menu.label }}
                    </NuxtLink>

                    <!-- MENU DROPDOWN -->
                    <button v-else class="flex w-full items-center justify-between text-left text-zinc-200"
                        @click="toggleMenu(menu.label)">
                        <span>{{ menu.label }}</span>

                        <span v-if="menu.children">
                            {{ openedMenu === menu.label ? '−' : '+' }}
                        </span>
                    </button>

                    <!-- SUBMENU -->
                    <div
                        v-if="menu.children && openedMenu === menu.label" class="mt-4 space-y-2" >
                        <NuxtLink
                            v-for="child in menu.children"
                            :key="child.label"
                            :to="child.to"
                            class="group/item flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 transition hover:bg-white/[0.06]"
                            @click="mobileOpen = false"
                            >
                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-base text-zinc-100"
                            >
                                {{ child.icon }}
                            </div>

                            <div class="min-w-0 flex-1">
                                <div class="text-base font-semibold text-zinc-100">
                                {{ child.label }}
                                </div>

                                <div class="mt-0.5 text-sm text-zinc-400">
                                {{ child.description }}
                                </div>
                            </div>

                            <div class="text-zinc-500 transition group-hover/item:translate-x-1 group-hover/item:text-amber-300">
                                →
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
const openedMenu = ref('')
const isScrolled = ref(false)
const route = useRoute()

function setLanguage(lang: "id" | "en") {
  const url = window.location.origin + window.location.pathname

  if (lang === "id") {
    window.location.href =
      `https://translate.google.com/translate?sl=en&tl=id&u=${encodeURIComponent(url)}`
    return
  }

  window.location.href = url
}
const whiteNavbarRoutes = [
    '/news',
    '/career',
    '/document/',
    '/company/',
    '/sustainability/',
    '/project',
    '/contact',
]
const isLightPage = computed(() => {
    return whiteNavbarRoutes.some(routePrefix =>
        route.path.startsWith(routePrefix)
    )
})

type CompanyProfile = {
  company_name?: string
  primary_logo_url?: string | null
  white_logo_url?: string | null
}

const config = useRuntimeConfig()

const { data: company } = await useFetch<CompanyProfile>(
  `${config.public.apiBaseUrl}/api/public/company-profile/`,
  {
    default: () => ({}),
  }
)

function handleScroll() {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

function toggleMenu(label: string) {
    openedMenu.value = openedMenu.value === label ? '' : label
}

const menus = [
    { label: 'Home', to: '/' },

    {
        label: 'Company',
        children: [
            {
                label: 'About Us',
                to: '/company/about',
                icon: '◌',
                description: 'Learn about Kawi Nickel',
            },
            {
                label: 'Vision & Mission',
                to: '/company/vision-mission',
                icon: '✦',
                description: 'Our purpose and direction',
            },
            {
                label: 'Management',
                to: '/company/management',
                icon: '◇',
                description: 'Leadership and governance',
            },
            {
                label: 'Projects',
                to: '/projects',
                icon: '▣',
                description: 'Explore mining operational areas',
            },
            {
                label: 'Contact',
                to: '/contact',
                icon: '→',
                description: 'Reach our corporate office',
            },
        ],
    },

    {
        label: 'Sustainability',
        children: [
            {
                label: 'ESG',
                to: '/sustainability/esg',
                icon: '◎',
                description: 'Environment, social, governance',
            },
            {
                label: 'Environment',
                to: '/sustainability/environment',
                icon: '◍',
                description: 'Responsible mining practices',
            },
            {
                label: 'Community',
                to: '/sustainability/community',
                icon: '✺',
                description: 'Community development programs',
            },
        ],
    },

    { label: 'News', to: '/news' },
    { label: 'Career', to: '/career' },
    // { label: 'Document', to: '/document' },
    { label: 'Media', to: '/gallery' },
]
</script>