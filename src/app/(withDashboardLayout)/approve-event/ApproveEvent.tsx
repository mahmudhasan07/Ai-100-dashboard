'use client'
import ApproveEventTable from '@/components/Table/ApproveEventTable';
import { useGetAllEventsQuery } from '@/Redux/Api/eventApi';
import React, { useState } from 'react';

const ApproveEvent = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState(100);
    const { data: approveEvent, isLoading } = useGetAllEventsQuery({ page, limit, status: 'PENDING' });


    const button = approveEvent && [...Array(approveEvent?.data?.meta?.totalPage).keys()];
    return (
        <div className='p-10 space-y-12'>
            <h1 className='text-4xl text-primary font-bold text-center mb-8'>Approve Creator Event</h1>
            {/* <div className='flex justify-end mb-5'>
                <input type="text" className='border-2 my-auto py-1 px-3 w-72 rounded-lg border-primary' placeholder='Enter the email address' />
                <button className='bg-primary text-white py-1 px-5 text-lg font-semibold rounded-lg ml-2'>Search</button>
            </div> */}
            <div>
                <ApproveEventTable approveEvent={approveEvent?.data?.data} isLoading ={isLoading} serial={(page * limit) - limit}></ApproveEventTable>
            </div>
            <div className="flex justify-center gap-5 mt-5">
                {
                    button && button.map((item: string, index: number) =>
                        <button onClick={() => setPage(index + 1)} className='border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold' key={index}>{item + 1}</button>)
                }
            </div>
        </div>
    );
};

export default ApproveEvent;