import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeOptions, ToastOptions, ToastPosition } from 'react-toastify';

export interface ExtendedToastOptions extends ToastOptions {
    toastClassName?: string;
    bodyClassName?: string;
    progressClassName?: string;
    className?: string;
}

export interface ToastState {
    message?: string;
    type?: TypeOptions; // 'info' | 'success' | 'warning' | 'error' | 'default'
    position?: ToastPosition;
    options?: ExtendedToastOptions;
};

const initialState: ToastState = {
    message: undefined,
    position: 'top-right',
    type: undefined,
    options: undefined,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (_, action: PayloadAction<ToastState>) => action.payload,
        clearToast: (state) => {
            state.message = undefined;
            state.type = undefined;
            state.position = 'top-right';
            state.options = undefined;
        },
    },
});

export const { 
    showToast, 
    clearToast 
} = toastSlice.actions;
export default toastSlice.reducer;