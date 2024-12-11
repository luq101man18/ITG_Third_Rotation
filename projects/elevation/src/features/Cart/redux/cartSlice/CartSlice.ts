import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductViaId from '../../server/api';
import { RootState } from '../../../../store/store';

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
export const fetchProductsForCart = createAsyncThunk(
    'products/fetchCartProducts',
    async ({productId} : FetchingRequirements ) => {
        try {
            const response = await fetchProductViaId(productId);
            if(response){
                return response;
            }
        } catch (error) {
            return 'Error fetching products from cart slice';
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<{productId : number}>){
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

        deleteProduct(state, action: PayloadAction<{productId : number}>){
            state.products = state.products.filter((product) => product.id !== action.payload);
        },

        incrementProductQuantity(state, action: PayloadAction<{productId : number}>){
            state.products.find((product) => {
                if(product.id === action.payload){
                    product.quantity += 1;
                }
            });
        },
        clearCart(state){
            state.products = [];
        },
        decrementProductQuantity(state, action: PayloadAction<{productId : number}>){
            state.products.find((product) => {
                if(product.id === action.payload) {
                    if(product.quantity > 0) {
                        product.quantity -= 1;
                        if(product.quantity < 1) {
                            state.products = state.products.filter((productFromArray) => productFromArray.id !== action.payload);
                        }
                    }
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsForCart.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProductsForCart.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products.push(action.payload);
        });
        builder.addCase(fetchProductsForCart.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});
export const { addProduct, deleteProduct, incrementProductQuantity, decrementProductQuantity, clearCart } = cartSlice.actions;
export const selectProducts = (state :  RootState) => state.cart.products;
export const selectQuantity = (state :  RootState) => state.cart.products.reduce((totalQuantity, product) => product.quantity + totalQuantity, 0);
export default cartSlice.reducer;
