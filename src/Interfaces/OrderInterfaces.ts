import type { ProductInterface } from "./ProductInterface";

export interface OrderProduct {
    productId: string;
    quantity: number;
    estimatedDeliveryTimeMs: number;
    product: ProductInterface;
  }
  
  export interface OrderInterface {
    id: string;
    orderTimeMs: number;
    totalCostCents: number;
    products: OrderProduct[];
    createdAt: string;
    updatedAt: string;
  }