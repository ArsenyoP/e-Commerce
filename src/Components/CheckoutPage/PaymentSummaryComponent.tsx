import axios from "axios";
import type { OrderSummaryInterface } from "../../Interfaces/CheckoutInterfaces";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router-dom";

interface PaymentSummaryComponentProps {
  paymentSummary: OrderSummaryInterface;
  fetchCartFunction: () => Promise<void>;
  fetchSummary: () => Promise<void>;
}


export const PaymentSummaryComponent = ({
  paymentSummary,
  fetchCartFunction,
  fetchSummary,
}: PaymentSummaryComponentProps) => {

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      await axios.post("http://localhost:3000/api/orders");
      await fetchCartFunction();
      await fetchSummary();

      navigate("/orders")
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div>Items ({paymentSummary.totalItems}):</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary.productCostCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping & handling:</div>
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

      <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
        Place your order
      </button>
    </div>
  );
};