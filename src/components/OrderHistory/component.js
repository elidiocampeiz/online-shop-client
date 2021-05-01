import React, {useState,useContext, useEffect } from 'react'
import './styles.css'
import { ListGroup, Card, FormControl } from "react-bootstrap";
import { UserContext} from "../../contexts";
import {
    getAvgOrders,
    getOrdersPerUser, 
  } from '../../online-shop-api';

function OrderHistory() {
    const { currentUser, setCurrentuser } = useContext(UserContext);
    const [avgOrders, setAvgOrders] = useState(0)
    const [orderHistory, setOrderHistory] = useState()
    const [orderHistoryList ,setorderHistoryList] = useState([]);

    const search = (event) => {
        if (event.target.value != null) {
          const newP = orderHistory.filter((order) =>
            getDate(order.date_of_order).includes(event?.target?.value)
          );
          setorderHistoryList(newP);
        } else {
          setorderHistoryList(orderHistory);
        }
      };

      useEffect(()=>{
        async function getOrdersPerUserData() {
            if (!currentUser || !currentUser.user_id){
                return 
            }
            try {
              const data = await getOrdersPerUser(currentUser?.user_id);
              console.log(data);
              setOrderHistory(data);
              setorderHistoryList(data)

            } catch (err) {
              console.log(err);
            }
          }
          async function getAvgOrdersData() {
            if (!currentUser || !currentUser.is_adm){
                return 
            }
            try {
              const data = await getAvgOrders();
              const {avg} = data;
              setAvgOrders(avg)

            } catch (err) {
              console.log(err);
            }
          }
          getAvgOrdersData();
          getOrdersPerUserData();
      }, [currentUser])
      const getDate = (date) => {
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        const newdate =  month + "/" + day + "/" + year ;
        return newdate;
      };
  return (
    <div className="shop-container">
      <h3>Welcome to Order History</h3>
      {currentUser && currentUser.is_adm && (
            <div style={{margin:20, justifyContent:'center', alignContent:'center'}}>
              <div>Hi ADM {currentUser.username}</div>
              <div>The Average number of orders per user is: {Number(Math.round(avgOrders + "e2") + "e-2")}</div>
            </div>
          )}
      {currentUser? (
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
              {orderHistoryList?.map((order) => (
                <ListGroup.Item key={order?.order_id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "0px 5px",
                    }}
                  >
                    <div>{getDate(order.date_of_order)}</div>
                    <div>{order.price}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      ) : (
        <div>
          <div>Please login to see your Order History</div>
        </div>
      )}
    </div>
  );
}
export default OrderHistory;