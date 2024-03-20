import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios";
import { RootState } from "../store";
interface ProductsState extends ProductResponse {
  data: Product[];
  query: string | null;
  filter: JSONQuery;
  loading: boolean;
  error: string | null;
  prev: string | null;
  next: string | null;
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  query: null,
  filter: {
    price: "true",
    store: "Basko,Carrefour Express,Carrefour Market,Coop,Esselunga,Lidl,Pam,Penny",
  },
  prev: null,
  next: null,
  loading: true,
  error: null,
  count: 0,
};

export const getProducts = createAsyncThunk(
  "products/get",
  (
    { query, page }: { query: JSONQuery | null; page: number },
    { getState, rejectWithValue },
  ): Promise<ProductResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const state = getState() as RootState;

        let qp = null;
        const stringQ = {} as Record<string, string>;
        console.log(query);
        if (query) {
          for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
              const val = query[key];
              if (val) {
                stringQ[key] = val.toString();
              }
            }
          }
        }

        for (const key in state.products.filter) {
          if (Object.prototype.hasOwnProperty.call(state.products.filter, key)) {
            const val = state.products.filter[key];
            if (val) {
              stringQ[key] = val.toString();
            }
          }
        }

        qp = new URLSearchParams(stringQ);
        for (const q of qp.entries()) {
          const [key, value] = q;
          if (value.includes("true") || value.includes("false")) {
            qp.set(key, "");
          }
        }
        const resp = await httpClient.get(`/products?${qp}&page=${page}`);
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
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;

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

export const { setQuery, setLoading, setFilter } = productSlice.actions;
export default productSlice.reducer;
