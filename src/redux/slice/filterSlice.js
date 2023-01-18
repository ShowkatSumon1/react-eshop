import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      const newProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      );
      state.filterProducts = newProducts;
    },
    FILTER_BY_SORT: (state, action) => {
      const { products, sort } = action.payload;
      let newProducts = [];
      if (sort === "latest") {
        newProducts = products;
      }
      if (sort === "lowest-price") {
        newProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        newProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        newProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        newProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filterProducts = newProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let newProducts;
      if (category === "All") {
        newProducts = products;
      } else {
        newProducts = products.filter(
          (product) => product.category === category
        );
      }

      state.filterProducts = newProducts;
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let newProducts;
      if (brand === "All") {
        newProducts = products;
      } else {
        newProducts = products.filter((product) => product.brand === brand);
      }

      state.filterProducts = newProducts;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let newProducts;
      newProducts = products.filter((product) => product.price <= price);

      state.filterProducts = newProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  FILTER_BY_SORT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
