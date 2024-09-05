// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@prisma/nuxt"],
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      script: [
        {
          type: "text/javascript",
          src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NUXT_KAKAO_MAP_KEY}`,
        },
      ],
    },
  },
  runtimeConfig: {
    publicAPIKEY: process.env.NUXT_MY_PUBLIC_APIKEY,
    kakaoKEY: process.env.NUXT_KAKAO_MAP_KEY,
    cookieID: process.env.COOKIE_ID,
    cookieKEY: process.env.COOKIE_KEY,
  },
});