import React, { useState } from 'react';
import { PaymentService } from '../services/paymentService';
import { useDispatch } from 'react-redux';



const FormPay = () => {
    const [formData, setFormData] = useState({
        codigo: '',
        tipoPago: '',
        descripcion: '',
        fecha: '',
        monto: 0,
        observacion: ''
    })

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const clearForm = () => {
        setFormData({
            codigo: '',
            tipoPago: '',
            descripcion: '',
            fecha: '',
            monto: 0,
            observacion: ''
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            await PaymentService(formData,dispatch);
            alert("pago Registrado con exito.");
        } catch (err: any) {
            console.log(err)
            alert("Error al registrar el pago.");
        }
    }

    return (
        <>
            <div className='bg-white rounded-md shadow-xl overflow-hidden'>
                <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left p-6 mb-5'>
                    <p className='text-2xl font-bold '>Registro de pagos</p>
                    <p>Complete el formulario para registrar un nuevo pago</p>
                </div>
                <div className='px-4'>
                    <form onSubmit={handleSubmit} className='text-left'>
                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1 block'>codigo <span className='text-red-500'>*</span></label>
                            <input
                                className='block w-full px-4 py-2 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type="text"
                                placeholder='Ingrese el Codigo'
                                name='codigo'
                                value={formData.codigo}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1'>Tipo de pago <span className='text-red-500'>*</span></label>
                            <select
                                className='block w-full px-4 py-2 border border-gray-300 pl-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name="tipoPago"
                                value={formData.tipoPago}
                                onChange={handleChange}
                                required
                            >
                                <option className='' value="">Seleccione metodo de pago</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="qr">Qr</option>
                                <option value="transferencia">Transferencia</option>
                                <option value="tarjeta">Tarjeta</option>
                            </select>
                        </div>

                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1'>Descripcion <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                className='block w-full px-4 py-2 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Ingrese una descripcion'
                                name='descripcion'
                                value={formData.descripcion}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1'>Fecha <span className='text-red-500'>*</span></label>
                            <input
                                type="date"
                                className='block w-full px-4 py-2 border border-gray-300 pl-3 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Seleccione una fecha'
                                name='fecha'
                                value={formData.fecha}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1'>Monto <span className='text-red-500'>*</span></label>
                            <input
                                type="number"
                                className='block w-full px-4 py-2 border border-gray-300 rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='$ 0.00'
                                name='monto'
                                value={formData.monto}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className='mb-4 grid'>
                            <label htmlFor="" className='mb-1'>Observacion</label>
                            <textarea
                                className='block w-full px-4 py-2 border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Ingrese Observaciones adicionales (Opcional)'
                                name='observacion'
                                value={formData.observacion}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='mb-4 flex justify-end'>
                            <button onClick={clearForm} className='mr-2 border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-200'>
                                Limpiar
                            </button>
                            <button className='rounded-md px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500'>
                                Registrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
};

export default FormPay;