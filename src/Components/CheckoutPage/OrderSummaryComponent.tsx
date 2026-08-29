import type { CartExpanded } from "../../Interfaces/CartInterface";
import type { DeliveryOptionInterface } from "../../Interfaces/DeliveryOptionsInterface";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

interface OrderSummaryComponentProps {
  cart: CartExpanded[];
  deliveryOption: DeliveryOptionInterface[];
}

export const OrderSummaryComponent = ({
  cart,
  deliveryOption,
}: OrderSummaryComponentProps) => {
  let deliveryPrice = "Free Shiping";

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOption.find((option) => {
          return option.id === cartItem.deliveryOptionId;
        });

        return (
          <div key={cartItem.id} className="cart-item-container">
            <div className="delivery-date">
              {`Shiping date: ${dayjs(
                selectedDeliveryOption.estimatedDeliveryTimeMs,
              ).format("dddd, MMMM, D")}`}
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
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOption.map((option: DeliveryOptionInterface) => {
                  if (option.priceCents !== 0) {
                    deliveryPrice = formatMoney(option.priceCents);
                  }

                  return (
                    <div className="delivery-option" key={option.id}>
                      <input
                        type="radio"
                        checked={option.id === cartItem.deliveryOptionId}
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
