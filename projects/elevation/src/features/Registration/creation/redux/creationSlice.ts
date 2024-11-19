import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import addUserCredentialData from '../../server/api';

export interface userCreate {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
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
export const addUser = createAsyncThunk(
    'add/addNewUser',
    async (credentials : userCreate, thunkAPI) => {
        const {firstName, lastName, username, password} = credentials;
        try {
            const response = await addUserCredentialData(firstName, lastName,username, password);
            if(response){
                return response;
            }
        } catch (error) {
            return error.message;
        }
    }
);


const userCreationSlice = createSlice({
    name: 'userCreation',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state, action) => {
            state.loading = 'loading';
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
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
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = 'failed';
        });
    },
});

export const selectUser = (state : RootState) => state.authentication.user;
export const selectRefreshToken = (state : RootState) => state.authentication.user.refreshToken;
export const selectAccessToken = (state : RootState) => state.authentication.user.accessToken;
export const selectLoading = (state :  RootState) => state.authentication.loading;

export default userCreationSlice.reducer;
