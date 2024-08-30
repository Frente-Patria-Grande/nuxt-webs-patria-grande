export default defineNuxtConfig({
  modules: ['../src/module'],

  websPatriaGrande: {
    baseUrl: process.env.BASE_URL,
    websiteSlug: process.env.SLUG,
    token: process.env.TOKEN,
  },

  ssr: false,

  devtools: {enabled: true},
  compatibilityDate: '2024-08-30',
})
