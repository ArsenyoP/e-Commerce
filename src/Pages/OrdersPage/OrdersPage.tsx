import "../../Components/Header/Header.css";
import Header from "../../Components/Header/Header";
import type { CartQuantityProps } from "../../Interfaces/CartQuantityProps";
import "./OrdersPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import type { OrderInterface } from "../../Interfaces/OrderInterfaces";
import { formatMoney } from "../../utils/money";
import { formatDate } from "../../utils/dateTime";

export const OrdersPage = ({cartQuantity}: CartQuantityProps) => {

  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const fetchOrders = async () =>{
    let response = await axios.get<OrderInterface[]>("http://localhost:3000/api/orders?expand=products")
    setOrders(response.data)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderInterface[]>(
          "http://localhost:3000/api/orders?expand=products"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header quantity={cartQuantity}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.map((order) => {
          return  <div className="order-container" key={order.id}>
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>June 10</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>


            {order.products.map((product) => {
              return <div className="order-details-grid">
              <div className="product-image-container">
                <img src={product.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {product.product.name}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {formatDate(product.estimatedDeliveryTimeMs)}
                </div>
                <div className="product-quantity">Quantity: {product.quantity}</div>
                <button className="buy-again-button button-primary">
                  <img className="buy-again-icon" src="images/icons/buy-again.png" />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
                <a href="/tracking">
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>
            })}
            

          </div>
          })}
          


        </div>
      </div>
    </>
  );
};
