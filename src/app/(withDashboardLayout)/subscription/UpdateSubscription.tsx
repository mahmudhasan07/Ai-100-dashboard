'use client'
import { useGetSubscriptionByIdQuery, useUpdateSubscriptionMutation } from '@/Redux/Api/subscriptionApi';
import ShowToastify from '@/utils/ShowToastify';
import React, { FormEvent, useRef } from 'react';
import { ToastContainer } from 'react-toastify';

const UpdateSubscription = ({ id }: { id: string }) => {

    const { data } = useGetSubscriptionByIdQuery(id)
    const [updateFn, {error}] = useUpdateSubscriptionMutation()


    const handleUpdate = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const price = parseFloat(form.get('price') as string) as number;
        const description = [form.get('description') as string];
        const updateData = { price, description }

        const res = await updateFn({updateData, id})
      
        
        if (error) {
         return   ShowToastify({error : "Unsuccessful to update the subscription"})
        }
        ShowToastify({success : "Successful to update the subscription"})
        
    }

    return (
        <section className='px-5 pb-5 space-y-5'>
            <form className='space-y-5' onSubmit={handleUpdate}>

                <div className='flex gap-4'>
                    <div className='w-full'>
                        <label htmlFor="" className='text-lg font-semibold'>Title</label> <br />
                        <input defaultValue={data?.data.title} name='title' type="text" readOnly className='w-full py-1 px-2 rounded-lg' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="" className='text-lg font-semibold'>Price</label> <br />
                        <input type="number" name='price' defaultValue={data?.data?.price} className='w-full py-1 px-2 rounded-lg' />
                    </div>
                </div>
                <div>
                    <label htmlFor="">Description (Please give . every line end)</label>
                    <textarea defaultValue={data?.data?.description} name="description" className='w-full h-28 py-1 px-2 rounded-lg' id=""></textarea>
                </div>
                <div className='mx-auto w-fit'>
                    <button type='submit' className='bg-white text-primary border-primary px-4 py-1 rounded-xl '>Update</button>
                </div>
            </form>

<ToastContainer/>
        </section>
    );
};

export default UpdateSubscription;