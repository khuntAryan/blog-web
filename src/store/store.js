import { configureStore } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const store = configureStore({
    reducer:{
        auth : authSlice
    }
})

export default store;