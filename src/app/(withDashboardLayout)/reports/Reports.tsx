'use client'
import { useAllReportQuery, useDeleteReportMutation } from '@/Redux/Api/reportApi';
import ShowToastify from '@/utils/ShowToastify';
import Image from 'next/image';
import React from 'react';

const Reports = () => {

    const [deleteFn] = useDeleteReportMutation()

    const { result, isLoading } = useAllReportQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data?.data,
            isLoading
        })
    })

    console.log(result);

    const handleDelete = async (id: string) => {

        const { error } = await deleteFn(id)
        if (error) {
            ShowToastify({ error: "Unsuccessful to delete the report" })
            return
        }
        ShowToastify({ success: "Successfully deleted the report" })

    }


    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold">Reports</h3>
                <div className="space-y-4 grid md:grid-cols-2 grid-cols-1 ">
                    {
                        isLoading ?
                            "loading"
                            :
                            result?.map((report: any) => (
                                <div key={report.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                    <h4 className="text-lg font-semibold">Reason: {report.reason}</h4>
                                    <div className='flex gap-2'>
                                        {report.reportImage && (
                                            <Image src={report.reportImage} alt="Report Image" width={100} height={100} className="rounded w-64 h-72 object-cover mt-2" />
                                        )}
                                        {report.reportVideo && (
                                            <video controls className="mt-2   h-72 rounded">
                                                <source src={report.reportVideo} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                    <p className="text-sm mt-2">Reported Post ID: {report.post?.id}</p>
                                    <p className="text-sm mt-2">Reported Post: {report.post?.title}</p>
                                    <p className="text-sm">Address: {report.post?.address}</p>
                                    {report.post?.image && (
                                        <Image src={report.post.image} alt="Post Image" width={100} height={100} className="rounded mt-2" />
                                    )}
                                    <div className='flex justify-between'>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Image src={report.post?.user?.profileImage} alt="User" width={30} height={30} className="rounded-full" />
                                            <p className="text-sm">Reported by: {report.post?.user?.name}</p>
                                        </div>
                                        <button onClick={() => handleDelete(report.id)} className='bg-primary text-white my-auto py-1 px-4  font-semibold rounded-lg'>Solved</button>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;