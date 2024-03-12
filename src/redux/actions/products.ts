import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios.config";

export const getProducts = createAsyncThunk(
  "products/get",
  (payload, { rejectWithValue }): Promise<Product[]> => {
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
