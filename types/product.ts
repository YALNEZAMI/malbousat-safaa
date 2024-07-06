export default interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  photos: string[];
  sizes: string[];
  sold: number;
  update_date: Date | string;
}
