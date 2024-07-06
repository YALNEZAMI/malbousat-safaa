// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  imports: {
    dirs: ["stores"],
  },

  runtimeConfig: {
    MONGODB_URI:
      "mongodb+srv://yalnezami:1122334455@cluster0.zprpqjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    PASSWORD_ADMIN: "1234",
  },

  compatibilityDate: "2024-07-05",
  ssr: false,
});
