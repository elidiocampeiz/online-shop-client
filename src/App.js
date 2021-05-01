/* eslint-disable no-unused-vars */
import React, {useEffect, useMemo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/component.js'
import Login from './components/Login/component.js'
import Shop from './components/Shop/component.js';
//SaleStats
import SaleStats from './components/SaleStats/component.js'
import OrderHistory from './components/OrderHistory/component'

import Homepage from './components/homepage/component.js'
import {
  getUsers, 
  getProducts, 
  getOrders, 
  getOrdersPerUser, 
  getSales, 
  getSalesPerProduct,
  createOrder,
  createSale,
} from './online-shop-api';
import {UserContext, 
  UsersContext, 
  ProductsContext, 
  CartContext
} from './contexts';
function App() {


  const [currentUser, setCurrentuser] = useState(null)
  const [cart, setCart] = useState({})
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([]);
  const [currentOrder, setcurrentOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [ordersPerUser, setOrdersPerUser] =  useState([]);
  const [salesPerProduct, setSalesPerProduct] =  useState([]);
  const [sales, setSales] = useState([]);

  const productsPoviderValue = useMemo(()=>({products, setProducts}), [products, setProducts])
  const userPoviderValue = useMemo(()=>({currentUser, setCurrentuser}), [currentUser, setCurrentuser])
  const usersPoviderValue = useMemo(()=>({users, setUsers}), [users, setUsers]);
  const cartProvicerValue =useMemo(()=>({cart, setCart}), [cart, setCart]);
  
  useEffect(() => {
    async function getUsersData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    async function getProductsData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getOrdersData() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    }
    
    

    async function getSalesPerProductData() {
      try {
        const data = await getSalesPerProduct();
        setSalesPerProduct(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getSalesData() {
      try {
        const data = await getSales();
        setSales(data);
      } catch (err) {
        console.log(err);
      }
    }

    
    getSalesPerProductData();
    getSalesData();
    getOrdersData();
    getProductsData();
    getUsersData();
  }, []);

  return (
    <div className="app">
      <UsersContext.Provider value={usersPoviderValue}>
        <UserContext.Provider value={userPoviderValue}>
          <ProductsContext.Provider value={productsPoviderValue}>
            <CartContext.Provider value={cartProvicerValue}>
              <Header />
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/shop" component={Shop} />
                {currentUser&&currentUser.is_adm&&<Route path="/sale-stats" component={SaleStats} />}
                <Route path="/signin" component={Login} />
                <Route path="/order-history" component={OrderHistory} />
                <Route path="/*" component={Homepage} />
              </Switch>
              {/* {selectedPage === "SIGN IN" ? <Login /> : selectedPage} */}
            </CartContext.Provider>
          </ProductsContext.Provider>
        </UserContext.Provider>
      </UsersContext.Provider>
    </div>
  );
}

export default App;
