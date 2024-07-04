import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import axios from "axios";
import { HTTP, url } from "../../components/Constants";
import { StoreContext } from "../../context/StoreContext";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(HTTP.verifyPayment, { success, orderId });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
