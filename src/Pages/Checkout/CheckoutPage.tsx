import "../../Components/Header/Header.css";
import CheckoutHeader from "../../Components/CheckoutHeader/CheackoutHeader";
import "./CheckoutPage.css";
import "../../Components/CheckoutHeader/CheckoutPageHeader.css";
import { useEffect, useState } from "react";
import type { CartExpanded } from "../../Interfaces/CartInterface";
import axios from "axios";
import type { DeliveryOptionInterface } from "../../Interfaces/DeliveryOptionsInterface";
import type { OrderSummaryInterface } from "../../Interfaces/CheckoutInterfaces";
import { OrderSummaryComponent } from "../../Components/CheckoutPage/OrderSummaryComponent";
import { PaymentSummaryComponent } from "../../Components/CheckoutPage/PaymentSummaryComponent";

export const CheckoutPage = () => {
  const [cart, setCart] = useState<CartExpanded[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionInterface[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<OrderSummaryInterface>(null);


  const fetchCart = async () =>{
    let fetchCartresponse = await axios.get<CartExpanded[]>
      ("http://localhost:3000/api/cart-items?expand=product");

    setCart(fetchCartresponse.data);
  }
  
  const fetchOptions = async () => {
    let fetchOptionsRespone = await axios.get<DeliveryOptionInterface[]>
     ("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime")

     setDeliveryOption(fetchOptionsRespone.data);
  }
  
  const fetchSummary = async () => {
    let fetchSummaryRespone = await axios.get<OrderSummaryInterface>
     ("http://localhost:3000/api/payment-summary")

     setPaymentSummary(fetchSummaryRespone.data);
  }

  useEffect(() => {
      fetchCart();
      fetchOptions();
      fetchSummary();
  }, []);


  
  let cartQuantity: number = 0;

  cart.forEach((cartItem: CartExpanded) => {
    cartQuantity += cartItem.quantity;
  });

  return (
    <>
      <title>Checkout</title>

      <body>
        <CheckoutHeader quantity={cartQuantity} />

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummaryComponent
              cart={cart}
              deliveryOption={deliveryOption}
              fetchCartFunction={fetchCart}
              fetchSummary={fetchSummary}
            />

            {paymentSummary && (
              <PaymentSummaryComponent
                paymentSummary={paymentSummary}
                fetchCartFunction={fetchCart}
                fetchSummary={fetchSummary}
              />
            )}
          </div>
        </div>
      </body>
    </>
  );
};
