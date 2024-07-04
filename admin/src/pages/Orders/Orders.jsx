import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { HTTP } from "../../Components/constants";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(HTTP.list);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statusHandler = async (event, orderId) => {
    console.log("statusHandler", event, orderId);
    const response = await axios.post(HTTP.updateStatus, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>

              <p className="order-item-name">
                {JSON.parse(order.address).firstName +
                  " " +
                  JSON.parse(order.address).lastName +
                  ", " +
                  JSON.parse(order.address).zipCode}
              </p>
              <div className="order-item-address">
                <p>{JSON.parse(order.address).street + ", "}</p>
                <p>
                  {JSON.parse(order.address).city +
                    ", " +
                    JSON.parse(order.address).state +
                    ", " +
                    JSON.parse(order.address).country}
                </p>
              </div>
              <p className="order-item-phone">
                {JSON.parse(order.address).phone}
              </p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
