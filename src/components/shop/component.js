import React, { useEffect, useMemo, useState, useContext } from "react";
import "./styles.css";
import { ListGroup } from "react-bootstrap";
import { UserContext, ProductsContext } from "../../contexts";

function Shop() {
  const { products, setProducts } = useContext(ProductsContext);

  return (
    <div className="shop-container">
      <h3>
        Shop
      </h3>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.product_id} className='product'>
            {product?.product_name} 
          </ListGroup.Item>
        ))}
      </ListGroup>
      
    </div>
  );
}

export default Shop;
