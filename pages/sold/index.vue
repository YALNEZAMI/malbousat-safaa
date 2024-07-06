<template>
  <main>
    <!--sold products-->
    <h1 class="text-center font-bold underline text-xl">
      اسعار مخفضة لذوي الدخل المحدود
    </h1>
    <div id="productsContainer" class="flex flex-wrap flex-row p-2">
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
      لا يوجد منتجات مخفضة حتى اللحضة
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
const products: Ref<Product[]> = ref(
  store.products.filter((p: Product) => {
    return store.isSold(p);
  })
);
const mounted = ref(false);
onMounted(async () => {
  //init products
  if (store.products.length == 0) {
    // const prods = await store.getProducts();
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
