'use client'
import ConcertTable from '@/components/Table/ConcertTable';
import { useGetAllEventsQuery } from '@/Redux/Api/eventApi';
import React, { useState } from 'react';

const RunningEvent = () => {

    const [page, setPage] = useState<number>(1);
    const [limit] = useState(100);
    const { data: concertTable, isLoading } = useGetAllEventsQuery({ page, limit, status:"UPCOMING" })

    const button = concertTable && [...Array(concertTable?.data?.meta?.totalPage).keys()];
    return (
        <div className='p-10'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Users Details</h1>
            <div>
                <ConcertTable concertTable={concertTable?.data?.data} isLoading={isLoading} serial={(page * limit) - limit}></ConcertTable>
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

export default RunningEvent;