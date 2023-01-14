import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        STORE_PRODUCTS(state, action) {
            // console.log(action.payload);
            state.products = action.payload.products;
        }
    }
});

export const selectProduct = (state) => state.product.products;

export const { STORE_PRODUCTS } = productSlice.actions;

export default productSlice.reducer;