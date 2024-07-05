<template>
  <main
    class="bg-white h-16 w-full text-3xl font-bold italic underline flex justify-center items-center"
  >
    <span class="p-3 bg-yellow-100 rounded">ملبوسات صفاء</span>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/store";

const store = useStore();
</script>
