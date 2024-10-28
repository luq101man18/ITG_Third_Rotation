import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import fetchProductByName from '../../server/api';

export interface productId {
product: number,
}

const initialState: ProductDetails = {
    product:{
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        image: [],
    },
    loading: 'idle',
};

export interface ProductDetails {
    product:{
        id: number,
        title: string,
        description: string,
        price: number,
        discountPercentage: number,
        rating: number,
        image: [],
    },
    loading: 'idle' | 'loading' | 'succeeded'| 'failed' ,

}


// the thunk
export const fetchProduct = createAsyncThunk(
    'create/fetchProductByName',
    async (productDetails : productId, thunkAPI) => {
        const {product} = productDetails;
        try {
            const response = await fetchProductByName(product);
            let dataFetched = await response.json();
            if(dataFetched){
                return dataFetched;
            }
        } catch (error) {
            return error.message;
        }
    }
);


const ProductSlice = createSlice({
    name: 'ProductDetails',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.product = {
                id: action.payload.id,
                title : action.payload.title,
                description : action.payload.description,
                price : action.payload.price,
                discountPercentage : action.payload.discountPercentage,
                rating : action.payload.rating,
                image : action.payload.images[0],
            };
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});

export const selectProduct = (state : RootState) => state.productDetails.product;

export const selectLoading = (state :  RootState) => state.productDetails.loading;

export default ProductSlice.reducer;
