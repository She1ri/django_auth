import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import {apiProduct} from "../services/apiProduct.ts";
import {authApi} from "../services/authApi.ts";
import authReducer from '../features/authSlice';

export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [apiProduct.reducerPath]: apiProduct.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiCategory.middleware, authApi.middleware, apiProduct.middleware),
});