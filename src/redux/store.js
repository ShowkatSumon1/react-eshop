import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import filterReducer from "./slice/filterSlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import ordersReducer from "./slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
});

const store = configureStore({
  reducer: rootReducer,

  //// For error problem:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
