import axios from "axios";
import "../../Components/Header/Header.css";
import "./HomePage.css";
import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import type { CartQuantityProps } from "../../Interfaces/CartQuantityProps";
import type { ProductInterface } from "../../Interfaces/ProductInterface";
import { ProductsGrid } from "../../Components/HomePage/ProductsGrid";


export const HomePage = ({cartQuantity}: CartQuantityProps) => {
  
  const [products, setProducts] = useState<ProductInterface[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      let fetchProductsResponse = await axios.get<ProductInterface[]>
        ("http://localhost:3000/api/products")

        setProducts(fetchProductsResponse.data);
    }
    
    fetchProducts()
  }, [])
  

  return (
    <>
      <title>Home Page</title>

      <Header quantity={cartQuantity}/>
      <div className="home-page">

      <ProductsGrid products={products}/>
        
      </div>
    </>
  );
};
