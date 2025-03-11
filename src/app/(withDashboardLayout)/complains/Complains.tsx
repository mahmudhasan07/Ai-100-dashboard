'use client'
import Loader from '@/components/Loader/Loader';
import { ComplainInterface } from '@/Interfaces/InterFaces';
import { useUpdateComplainMutation, useUserComplainQuery } from '@/Redux/Api/complainApi';
import ShowToastify from '@/utils/ShowToastify';
import Image from 'next/image';
import React, { useState } from 'react';

const Complains = () => {
    const [activeButton, setActiveButton] = useState(0);
    const buttons = ["Users", "Event Creators"]
    const [lang, setLang] = useState("fr");
    const [role, setRole] = useState("RESIDENT");
    const { data: complains, isLoading } = useUserComplainQuery({ lang, role });
    const [updateComplain, { error }] = useUpdateComplainMutation()
    // const [currentImage, setCurrentImage] = useState();

    const handleButton = (index: number) => {
        
        if (index != 0) {
            setActiveButton(index)
            setRole("EVENT_CREATOR")
        }
        else {
            setActiveButton(index)
            setRole("RESIDENT")
        }

    }

    const handleAccept = async (id: string) => {
        const {data} = await updateComplain(id)
        if (data) {
            ShowToastify({success : "In progress the complain"})
        }

    }

    return (
        <section>
            <h1 className='text-4xl font-bold text-center text-primary'>See all your complains for users and event creators</h1>
            <div className='flex justify-center mt-5 gap-5 bg-primary/50 w-fit mx-auto px-5 py-2 rounded-xl'>
                {
                    buttons.map((button, index) =>
                        <button key={index} onClick={() => handleButton(index)} className={`font-semibold text-lg px-4 py-1 w-52 text-center border rounded-lg  ${activeButton == index ? " text-white" : "border-primary text-primary"}`}>{button}</button>)
                }
            </div>
            <div>
                <div className='flex gap-5 justify-start flex-wrap m-10'>
                    {
                        isLoading ?
                            <div className='w-fit mx-auto '><Loader className='w-96'></Loader></div>
                            :
                            complains?.data?.data.length <= 0 ?
                                <p className='mx-auto font-semibold text-lg'>No complains found</p>
                                :
                                complains?.data?.data?.map((items : ComplainInterface, idx: number) =>
                                    <div key={idx} className='border-2 border-primary/50 text-lg w-[350px] p-5 rounded-xl'>
                                        <Image src={items?.complainPhotos[0]} width={300} height={400} className='w-80 rounded-lg h-80 object-cover' alt={items.complainPhotos[0]}></Image>
                                        <div className='overflow-x-auto my-2'>
                                            {
                                                items?.complainPhotos?.map((item: string, index: number) =>
                                                    <Image src={item} alt={item} width={100} height={100} className='w-20 object-cover h-20' key={index}></Image>)
                                            }
                                        </div>
                                        <h1 className='text-2xl  font-semibold'>{items?.title}</h1>
                                        <p className=''><span className='font-semibold'>TicketId:</span> {items?.ticketId}</p>
                                        <p className=''><span className='font-semibold'>User Name:</span> {items?.user.name}</p>
                                        <p className=''><span className='font-semibold'>User Email:</span> {items?.user.email}</p>
                                        <button onClick={() => handleAccept(items?.id)} className='bg-primary rounded-lg my-3 text-white font-semibold w-full px-5 py-2 '>{items?.status}</button>
                                    </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Complains;