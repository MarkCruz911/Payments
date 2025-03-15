import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { addPayment } from '../redux/paymentsSlice';
import { AppDispatch } from '../redux/store';
import { PaymentData } from '../types/paymentsData';


const PaymentService = async (payments: PaymentData, dispatch:AppDispatch) => {
    try {
        const docRef:any = await addDoc(collection(db, "payments"), payments)
        console.log(docRef.id);
        dispatch(addPayment({id:docRef.id, ...payments})); 
        return docRef.id;
    } catch (err: any) {
        console.error("Error al registrar el pago: ", err);
        throw err;
    }
};

const ListService = async () => {
    try {
        const docRef = await getDocs(collection(db,"payments"));
        const payments:any = [];
        docRef.forEach((doc)=>{
            payments.push({id:doc.id, ...doc.data()});
        });
        return payments;
    } catch (err: any) {
        console.error('Error al traer los pagos: ',err);
        return [];
    }
}

export { PaymentService, ListService };