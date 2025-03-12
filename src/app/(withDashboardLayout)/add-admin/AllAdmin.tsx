"use client"
import TableLoader from '@/components/Loader/TableLoader';
import { useAllADMINQuery, useDeleteUserMutation } from '@/Redux/Api/userApi';
import ShowToastify from '@/utils/ShowToastify';
import React from 'react';

interface ADMIN {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const AllAdmin = () => {

  const [deleteAdminFn] = useDeleteUserMutation()

  const { result, isLoading } = useAllADMINQuery("", {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      isLoading
    })
  })

  const handleDeleteAdmin = async (id: string) => {

    const { error } = await deleteAdminFn(id)
    if (error) {
      ShowToastify({ error: "Unsuccessful to delete the admin, please try again" })
      return
    }
    ShowToastify({ success: "Successfully deleted the admin" })

  }

  return (
    <div className="overflow-x-auto">
      {
        isLoading ?
          <TableLoader columns={5}></TableLoader>
          :
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Created At</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className='p-5'>
              {
                result?.map((admin: ADMIN) => (
                  <tr key={admin.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{admin.email}</td>
                    <td className="py-2 px-4">{admin.role}</td>
                    <td className={`py-2 px-4 font-semibold ${admin.status === "ACTIVATE" ? "text-green-500" : "text-red-500"}`}>
                      {admin.status}
                    </td>
                    <td className="py-2 px-4">{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td><button onClick={() => handleDeleteAdmin(admin.id)} className='bg-primary text-white transition-all hover:scale-105 py-1 px-3 rounded-lg font-semibold'>Delete</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
      }
    </div>
  );
};

export default AllAdmin;