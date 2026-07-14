// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Dat Nguyen — Web Developer',
      meta: [
        {
          name: 'description',
          content:
            'Nguyen Thanh Dat — Web Developer with 5+ years of experience in Vue, React, Nuxt, and Next. Based in Da Nang, Vietnam.',
        },
        { name: 'theme-color', content: '#f97316' },
        { property: 'og:title', content: 'Dat Nguyen — Web Developer' },
        {
          property: 'og:description',
          content:
            'Frontend-focused web developer specializing in modern, responsive applications with Vue, React, Nuxt, and Next.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiApiKeyBackup: process.env.GEMINI_API_KEY_BACKUP || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
    geminiModels:
      process.env.GEMINI_MODELS
      || [
        'gemini-3.1-flash-lite',
        'gemini-3.1-flash-lite-preview',
        'gemma-4-26b-a4b-it',
        'gemma-4-31b-it',
        'gemini-2.0-flash-lite',
        'gemini-2.0-flash-lite-001',
        'gemini-2.0-flash',
        'gemini-2.0-flash-001',
        'gemini-3-flash-preview',
        'gemini-flash-latest',
      ].join(','),
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
