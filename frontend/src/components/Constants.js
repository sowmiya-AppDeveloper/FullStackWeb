export const url = "http://localhost:8000";

export const HTTP = {
  loginUser: url + "/api/user/login",
  registerUser: url + "/api/user/register",
  getFoodList: url + "/api/food/list",
  addToCart: url + "/api/cart/add",
  removeCart: url + "/api/cart/remove",
  getCartData: url + "/api/cart/get",
  placeOrder: url + "/api/order/place",
  verifyPayment: url + "/api/order/verify",
  userOrderData: url + "/api/order/userorders",
};
