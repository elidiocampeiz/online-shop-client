import React, { useEffect, useMemo, useState, useContext, useCallback } from "react";
import "./styles.css";
import { ListGroup, Card, FormControl } from "react-bootstrap";
import { UserContext, ProductsContext, CartContext } from "../../contexts";
import {createOrder, createSale} from '../../online-shop-api'
function Shop() {
  const { products, setProducts } = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);
  const { currentUser, setCurrentuser } = useContext(UserContext);

  const [productsList, setProductsList] = useState();
  const cartList = useMemo(
    () =>
      Object.keys(cart)
        .filter((key) => cart?.[key]?.count > 0)
        .map((key) => ({
          ...cart[key],
        })) || [],
    [cart]
  );
  const totalAmount = useMemo(() => {
    return cartList?.reduce((prev, prod) => {
      const val = Number(prod?.price?.replace("$", ""));
      const c = Number(prod?.count) || 1;
      const tots = c * val;
      return prev + tots;
    }, 0);
  }, [cartList]);
  const clear = () => setCart({});

  const removeFromCart = (product) => {
    const key = product?.product_id;
    if (key in cart && cart?.[key]?.count > 0) {
      const oldProd = cart?.[key] || {};
      var newCart = { ...cart };
      const newProd = {
        ...product,
        count: oldProd.count - 1,
      };
      newCart[key] = newProd;
      setCart(newCart);
    }
  };
  const addToCart = (product, count = 1) => {
    const key = product?.product_id;
    const oldProd = cart?.[key] || {};
    var newCart = { ...cart };
    const newProd = {
      ...product,
      count: count + oldProd.count || count,
    };
    newCart[key] = newProd;
    setCart(newCart);
  };
  const search = (event) => {
    if (event.target.value != null) {
      const newP = products.filter((prod) =>
        prod.product_name
          ?.toLowerCase()
          .includes(event?.target?.value?.toLowerCase())
      );
      setProductsList(newP);
    } else {
      setProductsList(products);
    }
  };
  const checkout = useCallback( async () => {
    if( !currentUser || !currentUser.user_id){
      alert("Please Login to Checkout");
      return 
    }
    if(!totalAmount || totalAmount <= 0){
      alert("Please add Items to cart before checkout");
      return 
    }
    try {
      const data = await createOrder(currentUser.user_id,`$${totalAmount}`);
      cartList.forEach(async ({ product_id, count })=> {
        const sale = await createSale(data?.order_id, product_id, count);
        console.log(sale);
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    alert("Thank you for your purchase!");
    clear();
  }, [cartList, totalAmount, currentUser,clear])
  useEffect(() => {
    setProductsList(products);
  }, [products]);
  return (
    <div className="shop-container">
      <h3>Welcome to Online Shop!</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card
          style={{
            flex: 2,
            margin: "5px",
            padding: "5px",
            height: "400px",
          }}
        >
          <Card.Title
            style={{
              marginTop: "5px",
            }}
          >
            List of Products
          </Card.Title>
          <FormControl
            placeholder="Type to Search"
            onChange={search}
            style={{ marginBottom: "5px" }}
          />
          <ListGroup
            style={{
              overflowY: "scroll",
            }}
          >
            {productsList?.map((product) => (
              <ListGroup.Item key={product?.product_id} className="product">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 5px",
                  }}
                >
                  <div>{product.product_name}</div>
                  <div>
                    <p>{product.price}</p>
                    <div>
                      <button
                        onClick={() => {
                          removeFromCart(product);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        
        <Card
          style={{
            flex: 1,
            height: "400px",
            maxHeight: "600px",
          }}
        >
          <Card.Title
            style={{
              margin: "5px",
              padding: "5px",
            }}
          >
            Shopping Cart
          </Card.Title>
          <ListGroup
            style={{
              padding: "5px",
              height: "400px",
              overflowY: "scroll",
            }}
          >
            {cartList?.map((product) => (
              <ListGroup.Item key={product?.product_id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 5px",
                  }}
                >
                  <p>{product?.product_name}</p>
                  <div style={{ padding: "1px", alignItems: "left" }}>
                    {product?.count} x {product?.price}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup.Item
            style={{
              height: "100px",
              overflowY: "hidden",
            }}
          >
            <div>Total: ${Number(Math.round(totalAmount + "e2") + "e-2")}</div>
            <button onClick={checkout}> Checkout</button>
            <button onClick={clear}> Clear</button>
          </ListGroup.Item>
        </Card>
      </div>
    </div>
  );
}

export default Shop;
