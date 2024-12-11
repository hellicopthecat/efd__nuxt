import type {NuxtPage} from "nuxt/schema";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@prisma/nuxt", "@nuxt/image"],
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
    rootAttrs: {
      class: "h-dvh",
    },
  },
  runtimeConfig: {
    publicAPIKEY: process.env.NUXT_MY_PUBLIC_APIKEY,
    kakaoKEY: process.env.NUXT_KAKAO_MAP_KEY,
    cookieID: process.env.COOKIE_ID,
    cookieKEY: process.env.COOKIE_KEY,
    weatherSpecialNotiKEY: process.env.WEATHER_SPECIAL_NOTIFICATION_KEY,
    disasterMsgAPIKEY: process.env.DISASTERMSG_APIKEY,
    safeAreaKEY: process.env.INTEGRATION_SAFEAREA_KEY,
    lifesafetyDisasterKEY: process.env.LIFESAFETY_DISASTER_KEY,
    socialDisasterKEY: process.env.SOCIAL_DISASTER_KEY,
    naturalDisasterKEY: process.env.NATURAL_DISASTER_KEY,
    civilDefenceKEY: process.env.CIVIL_DEFENCE_KEY,
  },
  routeRules: {
    "/behavior": {cors: true},
  },
});
