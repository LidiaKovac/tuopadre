import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios";
interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
  prev: string | null;
  next: string | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  prev: null,
  next: null,
  loading: true,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/get",
  (payload, { rejectWithValue }): Promise<ProductResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const resp = await httpClient.get("/products");
        if (resp) res(resp.data);
      } catch (error) {
        rej(rejectWithValue("The error was caught by the axios interceptor!"));
      }
    });
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.prev = action.payload.prev;
      state.next = action.payload.next;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = (action.payload as Error).message;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
