<template>
  <main>
    <!--authentication-->
    <div
      v-if="!store.admin.is && tryNumber != 0 && !isWrongPassword"
      class="flex justify-center"
    >
      <input
        type="text"
        placeholder="كلمة سر الادارة"
        dir="rtl"
        class="m-1 p-1 border-2 border-black rounded-md"
        v-model.trim="password"
      />
      <button
        @click="confirm"
        class="m-1 p-1 border-2 border-black text-white bg-orange-400 hover:opacity-80 rounded-md"
      >
        تاكيد
      </button>
    </div>
    <div
      v-if="store.admin.is && !hideAdminNotif"
      class="flex justify-center text-white bg-green-500 p-1 my-1 relative"
    >
      <span class="text-center">
        انت الان في وضع المدير
        <button
          :disabled="isWrongPassword"
          @click="hideAdminNotif = true"
          class="bg-red-500 hover:opacity-80 text-white font-bold px-2 rounded-full absolute right-1"
        >
          x
        </button>
      </span>
    </div>

    <div
      v-if="isWrongPassword"
      class="flex justify-center text-white bg-red-500 p-1 relative"
    >
      <span class="text-center">
        كلمة السر خطا بقي لديك {{ tryNumber }} محاولة</span
      >
    </div>

    <!--admin div-->
    <div v-if="store.admin.is">
      <!--add nav bar-->
      <div class="flex justify-center bg-gray-400 p-1 text-white">
        <div
          v-for="item in routes"
          :key="item.name"
          @click="setForm(item.query)"
          class="w-1/2 border-2 p-1 text-center underline hover:opacity-80 cursor-pointer"
          :class="{
            'border-black rounded': route.query.adding == item.query,
            'border-gray-400': route.query.adding != item.query,
          }"
        >
          {{ item.name }}
        </div>
      </div>
      <!--add product form-->
      <div
        v-if="route.query.adding == 'product'"
        class="flex flex-col p-3"
        dir="rtl"
      >
        <!--name-->
        <div>
          <label for="name">اسم المنتج</label>
          <br />
          <input
            type="text"
            v-model.trim="product.name"
            placeholder="بنطال ولادي"
            class="border-2 border-black px-1 rounded"
          />
        </div>
        <hr class="my-3" />
        <!--description-->
        <div>
          <label for="description">وصف المنتج</label>
          <br />
          <textarea
            type="text"
            v-model.trim="product.description"
            placeholder="بنطال ولادي لون اسود ممتاز كهدية لعيد الفطر السعيد"
            class="border-2 w-full h-20 border-black p-1 rounded"
          ></textarea>
        </div>
        <hr class="my-3" />
        <!--price-->
        <div class="flex">
          <div class="flex flex-col w-1/2">
            <span> السعر (ل.س) </span>
            <input
              type="number"
              v-model="product.price"
              placeholder="100000"
              class="border-2 w-20 border-black px-1 rounded"
            />
          </div>
          <div class="mx-2 flex">
            <input type="checkbox" v-model="isSolded" />
            <span class="pt-3 mx-1">تخفيض</span>
          </div>
          <div v-if="isSolded">
            السعر الجديد (ل.س)
            <input
              type="number"
              v-model="product.sold"
              placeholder="100000"
              class="border-2 w-32 border-black px-1 rounded"
            />
          </div>
        </div>
        <hr class="my-3" />

        <!--sizes-->
        <label for="sizes" class="mb-1">اختر المقاسات المتوفرة :</label>
        <div class="flex justify-center">
          <span
            @click="toogleSize(size)"
            v-for="(size, index) of sizes"
            class="opacity-75 cursor-pointer p-1 min-w-7 mx-1 text-center rounded-full"
            :class="{
              'bg-black text-white': product.sizes.includes(size),
              'bg-gray-300': !product.sizes.includes(size),
            }"
            :key="index"
            >{{ size }}</span
          >
        </div>
        <hr class="my-4" />

        <!--photos form-->
        <div class="flex mb-3">
          <input
            type="text"
            class="p-1 border-2 border-black mx-2 rounded"
            placeholder="رابط الصورة"
            v-model="photoLinkToAdd"
          />
          <button
            @click="addPhoto"
            class="p-1 rounded bg-green-500 text-white opacity-80"
          >
            اضافة
          </button>
        </div>
        <!--photos added-->
        <div class="flex flex-wrap justify-center">
          <div
            v-for="img of product.photos"
            :key="img"
            class="w-1/3 md:w-1/4 relative"
          >
            <img class="rounded m-1" :src="img" alt="" />
            <button
              @click="deletePhoto(img)"
              class="absolute right-0 top-0 py-0 px-2 rounded bg-red-500 text-white hover:opacity-80"
            >
              x
            </button>
          </div>
        </div>
        <hr class="my-3" />

        <!--submit-->
        <div class="flex justify-center">
          <button
            @click="addProduct"
            class="bg-blue-400 hover:opacity-80 px-3 py-2 rounded text-white"
          >
            <span v-if="route.query.update === 'true'">تعديل</span>
            <span v-else>اضافة</span> المنتج
          </button>
        </div>
      </div>
      <!--add newsPiece form-->

      <div
        v-if="route.query.adding == 'newsPiece'"
        class="flex flex-col p-3"
        dir="rtl"
      >
        <!--description of news-->
        <div>
          <label for="description"> محتوى الخبر</label>
          <br />
          <textarea
            type="text"
            v-model.trim="newsPiece.message"
            placeholder="نعلن عن مجموعة روب احمر متوفرة ابتداء من اليوم"
            class="border-2 w-full h-20 border-black p-1 rounded"
          ></textarea>
        </div>

        <hr class="my-3" />

        <!--submit-->
        <div class="flex justify-center">
          <button
            @click="addNewsPiece"
            class="bg-blue-400 hover:opacity-80 px-3 py-2 rounded text-white"
          >
            اضافة الخبر
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/store";
import type NewsPiece from "~/types/newsPiece";
import type Product from "~/types/product";

