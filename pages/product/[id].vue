<template>
  <main>
    <!--images-->
    <div class="flex justify-center">
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
    <div class="text-center text-2xl font-semibold my-2 underline">
      {{ product.name }}
    </div>
    <hr />
    <!--description-->
    <p
      class="my-2 max-h-10 overflow-hidden"
      :class="{
        'max-h-max overflow-auto': allDescription,
      }"
    >
      {{ product.description }}
    </p>
    <!--switch desc length-->
    <div class="flex justify-center text-blue-500">
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
    <!--rest size-->
    <div class="my-2 flex flex-row-reverse justify-between px-2">
      <span>مقاسات متوفرة</span>
      <span>
        <select class="p-2">
          <option v-for="(size, index) of product.sizes" :key="index" value="">
            {{ size }}
          </option>
        </select>
      </span>
    </div>
    <!--price-->
    <div class="my-2 flex flex-row-reverse justify-between px-2">
      <span>السعر</span>
      <span>{{ product.price }}</span>
    </div>
    <!--return button-->
    <div class="flex justify-center">
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
const product: Ref<Product> = ref(
  store.products.find((p: Product) => {
    return p.id == route.params.id;
  })
);
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
</script>
