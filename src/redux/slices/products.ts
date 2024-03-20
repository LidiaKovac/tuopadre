import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../../configs/axios"
interface ProductsState extends ProductResponse {
  data: Product[]
  query?: string | null
  loading: boolean
  error: string | null
  prev: string | null
  next: string | null
}

// Define the initial state using that type
const initialState: ProductsState = {
  data: [],
  query: null,
  prev: null,
  next: null,
  loading: true,
  error: null,
  count: 0,
}

export const getProducts = createAsyncThunk(
  "products/get",
  (query: JSONQuery | null, { rejectWithValue }): Promise<ProductResponse> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        console.log(query)
        let qp = null
        if (query) {
          qp = new URLSearchParams(query)
        }
        const resp = await httpClient.get(`/products?${query ? `${qp}` : ""}`)
        if (resp) res({ ...resp.data, query: query || null })
      } catch (error) {
        rej(rejectWithValue("The error was caught by the axios interceptor!"))
      }
    })
  }
)

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery: (state, action) => {
        state.query = action.payload
      
    },
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload.data

      state.prev = action.payload.prev
      state.next = action.payload.next
      state.count = action.payload.count
      state.loading = false
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.payload)
      state.error = (action.payload as Error).message
      state.loading = false
    })
  },
})

export const {setQuery} = productSlice.actions
export default productSlice.reducer
