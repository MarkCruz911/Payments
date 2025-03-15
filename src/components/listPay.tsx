import { useEffect, useState } from 'react';
import { ListService } from '../services/paymentService';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPayments } from '../redux/paymentsSlice';


const ListPay = () => {
    const [listPayed, setListPayed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(listPayed.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listPayed.slice(startIndex, startIndex + itemsPerPage);

    const dispatch = useDispatch();
    const listPayedTwo:any = useSelector((state: RootState) => state.payments.payments);

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const goToPage = (page: number) => {
        setCurrentPage(page);
    }


    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(listPayed);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Pagos');
        XLSX.writeFile(wb, 'Registros_Pagos.xlsx');
    }

    useEffect(() => {
        const updateDataPayments = () => {
            setListPayed(listPayedTwo);
        }
        updateDataPayments();
    }, [listPayedTwo]);

    useEffect(() => {
        const fetchPayments = async () => {
            const response: any = await ListService();
            dispatch(setPayments(response));
            setListPayed(response);
            console.log("the response: ", response);
        }
        fetchPayments();
    }, []);

    console.log("registros: ", listPayedTwo)

    return (
        <div className='mt-8 bg-white rounded-md overflow-hidden'>
            <div className=' py-6 text-left px-4 bg-gradient-to-r from-blue-500 to-indigo-600'>
                <p className='text-white font-bold text-xl'>Registros de Pagos</p>
            </div>
            <div className='overflow-x-auto h-[400px]'>
                <table className='min-w-full divide-y divide-gray-200 '>
                    <thead className='sticky top-0 bg-gray-100'>
                        <tr className='sticky'>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>ID</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>CODIGO</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>TIPO DE PAGO</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>DESCRIPCION</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>FECHA</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>MONTO</th>
                            <th scope='col' className='px-6 py-3 text-gray-500 text-left text-xs font-medium'>OBSERVACION</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {currentItems.length > 0 ?
                            (
                                currentItems.map((doc: any, index) => (
                                    <tr className='' key={index}>
                                        <td className='px-6 py-3 font-medium text-left'>{doc.id}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.codigo}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.tipoPago}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.descripcion}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.fecha}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.monto}</td>
                                        <td className='px-6 py-3 text-gray-400 text-sm text-left'>{doc.observacion}</td>
                                    </tr>
                                ))
                            ) :
                            (
                                <tr>
                                    <td className='px-6 py-4 text-center text-sm text-gray-500'>No hay pagos registrados</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            <div>
                <div className='flex justify-between p-2 sm:hidden'>
                    <button
                        className='border border-gray-300 bg-gray-100 px-6 py-3 mb-2 text-gray-500 font-medium hover:bg-gray-200 rounded-md'
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>

                    <button
                        className='border border-gray-300 bg-gray-100 px-6 py-3 mb-2 text-gray-500 font-medium hover:bg-gray-200 rounded-md'
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>

                <div className='hidden sm:flex sm:items-center sm:justify-between px-4' >
                    <div>
                        <p className='text-sm text-gray-700'>
                            Mostrando
                            <span className='font-medium'> {startIndex + 1} </span>
                            a{' '}
                            <span className='font-medium'>{Math.min(startIndex + itemsPerPage, listPayed.length)}</span>
                            {' '}de
                            <span className='font-medium'> {listPayed.length} </span>
                            Registros
                        </p>
                    </div>
                    <div>
                        <nav className='relative z-0 inline-flex rounded-md shadow-md -space-x-px' aria-label='Pagination'>
                            <button
                                className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium'
                                disabled={currentPage === 1}
                                onClick={goToPreviousPage}
                            >
                                &laquo;
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium 
                                        ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}



                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium'
                            >
                                &raquo;
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={exportToExcel} className='bg-green-500 px-6 py-3 hover:bg-green-600 text-white rounded-md mb-2' >Exportar</button>
            </div>
        </div>
    );
};

export default ListPay;