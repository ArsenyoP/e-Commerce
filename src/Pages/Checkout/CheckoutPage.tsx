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
  const [paymentSummary, setPaymentSummary] = useState<OrderSummaryInterface>(null)

  useEffect(() => {
    axios
      .get<
        CartExpanded[]
      >("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        console.log("Response:", response.data);
        setCart(response.data);
      });

    axios
      .get<
        DeliveryOptionInterface[]
      >("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        console.log("Delivery:", response.data);
        setDeliveryOption(response.data);
      });

    axios.get<OrderSummaryInterface>("http://localhost:3000/api/payment-summary")
      .then( (response) => {
        setPaymentSummary(response.data)
      } ) 
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
            />

            {paymentSummary && (
              <PaymentSummaryComponent paymentSummary={paymentSummary} />
            )}
          </div>
        </div>
      </body>
    </>
  );
};
