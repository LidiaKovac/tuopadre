import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import errorReducer from "./slices/errors";
import userReducer from "./slices/user";

const combined = combineReducers({
  products: productReducer,
  errors: errorReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: combined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
