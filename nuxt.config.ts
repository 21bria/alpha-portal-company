// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,

  devtools: {
    enabled: import.meta.dev,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    payloadExtraction: false,
  },

  nitro: {
    compressPublicAssets: true,
  },

  routeRules: {
    '/**': {
      swr: false,
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://apps.portal.kawi-nickel.com/api',
    },
  },
})