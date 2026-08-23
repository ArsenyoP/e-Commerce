export interface CartItem {
    id: number;
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    createdAt: string;
    updatedAt: string;
  }


export interface CartInterface{
  Items: CartItem[]
}