const password = ref("");
const store = useStore();
const router = useRouter();
const route = useRoute();
const routes = ref([
  { name: "أضافة خبر", query: "newsPiece" },
  { name: "أضافة منتج", query: "product" },
]);
const hideAdminNotif = ref(false);
const isWrongPassword = ref(false);
const isSolded = ref(false);
const tryNumber = ref(3);
const sizes = ref(["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"]);
const photoLinkToAdd = ref("");
const product: Ref<Product> = ref({
  name: "",
  description: "",
  price: 0,
  sold: 0,
  photos: [
    "data:image/jpeg;base64,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",
  ],
  sizes: ["s"],
  update_date: new Date(),
});
if (route.query.update == "true") {
  product.value = store.getProductById(route.query._id as string);
  if (store.isSold(product.value)) {
    isSolded.value = true;
  }
}
const newsPiece: Ref<NewsPiece> = ref({
  date: new Date(),
  message: "",
});
const confirm = async () => {
  const auth = await $fetch("/api/admin", {
    params: {
      password: password.value,
    },
  });
  if (auth) {
    store.setAdmin({
      is: true,
      password: password.value,
    });
    setForm("product");
  } else {
    tryNumber.value--;
    isWrongPassword.value = true;
    setTimeout(() => {
      isWrongPassword.value = false;
    }, 3000);
  }
};
const setForm = (formName: string) => {
  router.push({
    query: { ...route.query, adding: formName },
  });
};
const toogleSize = (size: string) => {
  if (product.value.sizes.includes(size)) {
    product.value.sizes = product.value.sizes.filter((s: string) => {
      return s != size;
    });
  } else {
    product.value.sizes.push(size);
  }
};
const addPhoto = () => {
  if (photoLinkToAdd.value == "") {
    alert("انسخ رابط الصورة اولا");
    return;
  }
  product.value.photos.push(photoLinkToAdd.value);
  photoLinkToAdd.value = "";
};
const deletePhoto = (img: string) => {
  product.value.photos = product.value.photos.filter((i: string) => {
    return i != img;
  });
};
const addProduct = async () => {
  //reformating and validation
  if (product.value.name == "") {
    alert("الاسم ضروري");
    return;
  }
  if (product.value.description == "") {
    alert("الوصف ضروري");
    return;
  }
  if (product.value.name == "") {
    alert("الاسم ضروري");
    return;
  }
  if (product.value.photos.length == 0) {
    alert("يرجى اضافة رابط صورة على الاقل");
    return;
  }
  if (product.value.sizes.length == 0) {
    alert("يرجى اختيار مقاس واحد على الاقل");
    return;
  }
  if (!isSolded.value) {
    product.value.sold = product.value.price;
  } else {
    if (product.value.sold > product.value.price) {
      product.value.price = product.value.sold;
    }
  }
  product.value.update_date = new Date();
  //api call
  let method: any = "POST";
  if (route.query.update == "true") {
    method = "PATCH";
  }
  const process: any = await $fetch("/api/products", {
    method,
    body: product.value,
    query: {
      password: store.admin.password,
    },
  });
  console.log("product", process);
  if (route.query.update == undefined) {
    store.addProduct(process.product);
  } else {
    store.updateProduct(process.product);
  }
  router.push("/news");
};
const addNewsPiece = async () => {
  if (newsPiece.value.message == "") {
    alert("محتوى الخبر ضروري");
    return;
  }
  //update date
  newsPiece.value.date = new Date();
  //api call
  const newsPieceAdding: any = await $fetch("/api/newsPieces", {
    method: "POST",
    body: newsPiece.value,
    query: {
      password: store.admin.password,
    },
  });
  store.addNewsPiece(newsPieceAdding.newsPiece);
  router.push("/news");
};
</script>
