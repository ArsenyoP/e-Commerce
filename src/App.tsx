import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage/HomePage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage/TrackingPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='' element={<HomePage />}></Route>
      <Route path='/checkout' element={<CheckoutPage />}></Route>
      <Route path='/orders' element={<OrdersPage />}></Route>
      <Route path='/tracking' element={<TrackingPage />}></Route>
    </Routes>
  );
}

export default App
