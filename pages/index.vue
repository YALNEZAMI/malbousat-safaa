<template>
  <main>
    <search @search="handleSearch" />
    <div id="container" class="flex flex-wrap flex-row p-2">
      <product
        v-for="product of products"
        :key="JSON.stringify(product)"
        :product="product"
      />
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/store";
import type Product from "~/types/product";
const store: any = useStore();
const products: Ref<Product[]> = ref(store.products);
const handleSearch = (key: string) => {
  products.value = [];
  if (key) {
    products.value = store.products.filter((p: Product) => {
      return p.name.includes(key) || p.description.includes(key);
    });
  } else {
    products.value = store.products;
  }
};
</script>
