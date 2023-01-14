import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
});

const store = configureStore({
    reducer: rootReducer,

    //// For error problem:
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['product/STORE_PRODUCTS'],
                // Ignore these paths in the state
                ignoredPaths: ['product.products'],
            },
        }),
})

export default store;