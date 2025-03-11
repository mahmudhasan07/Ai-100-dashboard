"use client"
import { useAllADMINQuery } from '@/Redux/Api/userApi';
import React from 'react';

const AllAdmin = () => {

    const {result, isLoading} = useAllADMINQuery("", {
        selectFromResult : ({data, isLoading})=>({
            result : data?.data,
            isLoading
        })
    })

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.role}</td>
                <td className={`py-2 px-4 font-semibold ${admin.status === "ACTIVATE" ? "text-green-500" : "text-red-500"}`}>
                  {admin.status}
                </td>
                <td className="py-2 px-4">{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AllAdmin;