import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchProductsData from '../server/api';
import { RootState } from '../../../store/store';
import reactotron from 'reactotron-react-native';

const initialState: Products = {
    products: {},
    sortingFlags: [false, false, false],
    priceRange: [0, 100],
    loading: 'idle',
};

export interface Products {
    products:{},
    sortingFlags: boolean[]
    priceRange : number[]
    loading: 'idle' | 'loading' | 'succeeded'| 'failed' ,
}

export interface FetchingRequirements {
    limit: number,
}

// the thunk
export const fetchProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async ({limit} : FetchingRequirements ) => {
        try {
            const response = await fetchProductsData(limit);
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
        setSortingFlags(state, action: PayloadAction<{sortingFlags : boolean[]}>){
            state.sortingFlags = action.payload.sortingFlags;
        },
        setPriceRange(state, action: PayloadAction<{priceRange : number[]}>){
            state.priceRange = action.payload.priceRange;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});
export const { setPriceRange, setSortingFlags } = productsSlice.actions;
export const selectProducts = (state :  RootState) => state.products.products;
export const selectPriceRange = (state :  RootState) => state.products.priceRange;
export const selectSortingFlags = (state :  RootState) => state.products.sortingFlags;
export default productsSlice.reducer;
