import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    error: null,
    status: 'idle',
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
    error: null,
    status: 'idle'
}


// the thunk
export const fetchUser = createAsyncThunk(
    'auth/fetchUserByUsername',
    async (credentials : userAuth, thunkAPI) => {
        const {username, password} = credentials;
        try {
            const response = await fetch('https://dummyjson.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'emilys', // change to accept username
                    password: 'emilyspass', //change back to password
                    expiresInMins: 30, // optional, defaults to 60
                }),
            });
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
        setUserCredentials(state, action: PayloadAction<Credentials>){
            // state.user = action.payload;
            state.user = {
                id: action.payload.payload.id,
                username : action.payload.payload.firstName,
                firstName : action.payload.payload.firstName,
                lastName : action.payload.payload.lastName,
                gender : action.payload.payload.gender,
                email : action.payload.payload.email,
                accessToken : action.payload.payload.accessToken,
                refreshToken : action.payload.payload.refreshToken,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});

export const { setUserCredentials } = authenticationSlice.actions;
export default authenticationSlice.reducer;
