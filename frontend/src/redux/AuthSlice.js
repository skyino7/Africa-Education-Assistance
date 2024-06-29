import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateUser = createAsyncThunk('updateuser', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/CheckUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // console.log('User data:', data);

        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    error: null,
    loading: null,
    user: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log('Setting user in state:', action.payload);
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.loading = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = null;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
            });
    }
});


export const { setUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
