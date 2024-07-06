import { defineStore } from "pinia";
import type { Admin } from "~/types/admin";
import type NewsPiece from "~/types/newsPiece";
import type Product from "~/types/product";
interface StoreState {
  products: Product[];
  newsPieces: NewsPiece[];
  admin: Admin;
}
export const useStore = defineStore("store", {
  state: (): StoreState => ({
    products: [],
    newsPieces: [],
    admin: { is: false, password: "" },
  }),
  actions: {
    isSold(product: Product) {
      return product.price > product.sold;
    },
    setAdmin(val: Admin) {
      this.admin = val;
    },
    setProducts(prods: Product[]) {
      this.products = prods;
    },
    addProduct(prod: Product) {
      this.products.push(prod);
    },
    updateProduct(prod: Product) {
      this.products = this.products.map((p: Product) => {
        if (prod._id == p._id) {
          return prod;
        } else {
          return p;
        }
      });
    },
    addNewsPiece(np: NewsPiece) {
      this.newsPieces.push(np);
    },
    setNewsPieces(nps: NewsPiece[]) {
      this.newsPieces = nps;
    },
    getProductById(_id: string): Product {
      const res = this.products.find((p: Product) => {
        return _id == p._id;
      });
      return res as Product;
    },
    formatDate(date: any) {
      const pad = (num: any) => num.toString().padStart(2, "0"); // Helper function to pad numbers with leading zeros
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1); // Months are zero-indexed in JavaScript
      const year = date.getFullYear();

      return `${minutes}:${hours} ${day}/${month}/${year}`;
    },
  },
});
