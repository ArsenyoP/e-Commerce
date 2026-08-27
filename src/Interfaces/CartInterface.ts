import type { ProductInterface } from "./ProductInterface";

export interface CartItem {
    id: number;
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    createdAt: string;
    updatedAt: string;
  }

export interface CartExpanded {
  id: number;
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  createdAt: string;
  updatedAt: string;
  product: ProductInterface;
}

export interface CartInterface{
  Items: CartItem[]
}