import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductsData from '../server/api';
import { RootState } from '../../../store/store';
import reactotron from 'reactotron-react-native';
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
export const fetchProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        try {
            const response = await fetchProductsData();
            if(response){
                return response;
            }
        } catch (error) {
            return 'Error fetching products from Slice';
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});

// use the thunk in home then select the products in range slider in filter view so whenever a applying the range slider filter then 
// select from the products that are stored in the store rather than the one that products that are
export const selectProducts = (state :  RootState) => state.products.products;
export default productsSlice.reducer;
