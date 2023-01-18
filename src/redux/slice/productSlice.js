import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    minPrice: null,
    maxPrice: null,
  },
  reducers: {
    STORE_PRODUCTS(state, action) {
      const { products } = action.payload;
      let priceArray = [];
      products.map((product) => {
        const price = product.price;
        priceArray.push(price);
      });
      const max = Math.max(...priceArray);
      const min = Math.min(...priceArray);

      state.products = products;
      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const selectProduct = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export const { STORE_PRODUCTS } = productSlice.actions;

export default productSlice.reducer;
