import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductViaId from '../../server/api';
import { RootState } from '../../../../store/store';
import reactotron from 'reactotron-react-native';

const initialState: Products = {
    products: [],
    loading: 'idle',
};

export interface product {
    id: number,
    title: string,
    price: number,
    image: [],
    quantity: number,
}

interface productIdentifierAndQuantity {
    id: number,
    quantity: number
}

export interface Products {
    products: {
        id: number,
        quantity: number
    }[],
    loading: 'idle' | 'loading' | 'succeeded'| 'failed' ,
}

export interface FetchingRequirements {
    productId: number,
}

// the thunk
export const fetchProductsForOrders = createAsyncThunk(
    'products/fetchOrdersProducts',
    async ({productId} : FetchingRequirements ) => {
        try {
            const response = await fetchProductViaId(productId);
            if(response){
                return response;
            }
        } catch (error) {
            return 'Error fetching products from order slice';
        }
    }
);


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrders(state){
            state.products = [];
        },
        addOrder(state, action: PayloadAction<{productId : number}>) {
            if(state.products.find((product) => product.id === action.payload.productId)) {
                state.products.find((product) => {
                    if(product.id === action.payload.productId){
                        product.quantity += 1;
                } });
            } else {
                const product : productIdentifierAndQuantity = {
                    id: action.payload.productId,
                    quantity: 1,
                };
                state.products.push(product);
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsForOrders.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProductsForOrders.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products.push(action.payload);
        });
        builder.addCase(fetchProductsForOrders.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});
export const { clearOrders, addOrder  } = orderSlice.actions;
export const selectProducts = (state :  RootState) => state.order.products;
export const selectQuantity = (state :  RootState) => state.cart.products.reduce((totalQuantity, product) => product.quantity + totalQuantity, 0);
export default orderSlice.reducer;
