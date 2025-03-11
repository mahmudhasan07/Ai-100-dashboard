'use client'
import React, { useState } from 'react';

import { motion } from 'framer-motion'

import Loader from '../Loader/Loader';
import { useUserStatusUpdateMutation } from '@/Redux/Api/userApi';
import { UserInterFace } from '@/Interfaces/InterFaces';
import ShowToastify from '@/utils/ShowToastify';

const CreatorTable = ({ creatorData, isLoading, serial }: { creatorData: UserInterFace[], isLoading: boolean, serial: number }) => {

    const [updateStatus] = useUserStatusUpdateMutation()

    const handleStatus = async (id: string) => {
        const {error} = await updateStatus({ id })
        
        if (error) {
            ShowToastify({error : "Unsuccessful to change creator status"})
        }
    }

    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Serial</th>
                        <th className="px-4 py-2 border">User Name</th>
                        <th className="px-4 py-2 border">User Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Action</th>
                        {/* <th className="px-4 py-2 border">Amount</th> */}
                        {/* <th className="px-4 py-2 border">Purchase Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ?
                        <tr>
                            <td colSpan={7} className='text-center'>
                                <Loader className={`w-36`}></Loader>
                            </td>
                        </tr>
                        :
                        creatorData?.map((item: UserInterFace, index: number) => (
                            <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                <td className="px-4 text-nowrap py-2">{serial + (index + 1)}</td>
                                <td className="px-4 text-nowrap py-2">{item.name}</td>
                                <td className="px-4 text-nowrap py-2">{item.email}</td>
                                <td className="px-4 text-nowrap py-2">{item.role}</td>
                                <td className="px-4 text-nowrap py-2"><button onClick={() => handleStatus(item?.id)} className='px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg bg-[#83008A] text-white'>{item.user_status == "BLOCKED" ? "Active" : "Block"}</button></td>

                                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                            </motion.tr>
                        ))}
                </tbody>
            </table>

        </div>
    );
};

export default CreatorTable;
