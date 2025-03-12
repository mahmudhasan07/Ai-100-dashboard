"use client"
import { useSinglePostQuery } from '@/Redux/Api/postApi';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const FindPost = () => {
    const [id, setId] = useState<string>("");

    const { result, isLoading } = useSinglePostQuery(id, {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            isLoading
        })
    })

    console.log(result);


    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const value = e.currentTarget.search.value;
        console.log(value);
        setId(value)

    }

    return (
        <div>
            <div className='my-10 w-fit mx-auto space-x-1'>
                <form onSubmit={handleSearch} action="">
                    <input type="text" name='search' className='p-1 w-72 rounded-lg border-2 ' />
                    <button className='px-3 py-1 bg-primary text-white rounded-xl'>Search</button>
                </form>
            </div>
            <div className='lg:px-10 px-5'>
                <h1 className='text-2xl text-center font-semibold'>Post Details</h1>

                {
                    isLoading ?
                        "loading"
                        :

                        result?.meta ?
                            "No Data Found"
                            :
                            <div className="max-w-sm w-full md:max-w-md lg:max-w-lg p-4 border rounded-2xl shadow-lg bg-white">
                                {
                                    result?.image && <Image
                                        src={result?.image}
                                        alt={result?.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-56 object-cover rounded-xl"
                                    />
                                }
                                <div className="mt-4">
                                    <h2 className="text-xl font-bold text-gray-800">{result?.title}</h2>
                                    <p className="text-gray-600">{result?.address}</p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {/* <p><span className="font-semibold">Latitude:</span> {data.locationLat}</p>
                                    <p><span className="font-semibold">Longitude:</span> {data.locationLong}</p> */}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-gray-600 text-sm">
                                        <p>👍 {result?._count.Like}</p>
                                        <p>💬 {result?._count.Comment}</p>
                                        <p>🔄 {result?._count.Share}</p>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        </div>
    );
};

export default FindPost;