import { ConcertInterface } from '@/Interfaces/InterFaces';
import React from 'react';
import Loader from '../Loader/Loader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useApproveEventMutation } from '@/Redux/Api/eventApi';
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
const ApproveEventTable = ({ approveEvent, isLoading, serial }: { approveEvent: ConcertInterface[], isLoading: boolean, serial: number }) => {
    const [updateStatus] = useApproveEventMutation()

    const handleApprove = async (id: string) => {
        const {error} = await updateStatus({ event_status: "UPCOMING", id: id });
        if (error) {
            return ShowToastify({ success: "Unsuccessful to approved the event" })
        }
        ShowToastify({ success: "Successfully approved the event" })
    }

    const handleCancel = async (id: string) => {
        const {error} = await updateStatus({ event_status: "CANCELLED", id: id })
        if (error) {
            return ShowToastify({ success: "Unsuccessful to cancel the event" })
        }
        ShowToastify({ success: "Successfully cancel the event" })
    }

    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Serial</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Ticket Price</th>
                        <th className="px-4 py-2 border">Total Ticket</th>
                        <th className="px-4 py-2 border">Event Date</th>
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
                        approveEvent.length <= 0 ?
                            <tr className=''>
                                <td colSpan={8} className=' text-center font-semibold'>No events found for approve</td>
                            </tr>
                            :
                            approveEvent?.map((item: ConcertInterface, index: number) => (
                                <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                    <td className="px-4 text-nowrap py-2">{serial + index + 1}</td>
                                    <td className="px-4 text-nowrap py-2"><Image src={item.photos[0]} alt={`${item.photos[0]}`} width={60} className='h-12 mx-auto object-cover' height={20}></Image></td>
                                    <td className="px-4 text-nowrap py-2">{item.title}</td>
                                    <td className="px-4 text-nowrap py-2">{item.locationName}</td>
                                    <td className="px-4 text-nowrap py-2">{item.price}</td>
                                    <td className="px-4 text-nowrap py-2">{item.totalTicket}</td>
                                    <td className="px-4 text-nowrap py-2">{item.startDate.split("T")[0]}</td>
                                    <td className="px-2  flex gap-2 items-center mt-3 h-fit  justify-center">
                                        <button onClick={() => handleCancel(item?.id)} className='px-4 py-1 rounded-lg bg-[#83008A] text-white'>Reject</button>
                                        <button onClick={() => handleApprove(item?.id)} className='px-4 py-1 rounded-lg bg-[#83008A] text-white'>Approve</button>
                                    </td>

                                    {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                                </motion.tr>
                            ))
                    }
                </tbody>
            </table>

            <ToastContainer />
        </div>
    );
};

export default ApproveEventTable;