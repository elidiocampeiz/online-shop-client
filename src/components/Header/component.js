import React, { useState } from "react";
import "./styles.css";

const Header = ({ setSelectedPage }) => {
  const [currentUser, setCurrentuser] = useState("");
  const signOut = () => console.log("signOut");
  return (
    <div className="header-component ">
      <div className="options-container">
        <div
          className="option-link"
          to="/shop"
          onClick={() => setSelectedPage("SHOP")}
        >
          SHOP
        </div>
        <div
          className="option-link"
          to="/contact"
          onClick={() => setSelectedPage("CONTACT")}
        >
          CONTACT
        </div>
        <div
          className="option-link"
          to="/order-history"
          onClick={() => setSelectedPage("ORDER HISTORY")}
        >
          ORDER HISTORY
        </div>
        <div
          className="option-link"
          to="/cart"
          onClick={() => setSelectedPage("CART")}
        >
          CART
        </div>
        {currentUser ? (
          <div
            className="option-link"
            onClick={() => setSelectedPage("SIGN OUT")}
          >
            SIGN OUT
          </div>
        ) : (
          <div
            className="option-link"
            to="/signin"
            onClick={() => setSelectedPage("SIGN IN")}
          >
            SIGN IN
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
