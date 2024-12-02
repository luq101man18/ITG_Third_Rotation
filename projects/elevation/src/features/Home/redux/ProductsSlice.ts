import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductsData from '../server/api';

const initialState: Products = {
    products: {},
    total: 0,
    skip: 0,
    limit: 0,
    loading: 'idle',
};

export interface Products {
    products:{},
    total: number,
    skip: number,
    limit: number,
    loading: 'idle' | 'loading' | 'succeeded'| 'failed' ,
}

// the thunk
export const fetchUser = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        try {
            const response = await fetchProductsData();
            if(response){
                return response;
            }
        } catch (error) {
            return error.message;
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});

export default productsSlice.reducer;
