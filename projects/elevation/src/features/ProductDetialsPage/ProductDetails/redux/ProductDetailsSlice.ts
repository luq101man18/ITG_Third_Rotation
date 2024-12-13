import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import fetchProductById from '../../server/api';

export interface productId {
product: number,
}

// the thunk
export const fetchProduct = createAsyncThunk(
    'create/fetchProductById',
    async (productDetails : productId, thunkAPI) => {
        const {product} = productDetails;
        try {
            const response = await fetchProductById(product);
            let dataFetched = await response.json();
            if(dataFetched){
                return dataFetched;
            }
        } catch (error) {
            return error.message;
        }
    }
);
