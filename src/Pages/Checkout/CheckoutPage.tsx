import "../../Components/Header/Header.css";
import CheckoutHeader from "../../Components/CheckoutHeader/CheackoutHeader";
import "./CheckoutPage.css";
import "../../Components/CheckoutHeader/CheckoutPageHeader.css";
import { useEffect, useState } from "react";
import type { CartExpanded } from "../../Interfaces/CartInterface";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import type { DeliveryOptionInterface } from "../../Interfaces/DeliveryOptionsInterface";

export const CheckoutPage = () => {
  const [cart, setCart] = useState<CartExpanded[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionInterface[]>([]);

  useEffect(() => {
    axios
      .get<CartExpanded[]>("http://localhost:3000/api/cart-items?expand=product")
        .then((response) => {
          console.log("Response:", response.data);
          setCart(response.data);
        });

    axios.get<DeliveryOptionInterface[]>("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime")
        .then( (response) =>{
          console.log("Delivery:",response.data)
          setDeliveryOption(response.data)
        } )
  }, []);

  let cartQuantity: number = 0;

  cart.forEach( (cartItem: CartExpanded) => {
    cartQuantity += cartItem.quantity;
  })

  return (
    <>
      <title>Checkout</title>

      <body>
        <CheckoutHeader quantity={cartQuantity} />

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <div className="order-summary">
              {cart.map((cart) => {
                return <div key={cart.id} className="cart-item-container">
                <div className="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>

                <div className="cart-item-details-grid">
                  <img
                    className="product-image"
                    src={cart.product.image}
                  />

                  <div className="cart-item-details">
                    <div className="product-name">
                      {cart.product.name}
                    </div>
                    <div className="product-price">{formatMoney(cart.product.priceCents)}</div>
                    <div className="product-quantity">
                      <span>
                        Quantity: <span className="quantity-label">{cart.quantity}</span>
                      </span>
                      <span className="update-quantity-link link-primary">
                        Update
                      </span>
                      <span className="delete-quantity-link link-primary">
                        Delete
                      </span>
                    </div>
                  </div>


                  <div className="delivery-options">
                    <div className="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div className="delivery-option">
                      <input
                        type="radio"
                        checked
                        className="delivery-option-input"
                        name="delivery-option-1"
                      />
                      <div>
                        <div className="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div className="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div className="delivery-option">
                      <input
                        type="radio"
                        className="delivery-option-input"
                        name="delivery-option-1"
                      />
                      <div>
                        <div className="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div className="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div className="delivery-option">
                      <input
                        type="radio"
                        className="delivery-option-input"
                        name="delivery-option-1"
                      />
                      <div>
                        <div className="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div className="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              })}
            </div>

            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>

              <div className="payment-summary-row">
                <div>Items (3):</div>
                <div className="payment-summary-money">$42.75</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">$4.99</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">$47.74</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">$4.77</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">$52.51</div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
