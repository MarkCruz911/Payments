import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { PaymentState, Payment } from '../types/paymentsData';


const initialState: PaymentState ={
    payments:[],
}


const paymentSlice = createSlice({
    name:'payments',
    initialState,
    reducers:{
        setPayments:(state, action:PayloadAction<Payment[]>)=>{
            state.payments=action.payload;
        },
        addPayment:(state, action: PayloadAction<Payment>)=>{
            state.payments.unshift(action.payload);
        }
    }
})

export const { setPayments, addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;




