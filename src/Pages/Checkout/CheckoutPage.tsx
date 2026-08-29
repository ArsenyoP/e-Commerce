import "../../Components/Header/Header.css";
import CheckoutHeader from "../../Components/CheckoutHeader/CheackoutHeader";
import "./CheckoutPage.css";
import "../../Components/CheckoutHeader/CheckoutPageHeader.css";
import { useEffect, useState } from "react";
import type { CartExpanded } from "../../Interfaces/CartInterface";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import type { DeliveryOptionInterface } from "../../Interfaces/DeliveryOptionsInterface";
import dayjs from "dayjs";
import type { OrderSummaryInterface } from "../../Interfaces/CheckoutInterfaces";

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

  let deliveryPrice = "Free Shiping";

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
            {/* orders grid */}
            <div className="order-summary">
              {cart.map((cart) => {
                const selectedDeliveryOption = deliveryOption
                .find((option) => {
                  return option.id === cart.deliveryOptionId;
                })

                return (
                  <div key={cart.id} className="cart-item-container">
                    <div className="delivery-date">
                    {`Shiping date: ${dayjs(
                      selectedDeliveryOption.estimatedDeliveryTimeMs,
                    ).format("dddd, MMMM, D")}`}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image" src={cart.product.image} />

                      <div className="cart-item-details">
                        <div className="product-name">{cart.product.name}</div>
                        <div className="product-price">
                          {formatMoney(cart.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cart.quantity}
                            </span>
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
                        {deliveryOption.map(
                          (option: DeliveryOptionInterface) => {
                            if (option.priceCents !== 0) {
                              deliveryPrice = formatMoney(option.priceCents);
                            }

                            return (
                              <div className="delivery-option" key={option.id}>
                                <input
                                  type="radio"
                                  checked={option.id === cart.deliveryOptionId}
                                  className="delivery-option-input"
                                  name={`delivery-option-${cart.product.id}`} 
                                />
                                <div>
                                  <div className="delivery-option-date">
                                    {deliveryPrice}
                                  </div>
                                  <div className="delivery-option-price">
                                    {`Shiping date: ${dayjs(
                                      option.estimatedDeliveryTimeMs,
                                    ).format("dddd, MMMM, D")}`}
                                  </div>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary grid */}
            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>

              <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentSummary.productCostCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentSummary.shippingCostCents)}
                </div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentSummary.taxCents)}
                </div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                  {formatMoney(paymentSummary.totalCostCents)}
                </div>
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
