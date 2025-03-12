"use client"
import { useRegisterUserMutation } from '@/Redux/Api/userApi';
import ShowToastify from '@/utils/ShowToastify';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import AllAdmin from './AllAdmin';

const AddAdmin = () => {

    const [addAdminFn] = useRegisterUserMutation()

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newData = new FormData()
        const data = { ...formData, role: "ADMIN" };
        newData.append("bodyData", JSON.stringify(data))

        const { error } = await addAdminFn(newData)
        if (error) {
            ShowToastify({ error: "Admin can't create" })
            return
        }
        ShowToastify({ success: "Admin created successfully" })
    };


    return (
        <section className='min-h-screen space-y-5 my-10'>
            <h1 className='text-3xl font-semibold'>Add Admin</h1>
            <div className="flex justify-center items-center  my-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg border w-full max-w-sm"
                >
                    {/* <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2> */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-2 rounded hover:bg-primary/70 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className='my-8'>
                <h1 className='text-3xl font-semibold mb-8'>Admin Lists</h1>
                <AllAdmin></AllAdmin>
            </div>
        </section>
    );
};

export default AddAdmin;