import React, { useContext, useState,useEffect }from 'react'
import { Form, Button, ListGroup, Card, FormControl } from "react-bootstrap";
import { UserContext, UsersContext } from "../../contexts";
import './styles.css'
import {getSalesPerProduct, getSalesPerDate} from '../../online-shop-api'

function SaleStats () {
    const { currentUser, setCurrentuser } = useContext(UserContext);
    
    const [salesByProductsIntial, setSalesByProductsIntial] = useState([])
    const [salesByProducts, setSalesByProducts] = useState([])
    
    const [salesByDateIntial, setsalesByDateIntial] = useState([])
    const [salesByDate, setsalesByDate] = useState([])
    
    const getDate = (date) => {
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        const newdate =  month + "/" + day + "/" + year ;
        return newdate;
      };
    const searchByDate = (event) =>{
        if (event.target.value != null) {
          const newP = salesByProductsIntial.filter((sale) =>
          getDate(sale.date_of_order).includes(event?.target?.value)
          );
          setsalesByDate(newP);
        } else {
            setsalesByDate(salesByDateIntial);
        }
    }
    const searchByProduct = (event) =>{
        if (event.target.value != null) {
          const newP = salesByProductsIntial.filter((prod) =>
            prod.product_name
              ?.toLowerCase()
              .includes(event?.target?.value?.toLowerCase())
          );
          setSalesByProducts(newP);
        } else {
            setSalesByProducts(salesByProductsIntial);
        }
    }
    useEffect(() => {
      async function getSalesPerProductData() {
        try {
          const data = await getSalesPerProduct();
          setSalesByProductsIntial(data);
          setSalesByProducts(data);
        } catch (err) {
          console.log(err);
        }
      }
      async function getSalesPerDateData() {
        try {
          const data = await getSalesPerDate();
          setsalesByDateIntial(data);
          setsalesByDate(data);
        } catch (err) {
          console.log(err);
        }
      }
      getSalesPerDateData();
      getSalesPerProductData();
    }, []);
    if (!currentUser || !currentUser.user_id){
        return null;
    }
    return (
      <div className="shop-container">
        <h3>Welcome to Sales Stats</h3>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card
          style={{
            flex: 1,
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
            Sales Per of Products
          </Card.Title>
          <FormControl
            placeholder="Type to Search"
            onChange={searchByProduct}
            style={{ marginBottom: "5px" }}
          />
          <ListGroup
            style={{
              overflowY: "scroll",
            }}
          >
            {salesByProducts?.map((product, index) => (
              <ListGroup.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 5px",
                  }}
                >
                  <div>{product.product_name}</div>
                  <div >
                    <p>Price: {product.price}</p>
                    <p>Number of purchases: {product.count}</p>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        <Card
          style={{
            flex: 1,
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
            Sales Per Date
          </Card.Title>
          <FormControl
            placeholder="Type to Search"
            onChange={searchByDate}
            style={{ marginBottom: "5px" }}
          />
          <ListGroup
            style={{
              overflowY: "scroll",
            }}
          >
            {salesByDate?.map((sale, index) => (
              <ListGroup.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 5px",
                  }}
                >
                  <div>
                      Date: {getDate(sale.date_of_sale)}</div>
                  <div >
                    <p>Number of purchases: {sale.count}</p>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        </div>
      </div>
    );
}

export default SaleStats;