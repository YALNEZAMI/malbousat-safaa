<template>
  <main class="m-1">
    <div class="flex flex-row-reverse w-full">
      <img
        class="w-10 h-10 rounded-full"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png"
        alt=""
      />
      <span class="flex justify-center items-center mx-2 underline"
        >المدير</span
      >
    </div>
    <div dir="rtl">
      <span>{{ newsPiece.message }}</span>
      <br />
      <div class="flex justify-between">
        <span class="text-sm text-gray-400">{{ store.formatDate(date) }}</span>
        <span
          v-if="store.admin.is"
          @click="deleteNewsPiece()"
          class="bg-red-500 cursor-pointer hover:opacity-80 p-1 rounded text-white"
          >حذف</span
        >
      </div>
    </div>
    <hr class="my-1" />
  </main>
</template>
<script setup>
import { useStore } from "~/store/store";

const props = defineProps({
  newsPiece: Object,
});
const store = useStore();
const emit = defineEmits(["deleted"]);
const newsPiece = props.newsPiece;
console.log(newsPiece, "from comopo");
const date = new Date(newsPiece.date);
const deleteNewsPiece = async () => {
  const deletingCall = await $fetch("/api/newsPieces", {
    method: "DELETE",
    params: {
      _id: newsPiece._id,
      password: store.admin.password,
    },
  });
  if (deletingCall.sucess) {
    emit("deleted", newsPiece._id);
  }
};
</script>
