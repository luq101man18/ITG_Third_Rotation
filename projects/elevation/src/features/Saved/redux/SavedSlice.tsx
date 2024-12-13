import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductViaId from '../server/api';
import { RootState } from '../../../store/store';
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
}

interface productIdentifierAndQuantity {
    id: number,
}

export interface Products {
    products: {
        id: number,
    }[],
    loading: 'idle' | 'loading' | 'succeeded' | 'failed',
}

export interface FetchingRequirements {
    productId: number,
}

// the thunk
export const fetchProductsForSaved = createAsyncThunk(
    'saved/fetchCartProducts',
    async ({ productId }: FetchingRequirements) => {
        try {
            const response = await fetchProductViaId(productId);
            if (response) {
                return response;
            }
        } catch (error) {
            return 'Error fetching products from cart slice';
        }
    }
);


const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {
        addProductToSaved(state, action: PayloadAction<{ productId: number }>) {
            if (state.products.find((product) => product.id === action.payload.productId)) {
            } else {
                const product: productIdentifierAndQuantity = {
                    id: action.payload.productId,
                };
                state.products.push(product);
            }
        },
        deleteProductFromSaved(state, action: PayloadAction<{ productId: number }>) {
            state.products = state.products.filter((product) => product.id !== action.payload.productId);
        },
        clearCart(state) {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsForSaved.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProductsForSaved.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products.push(action.payload);
        });
        builder.addCase(fetchProductsForSaved.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});
export const { addProductToSaved, deleteProductFromSaved, clearCart } = savedSlice.actions;
export const selectSavedProducts = (state: RootState) => state.saved.products;
export default savedSlice.reducer;
