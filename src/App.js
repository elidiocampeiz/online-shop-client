import React, {useEffect, useMemo, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/component.js'
import Login from './components/Login/component.js'
import Shop from './components/Shop/component.js';
import Homepage from './components/homepage/component.js'
import {getUsers, getProducts, getOrders, getOrdersPerUser, getSales, getSalesPerProduct} from './online-shop-api';
import {UserContext, UsersContext, ProductsContext} from './contexts';

function App() {

  //const a = getOrders();
  //const a = getOrdersPerUser(1);

  const [currentUser, setCurrentuser] = useState(null)
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([]);
  const productsPoviderValue = useMemo(()=>({products, setProducts}), [products, setProducts])
  const [orders, setOrders] = useState([]);
  const [ordersPerUser, setOrdersPerUser] =  useState([]);
  const [salesPerProduct, setSalesPerProduct] =  useState([]);
  const [sales, setSales] = useState([]);

  const userPoviderValue = useMemo(()=>({currentUser, setCurrentuser}), [currentUser, setCurrentuser])
  const usersPoviderValue = useMemo(()=>({users, setUsers}), [users, setUsers])

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
    
    async function getOrdersPerUserData() {
      try {
        const data = await getOrdersPerUser(1);
        setOrdersPerUser(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getSalesPerProductData() {
      try {
        const data = await getSalesPerProduct();
        console.log(data);
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
    getOrdersPerUserData()
    getOrdersData();
    getProductsData();
    getUsersData();
  }, []);

  return (
    <div className="app">
      <Header />
      <UsersContext.Provider value={usersPoviderValue}>
        <UserContext.Provider value={userPoviderValue}>
          <ProductsContext.Provider value={productsPoviderValue}>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/shop" component={Shop} />
              <Route path="/signin" component={Login} />
              <Route path="/*" component={Homepage} />
            </Switch>
            {/* {selectedPage === "SIGN IN" ? <Login /> : selectedPage} */}
          </ProductsContext.Provider>
        </UserContext.Provider>
      </UsersContext.Provider>
    </div>
  );
}

export default App;
