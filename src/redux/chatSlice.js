import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChatResponse = createAsyncThunk(
    'chat/fetchChatResponse',
    async ({ messages }) => {
        const response = await axios.post('http://localhost:5000/api/chat', { messages });
        return response.data;
    }
);


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        level: 'beginner',
        mode: 'casual',
        status: 'idle',
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatResponse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChatResponse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push(action.payload);
            })
            .addCase(fetchChatResponse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addMessage, setLevel, setMode } = chatSlice.actions;
export default chatSlice.reducer;