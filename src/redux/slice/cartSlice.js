import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previous_URL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //// add to cart
      if (productIndex >= 0) {
        //// already in cart item
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info("Item added successfully", {
          position: "top-left",
        });
      } else {
        //// New cart item add
        const newProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(newProduct);
        toast.success("Product added successfully", {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    /// For minus button.
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info("Item removed", {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCart = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
        toast.error("Product removed", {
          position: "top-left",
        });
        state.cartItems = newCart;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    /// for delete button
    REMOVE_PRODUCT(state, action) {
      const newCart = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      toast.error("Product removed", {
        position: "top-left",
      });
      state.cartItems = newCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //// for clear cart
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.error("Cart Cleared", {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    ////// total amount
    TOTAL_AMOUNT(state, action) {
      const amount = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const itemAmount = price * cartQuantity;
        return amount.push(itemAmount);
      });
      const totalAmount = amount.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    /////total items
    TOTAL_QUANTITY(state, action) {
      const items = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        return items.push(cartQuantity);
      });
      const totalItems = items.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalItems;
    },

    //////// cart page url set
    PREVIOUS_URL(state, action) {
      state.previous_URL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  CLEAR_CART,
  REMOVE_PRODUCT,
  TOTAL_AMOUNT,
  TOTAL_QUANTITY,
  PREVIOUS_URL,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPrevious_URL = (state) => state.cart.previous_URL;

export default cartSlice.reducer;
