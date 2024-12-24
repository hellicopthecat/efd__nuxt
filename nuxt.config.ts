// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/icon", "@prisma/nuxt", "@nuxt/image", "@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
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
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    userTokenKey: process.env.USER_TOKEN_KEY,
    weatherSpecialNotiKEY: process.env.WEATHER_SPECIAL_NOTIFICATION_KEY,
    disasterMsgAPIKEY: process.env.DISASTERMSG_APIKEY,
    safeAreaKEY: process.env.INTEGRATION_SAFEAREA_KEY,
    lifesafetyDisasterKEY: process.env.LIFESAFETY_DISASTER_KEY,
    socialDisasterKEY: process.env.SOCIAL_DISASTER_KEY,
    naturalDisasterKEY: process.env.NATURAL_DISASTER_KEY,
    civilDefenceKEY: process.env.CIVIL_DEFENCE_KEY,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiScret: process.env.CLOUDINARY_API_SECRET,
  },
  routeRules: {
    "/behavior": {cors: true},
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  postcss: {
    plugins: {autoprefixer: {}, cssnano: {}},
  },
  image: {
    cloudinary: {
      baseURL:
        "https://res.cloudinary.com/dghjbxszf/image/upload/v1734677269/image/",
    },
  },
});
