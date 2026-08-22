import type { HeaderProps } from "../../Components/Header/Header";

const CheckoutHeader = ({quantity}: HeaderProps) => {
    return (
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="images/logo.png" />
                <img className="mobile-logo" src="images/mobile-logo.png" />
              </a>
            </div>

            <div className="checkout-header-middle-section">
              Checkout (
              <a className="return-to-home-link" href="/">
                {quantity} items
              </a>
              )
            </div>

            <div className="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png" />
            </div>
          </div>
        </div>
    )
}


export default CheckoutHeader;