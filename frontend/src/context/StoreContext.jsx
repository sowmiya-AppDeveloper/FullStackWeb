import axios from "axios";
import { createContext, useState } from "react";

import { useEffect } from "react";
import { HTTP, url } from "../components/Constants";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    console.log("toooooooooooooooooken", token);
    if (token) {
      await axios.post(HTTP.addToCart, { itemId }, { headers: { token } });
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(HTTP.getFoodList);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      HTTP.getCartData,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(HTTP.removeCart, { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
