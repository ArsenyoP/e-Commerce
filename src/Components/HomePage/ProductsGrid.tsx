import type { ProductInterface } from "../../Interfaces/ProductInterface";
import { Product } from "./Product";

interface ProductsGridProps{
    products: ProductInterface[]
    fetchCart: () => Promise<void>
}

export const ProductsGrid = ({products, fetchCart}: ProductsGridProps) =>{
    return <>
        <div className="products-grid">
          {products.map((product) => (
            <Product product={product} fetchCart={fetchCart} />
          ))}
        </div>
    </>
}