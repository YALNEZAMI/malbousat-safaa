<template>
  <main>
    <!--last products-->
    <h1 class="text-center font-bold underline text-xl">اخر صيحات الموضة</h1>
    <div
      id="productsContainer"
      class="flex flex-wrap justify-center flex-row p-2"
    >
      <product
        v-for="product of products"
        :key="JSON.stringify(product)"
        :product="product"
        @deleted="handleProductDeleted"
      />
      <!--no new products message-->
      <div
        v-if="products.length == 0 && mounted"
        class="text-center bg-red-200 rounded w-full p-2"
      >
        لا يوجد منتجات جديدة حتى اللحضة
      </div>
      <div
        v-else-if="!mounted"
        class="text-center bg-green-200 rounded w-full p-2"
      >
        جار البحث...
      </div>
    </div>
    <hr class="my-4" />
    <!--last news-->
    <h1 class="text-center font-bold underline text-xl">اخرالاخبار</h1>
    <div id="newsContainer" class="flex flex-wrap flex-col p-2">
      <newsPiece
        v-for="newsPiece of newsPieces"
        :key="JSON.stringify(newsPiece)"
        :newsPiece="newsPiece"
        @deleted="handleDeleted"
      />
      <!--no new pieces message-->
      <div
        v-if="store.newsPieces.length == 0 && mounted"
        class="text-center bg-red-200 rounded w-full p-2"
      >
        لا يوجد اخبار جديدة حتى اللحضة
      </div>
      <div
        v-else-if="!mounted"
        class="text-center bg-green-200 rounded w-full p-2"
      >
        جار البحث...
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/store";
import type NewsPiece from "~/types/newsPiece";
import type Product from "~/types/product";
const store: any = useStore();
const products: Ref<Product[]> = ref(store.products.slice(0, 4));
const newsPieces: Ref<NewsPiece[]> = ref(store.newsPieces);
const mounted = ref(false);
onMounted(async () => {
  if (newsPieces.value.length == 0) {
    const newsPiecesCall: any = await $fetch("/api/newsPieces", {
      method: "GET",
    });
    newsPieces.value = newsPiecesCall.newsPieces;
    store.setNewsPieces(newsPiecesCall.newsPieces);
  }
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
const handleDeleted = (_id: string) => {
  newsPieces.value = newsPieces.value.filter((np: NewsPiece) => {
    return _id != np._id;
  });
  store.setNewsPieces(newsPieces.value);
};
const handleProductDeleted = (_id: string) => {
  products.value = products.value.filter((p: Product) => {
    return _id != p._id;
  });
  store.setProducts(products.value);
};
</script>
