<template>
  <main class="bg-black w-full h-10 py-2 flex justify-center flex-row-reverse">
    <NuxtLink
      class="text-red-500 mx-3"
      :class="{
        'text-black bg-white px-1 rounded': isActive(route.dest),
        'hover:underline': !isActive(route.dest),
      }"
      v-for="(route, index) of routes"
      :key="index"
      :to="route.dest + route.query"
    >
      {{ route.name }}
    </NuxtLink>
  </main>
</template>
<script lang="ts" setup>
import type { Route } from "../types/route";
const route = useRoute();
const routes: Route[] = [
  {
    name: "الرئيسية",
    dest: "/",
    query: "",
  },

  {
    name: "جديدنا",
    dest: "/news",
    query: "",
  },

  {
    name: "تخفيضات",
    dest: "/sold",
    query: "",
  },
  {
    name: "ادارة",
    dest: "/admin",
    query: "?adding=product",
  },
];
const isActive = (path: string) => {
  return path == route.path;
};
</script>
