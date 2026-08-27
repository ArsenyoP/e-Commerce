import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage/HomePage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage/TrackingPage';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { CartItem } from './Interfaces/CartInterface';

function App() {

  const [cart, setCart] = useState<CartItem[]>([])

  useEffect( () => {
    axios.get<CartItem[]>("http://localhost:3000/api/cart-items")
      .then( (resonse) => {
        setCart(resonse.data)
        console.log(resonse.data)
      } )
  }, [])

  let cartQuantity = 0; 
  
  cart.forEach( (cartItem: CartItem) => {
    cartQuantity += cartItem.quantity
  });

  return (
    <Routes>
      <Route path='' element={<HomePage cartQuantity={cartQuantity}/>}></Route>
      <Route path='/checkout' element={<CheckoutPage/>}></Route>
      <Route path='/orders' element={<OrdersPage cartQuantity={cartQuantity}/>}></Route>
      <Route path='/tracking' element={<TrackingPage cartQuantity={cartQuantity}/>}></Route>
    </Routes>
  );
}

export default App
