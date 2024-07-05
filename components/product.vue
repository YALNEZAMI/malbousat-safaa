<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="h-40 w-40 bg-black rounded text-white m-1"
  >
    <img class="h-1/2 w-full" onerror="" :src="product.photos[0]" alt="" />
    <div class="text-center h-1/4 p-1">{{ product.name }}</div>
    <div
      class="text-gray-400 italic text-sm px-2 flex flex-row space-x-2 pl-20"
    >
      <span>ل.س</span>
      <span>{{ product.price }}</span>
    </div>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  product: Object,
});
const product = props.product;
</script>
