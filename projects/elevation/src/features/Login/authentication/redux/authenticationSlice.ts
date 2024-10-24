import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import fetchUserCredentialData from '../../server/api';

export interface userAuth {
    username: string,
    password: string,
}

const initialState: Credentials = {
    user:{
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        accessToken: '',
        refreshToken: '',
    },
    loading: 'idle',
};

export interface Credentials {
    user:{
        id: number,
        username: string,
        firstName: string,
        lastName: string,
        gender: string,
        email: string,
        accessToken: string,
        refreshToken: string,
    },
    loading: 'idle' | 'loading' | 'succeeded'| 'failed' ,

}


// the thunk
export const fetchUser = createAsyncThunk(
    'auth/fetchUserByUsername',
    async (credentials : userAuth, thunkAPI) => {
        const {username, password} = credentials;
        try {
            const response = await fetchUserCredentialData(username, password);
            let dataFetched = await response.json();
            if(dataFetched){
                return dataFetched;
            }
        } catch (error) {
            return error.message;
        }
    }
);


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.user = {
                id: action.payload.id,
                username : action.payload.username,
                firstName : action.payload.firstName,
                lastName : action.payload.lastName,
                gender : action.payload.gender,
                email : action.payload.email,
                accessToken : action.payload.accessToken,
                refreshToken : action.payload.refreshToken,
            };
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});

export const selectUser = (state : RootState) => state.authentication.user;
export const selectRefreshToken = (state : RootState) => state.authentication.user.refreshToken;
export const selectAccessToken = (state : RootState) => state.authentication.user.accessToken;
export const selectLoading = (state :  RootState) => state.authentication.loading;

export default authenticationSlice.reducer;
