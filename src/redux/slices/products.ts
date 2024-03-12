import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/products";

// Define a type for the slice state
interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  loading: true,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = (action.payload as Error).message;
      state.loading = false;
    });
  },
});

// export const {  } = productSlice.actions

export default productSlice.reducer;
