import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoReducer from "./todo/slice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// devuelve el tipado de los estados
export type RootState = ReturnType<typeof store.getState>;

// devuelve el tipado de las acciones disponibles
export type AppDispatch = typeof store.dispatch;

// funcion que devuelve el tipado de appdispatch -> acciones
type DispatchFunc = () => AppDispatch;

// Genera hook ya tipado
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
