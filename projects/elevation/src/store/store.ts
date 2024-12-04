import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Login/authentication/redux/authenticationSlice';
import productsReducer from '../features/Home/redux/ProductsSlice';


export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        products: productsReducer,
    },
});

export type AppDispatch = AppStore['dispatch']
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export default store;
