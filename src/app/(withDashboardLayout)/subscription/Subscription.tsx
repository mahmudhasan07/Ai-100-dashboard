'use client'
import Loader from '@/components/Loader/Loader';
import Image from 'next/image';
import React, { useState } from 'react';
import image from '@/assests/Vector (4).png'
import correct from '@/assests/correct.png'
import { SubscriptionItems } from '@/components/Interfaces/Subscription';
import UpdateSubscription from './UpdateSubscription';
import { useGetAllSubscriptionQuery } from '@/Redux/Api/subscriptionApi';

const Subscription = () => {
    const [modal, setModal] = useState(false);
    const [id, setId] = useState<string>("");
    const { data, isLoading } = useGetAllSubscriptionQuery({})

    const handleUpdate = (e: string) => {
        setModal(!modal)
        setId(e)
    }


    return (
        <section className='pt-14 px-10 relative'>
            <h1 className='text-4xl text-primary text-center font-bold'>See your all subscription</h1>

            <hr className='border-primary border rounded-3xl my-10' />
            <div className='flex justify-start flex-wrap gap-10'>
                {
                    isLoading ?
                        <Loader className={`w-96`}></Loader>
                        :
                        data?.data.map((item: SubscriptionItems) =>
                            <div key={item.id} className={`text-white space-y-2 w-80 text-center p-4 rounded-2xl ${item?.title == "BRONZE" ? "bg-[#263238]" : item?.title == "SILVER" ? "bg-primary" : "bg-secondary"}`}>
                                <div className='mx-auto w-fit space-y-3'>
                                    <Image src={image} alt='Image' className='w-10 mx-auto' />
                                    <h1 className={`text-2xl font-semibold bg-white px-10 py-1 rounded-3xl ${item?.title == "BRONZE" ? "text-[#263238]" : item?.title == "SILVER" ? "text-primary" : "text-secondary"}`}>{item.title}</h1>
                                    <p className='text-2xl'><span className=''>{item?.price}</span><span className='text-sm relative -top-2'>/month</span></p>
                                </div>
                                <hr />
                                {
                                    item?.description.map((e, idx) =>
                                        <div key={idx} className="flex">
                                            <Image src={correct} className='w-8' alt='correct' />
                                            <p className='my-auto'>{e}</p>
                                        </div>)
                                }
                                <div>
                                    <button onClick={() => handleUpdate(item.id)} className={`bg-white font-semibold text-lg hover:scale-105 transition-transform rounded-2xl px-5 py-1 ${item?.title == "BRONZE" ? "text-[#263238]" : item?.title == "SILVER" ? "text-primary" : "text-secondary"}`}>Update</button>
                                </div>

                            </div>)
                }
            </div>

            <dialog className='backdrop-blur-lg bg-transparent h-screen top-0 w-full' open={modal}>
                <div className='bg-primary/85 text-white  rounded-xl border-2 w-fit mx-auto top-1/3 relative '>
                    <div className='text-lg font-extrabold text-end mt-5 mr-5'>
                        <button onClick={() => setModal(!modal)}>X</button>
                    </div>
                    <UpdateSubscription id={id} />
                </div>
            </dialog>


        </section>
    );
};

export default Subscription;