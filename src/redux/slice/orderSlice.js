import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  orderTotalAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },
    ORDER_TOTAL_AMOUNT(state, action) {
      const amount = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        return amount.push(orderAmount);
      });
      const totalAmount = amount.reduce((a, b) => {
        return a + b;
      }, 0);
      state.orderTotalAmount = totalAmount;
    },
  },
});

export const { STORE_ORDERS, ORDER_TOTAL_AMOUNT } = orderSlice.actions;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectOrderTotalAmount = (state) => state.orders.orderTotalAmount;

export default orderSlice.reducer;
