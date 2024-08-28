import { configureStore } from "@reduxjs/toolkit";
import productReduser from "@/features/productSlice"
import cartReduser from "@/features/cartSlice"

const store = configureStore({
    reducer: {
        product: productReduser,
        cart: cartReduser,
    },
    devTools: true, // Enable Redux DevTools in development mode
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;