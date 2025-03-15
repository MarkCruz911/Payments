import {configureStore} from '@reduxjs/toolkit';
import paymentReducer from './paymentsSlice';

export const store = configureStore({
    reducer:{
        payments:paymentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


