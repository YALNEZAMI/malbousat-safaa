<template>
  <main class="fixed top-28 right-0 w-full p-2 bg-white">
    <div class="relative w-full flex flex-row-reverse">
      <div class="mx-3">
        <button
          @click="search(key)"
          class="bg-orange-500 hover:opacity-80 p-2 rounded min-w-14"
        >
          بحث
        </button>
      </div>
      <div class="relative">
        <input
          @blur="handleBlure"
          class="p-1 mx-2 border-black border-2 text-center rounded"
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
          class="size-6 absolute right-3/4 top-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <!--suggestions-->
        <div
          id="suggestions"
          class="absolute right-2 top-10 bg-gray-600 w-48 max-h-20 overflow-y-auto rounded text-white"
          :class="{
            ' p-2': suggestions.length != 0,
          }"
        >
          <div
            @click="selectSuggestion(sug)"
            v-for="(sug, index) of suggestions"
            :key="index"
            class="hover:opacity-80 text-center my-1"
          >
            {{ sug }}
            <hr />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useStore } from "~/store/store";

const store = useStore();
const key = ref("");
const suggestions = ref([]);
const emit = defineEmits(["search"]);
watch(key, (n, o) => {
  suggestions.value = store.products.map((p) => {
    if (p.name.includes(n)) {
      return p.name;
    } else {
      return "";
    }
  });
  suggestions.value = suggestions.value.filter((s) => {
    return s != "";
  });
});
onMounted(() => {});
const selectSuggestion = (sug) => {
  key.value = sug;
  setTimeout(() => {
    suggestions.value = [];
  }, 50);
  search(sug);
};
const search = (n) => {
  emit("search", n);
};
const handleBlure = () => {
  suggestions.value = [];
};
</script>
