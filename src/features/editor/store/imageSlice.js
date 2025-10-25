import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    processing: false,
    processedImage: null,
    error: null,
    lastOperation: null
}

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setProcessing: (state, action) => {
            state.processing = action.payload;
            if (action.payload) {
                state.error = null;
            }
        },
        setProcessedImage: (state, action) => {
            state.processedImage = action.payload;
            state.processing = false;
            state.error = null;
            state.lastOperation = "background-removal";
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.processing = false;
        },
        clearProcessedImage: (state) => {
            state.processedImage = null;
            state.error = null;
            state.lastOperation = null;
        }
    }
});

export const {
    setProcessing,
    setProcessedImage,
    setError,
    clearProcessedImage
} = imageSlice.actions;
export default imageSlice.reducer;
