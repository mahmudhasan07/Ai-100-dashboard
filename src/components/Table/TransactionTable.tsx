'use client'
import React, { useState } from 'react';
import { motion } from "motion/react"
// import { useGetAllTransactionQuery } from '../Redux/Api/transaction';
import loader from '@/assests/loader.json'
import Lottie from 'lottie-react';
import Loader from '../Loader/Loader';
import { useGetAllTransactionQuery } from '@/Redux/Api/transaction';

const TransactionTable = () => {

    const { data: paymentTable, isLoading } = useGetAllTransactionQuery(undefined)

    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const today = new Date().toISOString().split("T")[0]

    const totalPages = paymentTable && Math.ceil(paymentTable?.data?.data.length / itemsPerPage);

    const currentPageData = paymentTable?.data?.data && paymentTable?.data?.data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Serial</th>
                        <th className="px-4 py-2 border">User Name</th>
                        {/* <th className="px-4 py-2 border">Order Id</th> */}
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Payment Date</th>
                        {/* <th className="px-4 py-2 border">Total Ticket</th>
                        <th className="px-4 py-2 border">Event Date</th> */}
                        {/* <th className="px-4 py-2 border">Amount</th> */}
                        {/* <th className="px-4 py-2 border">Purchase Date</th> */}
                    </tr>
                </thead>
                <tbody aria-colspan={15}>
                    {isLoading ?
                        <tr>
                            <td colSpan={7} className='text-center'>
                                <Loader className={`w-36`}></Loader>
                            </td>
                        </tr>
                        :
                        currentPageData?.map((item: any, index: number) => (
                            <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                <td className="px-4 text-nowrap py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-4 text-nowrap py-2">{item.user.name}</td>
                                {/* <td className=" text-nowrap px-4 py-2">{item.order_id}</td> */}
                                <td className="px-4 text-nowrap py-2">{item.amount}</td>
                                <td className="px-4 text-nowrap py-2">{item.paymentDate.split("T")[0]}</td>
                                {/* <td className="px-4 py-2">{item.total_tickets}</td>
                            <td className="px-4 py-2">{item.date}</td> */}

                                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                            </motion.tr>
                        ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l"
                >
                    Previous
                </button>
                <span className="px-4 py-2">
                    {/* Page {currentPage} of {totalPages} */}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;

