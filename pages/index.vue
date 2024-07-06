<template>
  <main class="pt-12 relative">
    <search-bar @search="handleSearch" />
    <div id="container" class="flex flex-wrap flex-row p-2">
      <product
        v-for="product of products"
        :key="JSON.stringify(product)"
        :product="product"
        @deleted="handleProductDeleted"
      />
    </div>
    <!--no sold message-->
    <div
      v-if="products.length == 0 && mounted"
      class="text-center bg-red-200 rounded w-full p-2"
    >
      لا يوجد منتجات حتى اللحضة
    </div>
    <div
      v-else-if="!mounted"
      class="text-center bg-green-200 rounded w-full p-2"
    >
      جار البحث...
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
const mounted = ref(false);
onMounted(async () => {
  //init products
  if (store.products.length == 0) {
    const productsCall: any = await $fetch("/api/products", {
      method: "GET",
    });

    products.value = productsCall.products;

    store.setProducts(productsCall.products);
  }
  mounted.value = true;
});
const handleProductDeleted = (_id: string) => {
  products.value = products.value.filter((p: Product) => {
    return _id != p._id;
  });
  store.setProducts(products.value);
};
</script>
