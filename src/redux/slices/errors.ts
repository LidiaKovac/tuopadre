import { createSlice } from "@reduxjs/toolkit";

export interface ErrorState {
  data: Error[];
  isLoginError: boolean;
}

const initialState: ErrorState = {
  data: [],
  isLoginError: false,
};

export const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addError: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    setLoginError: (state, action) => {
      return {
        ...state,
        isLoginError: action.payload,
      };
    },
    resetErrors: (state) => {
      return {
        ...state,
        data: [],
        isLoginError: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
// export const {  } = postSlice.actions
export const { addError } = errorSlice.actions;
export default errorSlice.reducer;
