import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios";
import { RootState } from "../store";
import { JSONToQuery } from "../../utils/query.utils";
import { shops } from "../../utils/shops.utils";
interface ProductsState extends ProductResponse {
  page: number;
  filter: JSONQuery;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  suggestions: [],
  query: JSON.parse(sessionStorage.getItem("tuopadre-query")!) || null,
  filter: JSON.parse(sessionStorage.getItem("tuopadre-filter") as string) || {
    price: "true",
    store: shops.join(","),
    order: "prodName",
  },
  prev: null,
  next: null,
  loading: true,
  error: null,
  count: 0,
  page: 1,
};

export const getProducts = createAsyncThunk(
  "products/get",
  (_, { getState, rejectWithValue }): Promise<ProductResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const state = getState() as RootState;
        const query = state.products.query;
        const qp = JSONToQuery(state.products.filter);
        const resp = await httpClient.get(
          `/products?${qp.toString()}&page=${state.products.page}${query ? `&prodName=${query}` : ""}`,
        );
        if (resp) res({ ...resp.data, query: query || null });
      } catch (error) {
        console.log(error);
        rej(rejectWithValue("The error was caught by the axios interceptor!" + error));
      }
    });
  },
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      sessionStorage.setItem("tuopadre-query", JSON.stringify(state.query));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
      sessionStorage.setItem("tuopadre-filter", JSON.stringify(state.filter));
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.suggestions = action.payload.suggestions

      state.prev = action.payload.prev;
      state.next = action.payload.next;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = "Error";
      state.loading = false;
    });
  },
});

export const { setQuery, setLoading, setFilter, setPage } = productSlice.actions;
export default productSlice.reducer;
