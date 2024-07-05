<template>
  <main class="bg-black w-full h-10 p-2 flex flex-row-reverse">
    <NuxtLink
      class="mx-2 text-red-500"
      :class="{
        'text-black bg-white px-1 rounded': isActive(route.dest),
        'hover:underline': !isActive(route.dest),
      }"
      v-for="(route, index) of routes"
      :key="index"
      :to="route.dest"
    >
      {{ route.name }}
    </NuxtLink>
  </main>
</template>
<script lang="ts" setup>
/* __placeholder__ */
import type { Route } from "../types/route";
const route = useRoute();
const routes: Route[] = [
  {
    name: "الرئيسية",
    dest: "/",
  },
  {
    name: "حول المحل",
    dest: "/about",
  },
  {
    name: "جديدنا",
    dest: "/news",
  },
  {
    name: "سياستنا",
    dest: "/politics",
  },
];
const isActive = (path: string) => {
  return route.path === path;
};
</script>
