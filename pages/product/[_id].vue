<template>
  <main>
    <!--images-->
    <div class="flex justify-center relative">
      <div class="absolute top-0 right-2">
        {{ indexPhoto + 1 + "/" + product.photos.length }}
      </div>
      <div class="flex justify-center items-center">
        <svg
          @click="last"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10 text-3xl"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <img
        class="w-3/4 max-h-64 md:w-1/2 rounded"
        :src="product.photos[indexPhoto]"
        alt=""
      />
      <div class="flex justify-center items-center">
        <svg
          @click="next"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </div>
    <hr />
    <!--name-->
    <div class="relative text-center text-2xl font-semibold my-2 underline">
      {{ product.name }}
      <div class="absolute right-2 top-0 underline">
        <span class="text-gray-400" style="font-size: x-small">{{
          store.formatDate(date)
        }}</span>
      </div>
    </div>
    <hr />
    <!--description-->
    <p
      dir="rtl"
      class="my-2 max- h-10 overflow-hidden"
      :class="{
        'max-h-max overflow-auto': allDescription,
      }"
    >
      {{ product.description }}
    </p>
    <!--switch desc length-->
    <div
      v-if="product.description.length > 77"
      class="flex justify-center text-blue-500"
    >
      <span @click="allDescription = !allDescription" class="cursor-pointer">
        <!--hide desc-->
        <svg
          v-if="allDescription"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7 border-2 rounded-full border-blue-200"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>
        <!--display all desc-->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7 border-2 rounded-full border-blue-200"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
          />
        </svg>
      </span>
    </div>
    <hr class="my-3" />
    <!--rest size-->
    <div class="my-2 flex flex-row-reverse justify-center px-2">
      <span class="mx-5 pt-1">مقاسات متوفرة</span>
      <span class="mx-5">
        <select class="p-1 border-2">
          <option v-for="(size, index) of product.sizes" :key="index" value="">
            {{ size }}
          </option>
        </select>
      </span>
    </div>
    <hr class="my-3" />

    <!--price-->
    <div class="my-2 flex flex-row-reverse justify-center px-2">
      <span class="mx-5">السعر</span>
      <span class="mx-5">{{ product.price + "ل.س" }}</span>
    </div>
    <hr class="my-3" />

    <!--return button-->
    <div class="flex justify-center mb-3">
      <button
        @click="back"
        class="bg-orange-500 hover:opacity-90 w-max rounded p-2"
      >
        رجوع الى القائمة
      </button>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/store";
import type Product from "~/types/product";

const store = useStore();
const route = useRoute();
const router = useRouter();
const indexPhoto = ref(0);
const allDescription = ref(false);
const prodStore = store.getProductById(route.params._id as string);
const product: Ref<Product> = ref(prodStore);
const date = ref(new Date(product.value.update_date));
const last = () => {
  if (indexPhoto.value == 0) {
    indexPhoto.value = product.value.photos.length - 1;
  } else {
    indexPhoto.value--;
  }
};
const next = () => {
  if (indexPhoto.value == product.value.photos.length - 1) {
    indexPhoto.value = 0;
  } else {
    indexPhoto.value++;
  }
};
const back = () => {
  router.back();
};
onMounted(async () => {
  //init products
  if (store.products.length == 0) {
    // const prods = await store.getProducts();
    const productsCall: any = await $fetch("/api/products", {
      method: "GET",
    });

    store.setProducts(productsCall.products);
    product.value = store.getProductById(route.query._id as string);
  }
});
</script>
