<template>
  <main
    :class="{
      'h-52': store.admin.is,
    }"
    class="relative h-44 w-40 bg-black rounded text-white m-1"
  >
    <NuxtLink :to="`/product/${product._id}`" class="hover:opacity-80">
      <img class="h-1/2 w-full" onerror="" :src="product.photos[0]" alt="" />
      <div class="text-center h-9 px-1">{{ product.name }}</div>
      <div
        :class="{
          'pl-20': !isSold(),
        }"
        class="text-gray-400 italic text-sm px-2 flex flex-row space-x-2 justify-between"
      >
        <div v-if="isSold()" class="flex items-end text-red-500">
          -{{ getReductionPercentage() }}%
        </div>
        <div class="flex">
          <span class="mr-1">ل.س</span>
          <div class="flex flex-col">
            <span v-if="isSold()">{{ product.sold }}</span>

            <span
              :class="{
                'line-through text-xs': isSold(),
              }"
              >{{ product.price }}</span
            >
          </div>
        </div>
      </div>
    </NuxtLink>
    <div v-if="store.admin.is" class="absolute bottom-0 left-0 w-full">
      <button
        @click="deleteProduct"
        class="w-1/2 p-1 bg-red-500 hover:opacity-80 text-white"
      >
        حذف
      </button>
      <button
        @click="updateProduct"
        class="w-1/2 p-1 bg-green-500 hover:opacity-80 text-white"
      >
        تعديل
      </button>
    </div>
  </main>
</template>
<script setup>
import { useStore } from "~/store/store";

const store = useStore();
const router = useRouter();
const props = defineProps({
  product: Object,
});
const emit = defineEmits(["deleted"]);
const product = props.product;
const isSold = () => {
  return store.isSold(product);
};
const getReductionPercentage = () => {
  const red = 100 - (100 * product.sold) / product.price;
  return red.toPrecision(2);
};
const deleteProduct = async () => {
  const deletingCall = await $fetch("/api/products", {
    method: "DELETE",
    params: {
      password: store.admin.password,
      _id: product._id,
    },
  });
  if (deletingCall.success) {
    emit("deleted", product._id);
  }
};
const updateProduct = () => {
  router.push("/admin?_id=" + product._id + "&update=true&adding=product");
};
</script>
