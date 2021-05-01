import React, { useState, useContext } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserContext } from '../../contexts';

const Header = () => {
  const { currentUser, setCurrentuser } = useContext(UserContext);
  return (
    <div className="header-component ">
      <div className="options-container">
        <Link className="option-link" to="/">
          HOMEPAGE
        </Link>
        <Link className="option-link" to="/shop">
          SHOP
        </Link>
        <Link className="option-link" to="/order-history">
          ORDER HISTORY
        </Link>
        {currentUser&&currentUser.is_adm&&
        <Link className="option-link" to="/sale-stats">
          SALES STATS
        </Link>}
        <Link className="option-link" to="/signin">
          LOGIN / REGISTER
        </Link>
      </div>
    </div>
  );
};

export default Header;
