import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Login/authentication/redux/authenticationSlice';
import productsReducer from '../features/Home/redux/ProductsSlice';
import cartReducer from '../features/Cart/redux/cartSlice/CartSlice';
import orderReducer from '../features/Order/redux/orderSlice/OrderSlice';
export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        cart: cartReducer,
        products: productsReducer,
        order: orderReducer,
    },
});

export type AppDispatch = AppStore['dispatch']
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export default store;
