

export interface PaymentData {
    codigo: string,
    tipoPago: string,
    descripcion: string,
    fecha: string,
    monto: number,
    observacion?: string,
}


export interface Payment {
    id:number,
    codigo:string,
    tipoPago:string,
    descripcion:string,
    fecha:string,
    monto:number,
    observacio?:string,
}

export interface PaymentState{
    payments:Payment[];
}




