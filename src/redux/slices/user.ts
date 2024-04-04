import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../configs/axios";
interface UserState {
  me: User | null;
  error: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  me: null,
  error: null,
  loading: false,
};

export const getMe = createAsyncThunk("me/get", (_, { rejectWithValue }): Promise<User> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const resp = await httpClient.get(`/user/me`);
      if (resp.status < 400) res(resp.data);
      else throw resp.data;
    } catch (error) {
      console.log(error);
      rej(rejectWithValue(error));
    }
  });
});

export const login = createAsyncThunk("login/get", (payload: FormData, { rejectWithValue }): Promise<User> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const resp = await httpClient.post("/user/login", payload);
      if (resp.status < 400) {
        localStorage.setItem("tuopadre-token", resp.headers["token"]);
        res(resp.data as User);
      } else {
        throw resp.data;
      }
    } catch (error) {
      console.log(error);
      rej(rejectWithValue(error));
    }
  });
});

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.me = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
      state.loading = false;
      state.me = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.me = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
      state.loading = false;
      state.me = null;
    });
  },
});

// export const { setQuery, setLoading, setFilter, setPage } = meSlice.actions;
export default meSlice.reducer;
