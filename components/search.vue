<template>
  <main class="flex flex-row-reverse relative">
    <input
      class="p-1 border-black border-2 text-center rounded w-1/2 md:w-1/4"
      v-model.trim="key"
      type="text"
      placeholder="...بنطال ولادي"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 absolute right-1 top-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  </main>
</template>
<script setup>
const key = ref("");

const emit = defineEmits(["search"]);
watch(key, (n) => {
  emit("search", n);
});
onMounted(() => {});
</script>
