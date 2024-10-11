import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    refreshToken : string
    accessToken : string
}
const initialState: AuthState = {
    refreshToken: '',
    accessToken: '',
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setRefreshToken(state, action : PayloadAction<string>) {
            state.refreshToken = action.payload;
        },
        setAccessToken(state, action : PayloadAction<string>){
            state.accessToken = action.payload;
        },
    },
});

export const { setAccessToken, setRefreshToken} = authenticationSlice.actions;
export default authenticationSlice.reducer;
