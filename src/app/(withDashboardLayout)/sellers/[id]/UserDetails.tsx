"use client";

import { useSingleUserQuery } from '@/Redux/Api/userApi';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from "next/image";

interface Service {
    id : string
    title : string
    price : number
    serviceImage : string[]
    reviewStats : {
        averageRating : number
    }
}


const UserDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { result: seller, isLoading } = useSingleUserQuery(id, {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      isLoading,
    }),
  });

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  return (
 <div>
    {
        isLoading ?
        "loading" 
        :
        <div className="max-w-6xl mx-auto p-6 space-y-4">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      {seller?.profileImage && seller.profileImage !== "" && (
          <Image
            src={seller.profileImage}
            alt={seller?.name}
            width={80}
            height={80}
            className=""
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{seller?.name}</h2>
          <p className="text-sm text-gray-600">{seller?.userName}</p>
          <p className="text-sm">Role: {seller?.role}</p>
          <p className="text-sm">Status: {seller?.status}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Contact Info</h3>
        <p>Email: {seller?.email}</p>
        <p>Phone: {seller?.phone}</p>
        <p>Website: {seller?.website || "N/A"}</p>
      </div>

      {/* Followers & Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Followers & Posts</h3>
        <p>Followers: {seller?._count?.followers}</p>
        <p>Following: {seller?._count?.following}</p>
        <p>Posts: {seller?._count?.Post}</p>
      </div>

      {/* Services */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {seller?.Service?.map((service: Service) => (
            <div key={service.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h4 className="text-md font-semibold">{service.title}</h4>
              <p className="text-sm">Price: ${service.price}</p>
              <div className="flex gap-2 mt-2">
                {service.serviceImage.map((img, index) => (
                  <Image key={index} src={img} alt="Service" width={50} height={50} className="rounded" />
                ))}
              </div>
              <p className="text-sm mt-2">Rating: {service.reviewStats.averageRating} ⭐</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    }
 </div>
  );
};

export default UserDetails;
