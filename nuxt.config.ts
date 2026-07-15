// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'vi', language: 'vi-VN', name: 'Tiếng Việt', file: 'vi.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'portfolio_lang',
      fallbackLocale: 'en',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-theme': 'light' },
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
    // Comma-separated. Browser Origin/Referer must match (soft lock for /api/chat*).
    allowedOrigins: [
      process.env.ALLOWED_ORIGINS,
      process.env.NUXT_PUBLIC_SITE_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ]
      .filter(Boolean)
      .join(','),
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
