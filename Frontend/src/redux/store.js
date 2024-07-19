import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";

const store=configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer
    },
    middleware:(mid)=>[...mid()],
});

export default store;