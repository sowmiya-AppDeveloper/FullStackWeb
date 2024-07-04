import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { HTTP } from "../../components/Constants";
import { assets } from "../../Assets/assets";
const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      HTTP.userOrderData,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity;
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })}
        </div>
      </h2>
    </div>
  );
};

export default MyOrders;
