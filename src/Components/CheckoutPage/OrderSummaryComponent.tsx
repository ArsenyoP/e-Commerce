import axios from "axios";
import type { CartExpanded } from "../../Interfaces/CartInterface";
import type { DeliveryOptionInterface } from "../../Interfaces/DeliveryOptionsInterface";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { formatDate } from "../../utils/dateTime";

interface OrderSummaryComponentProps {
  cart: CartExpanded[];
  deliveryOption: DeliveryOptionInterface[];
  fetchCartFunction: () => Promise<void>;
  fetchSummary: () => Promise<void>
}

export const OrderSummaryComponent = ({
  cart,
  deliveryOption,
  fetchCartFunction,
  fetchSummary
}: OrderSummaryComponentProps) => {

  

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOption.find((option) => {
          return option.id === cartItem.deliveryOptionId;
        });

        let deliveryPrice = "Free Shiping";

        const handleDelete = async () => {
          try {
            await axios.delete(`http://localhost:3000/api/cart-items/${cartItem.productId}`);
            await fetchCartFunction();
            await fetchSummary();
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        };

        return (
          <div key={cartItem.id} className="cart-item-container">
            <div className="delivery-date">
              {`Shiping date: ${formatDate(selectedDeliveryOption.estimatedDeliveryTimeMs)}`}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity:{" "}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOption.map((option) => {
                  if (option.priceCents !== 0) {
                    deliveryPrice = formatMoney(option.priceCents);
                  }

                  const updateQuantity = async () => {
                    await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`,
                      { deliveryOptionId: option.id});
                      await fetchCartFunction();
                      await fetchSummary();
                  }

                  return (
                    <div className="delivery-option" key={option.id}
                      onClick={updateQuantity}>
                      <input
                        type="radio"
                        checked={option.id === cartItem.deliveryOptionId}
                        onChange={() => {}}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.product.id}`}
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


                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
