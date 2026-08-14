import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage/HomePage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='' element={<HomePage />}></Route>
      <Route path='/checkout' element={<CheckoutPage />}></Route>
    </Routes>
  );
}

export default App
