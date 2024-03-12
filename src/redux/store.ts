import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/products";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
