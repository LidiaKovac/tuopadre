import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios";
interface ProductsState extends ProductResponse {
  data: Product[];
  query: string | null
  loading: boolean;
  error: string | null;
  prev: string | null;
  next: string | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  query: null,
  prev: null,
  next: null,
  loading: true,
  error: null,
  count: 0
};

export const getProducts = createAsyncThunk(
  "products/get",
  (query: string, { rejectWithValue }): Promise<ProductResponse> => {
    console.log(query)
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const resp = await httpClient.get(`/products?query=${query}`);
        if (resp) res({ ...resp.data, query });
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
      state.query = action.payload.query
      state.prev = action.payload.prev;
      state.next = action.payload.next;
      state.count = action.payload.count
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
