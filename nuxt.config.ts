// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/icon", "@prisma/nuxt", "@nuxt/image", "@nuxtjs/tailwindcss"],
  devtools: {enabled: true},
  nitro: {
    preset: "netlify",
  },
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      link: [
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
          type: "application/json",
        },
      ],
      htmlAttrs: {lang: "ko"},
      script: [
        {
          type: "text/javascript",
          src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NUXT_KAKAO_MAP_KEY}`,
        },
      ],
    },
    rootAttrs: {
      class: "h-dvh",
    },
  },
  runtimeConfig: {
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    FIREBASE_ADMIN_PROJECTID: process.env.FIREBASE_ADMIN_PROJECTID,
    GOOGLE_OAUTH_CLIENT_SECREY: process.env.GOOGLE_OAUTH_CLIENT_SECREY,
    public: {
      PUBLIC_DATA_APIKEY: process.env.PUBLIC_DATA_APIKEY,
      WEATHER_SPECIAL_NOTIFICATION_KEY:
        process.env.WEATHER_SPECIAL_NOTIFICATION_KEY,
      DISASTERMSG_APIKEY: process.env.DISASTERMSG_APIKEY,
      SAFEAREA_KEY: process.env.SAFEAREA_KEY,
      LIFESAFETY_DISASTER_KEY: process.env.LIFESAFETY_DISASTER_KEY,
      SOCIAL_DISASTER_KEY: process.env.SOCIAL_DISASTER_KEY,
      NATURAL_DISASTER_KEY: process.env.NATURAL_DISASTER_KEY,
      CIVIL_DEFENCE_KEY: process.env.CIVIL_DEFENCE_KEY,
      FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY,
      SUPA_PROJECT_URL: process.env.SUPA_PROJECT_URL,
      SUPA_ANON_KEY: process.env.SUPA_ANON_KEY,
      GOOGLE_OAUTH_CLIENT: process.env.GOOGLE_OAUTH_CLIENT,
    },
  },
  routeRules: {
    "/": {ssr: true},
    "/login": {prerender: true},
    "/join": {prerender: true},
    "/weather": {ssr: true},
    "/weatherSpecial": {ssr: true},
    "/behavior": {prerender: true},
    "/behavior/**": {cors: true},
    "/disasterbag": {prerender: true},
    "/market": {isr: 3600},
    "/market/**": {isr: 3600},
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {},
    },
  },
  image: {
    cloudinary: {
      baseURL:
        "https://res.cloudinary.com/dghjbxszf/image/upload/v1734677269/image/",
    },
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
});
