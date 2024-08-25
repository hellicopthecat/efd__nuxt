// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      script: [
        {
          type: "text/javascript",
          src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}`,
        },
      ],
    },
  },
});
