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
            class="w-1/3 h-40 md:w-1/4 relative m-3"
          >
            <img class="rounded m-1 w-full h-full" :src="img" alt="" />
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
  photos: [],
  sizes: [],
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
