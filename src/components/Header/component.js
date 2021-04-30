import React, { useState } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
  const [currentUser, setCurrentuser] = useState(false);
  return (
    <div className="header-component ">
      <div className="options-container">
        <Link
          className="option-link"
          to="/shop"
          
        >
          SHOP
        </Link>
        <Link
          className="option-link"
          to="/"
        >
          HOMEPAGE
        </Link>
        <Link
          className="option-link"
          to="/contact"
        >
          CONTACT
        </Link>
        <Link
          className="option-link"
          to="/order-history"
        >
          ORDER HISTORY
        </Link>
        <Link
          className="option-link"
          to="/cart"
        >
          CART
        </Link>
        {currentUser ? (
          <Link
            className="option-link"
          >
            SIGN OUT
          </Link>
        ) : (
          <Link
            className="option-link"
            to="/signin"
          >
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
