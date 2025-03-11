'use client'
// import { useAllCreatorsQuery } from '@/components/Redux/Api/userApi';
import CreatorTable from '@/components/Table/CreatorTable';
import { useAllCreatorsQuery } from '@/Redux/Api/userApi';
import React, { useRef, useState } from 'react';

const Creator = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const [page, setPage] = useState<number>(1);
    const limit = 100;
    const [email, setEmail] = useState<string>("");
    const { data: creatorData, isLoading } = useAllCreatorsQuery({ page, limit, email })

    const button = creatorData && [...Array(creatorData?.data?.meta?.totalPage).keys()];


    const handleSearch = () => {

        if (emailRef?.current?.value) {
            setEmail(emailRef?.current?.value)
        }
    }



    return (
        <div className='p-10'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Event Creator Details</h1>
            <div className='flex justify-end mb-5'>
                <input ref={emailRef} type="text" className='border-2 my-auto py-1 px-3 w-72 rounded-lg border-primary' placeholder='Enter the email address' />
                <button onClick={handleSearch} className='bg-primary text-white py-1 px-5 text-lg font-semibold rounded-lg ml-2'>Search</button>
            </div>
            <div>
                <CreatorTable creatorData={creatorData?.data?.data} serial={(page * limit) - limit} isLoading={isLoading}></CreatorTable>
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

export default Creator;