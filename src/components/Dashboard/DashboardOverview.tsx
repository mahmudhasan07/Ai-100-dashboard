'use client';

import { useState } from "react";
import DeliveryChart from "@/components/allchart/CompletedChart";
import LineChart from "@/components/allchart/LineChart";
// import { useGetAllEventsQuery } from "../Redux/Api/eventApi";
import CountUp from "react-countup";
import CompletedChart from "@/components/allchart/CompletedChart";
import { useGetAllEventsQuery } from "@/Redux/Api/eventApi";

export default function DashboardOverview() {
  const [selectedValue, setSelectedValue] = useState<string>('this-month');
  const { data } = useGetAllEventsQuery({})
  const today = new Date().toISOString()
  const runningEvent = data?.data?.data?.filter((item: { startDate: Date | string }) => item?.startDate >= today);
  const completedEvent = data?.data?.data?.filter((item: { startDate: Date | string }) => item?.startDate <= today);


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="pt-8 pb-32 lg:px-0 px-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-6 justify-between">
          {/* Card 1 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Event Created</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"> <CountUp end={data?.data?.data?.length} /></span>
                  <span className="text-lg text-gray-500">Events</span>
                </div>
                <p className="text-base text-gray-600">Total 10 services are featured</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Completed Event</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"><CountUp end={completedEvent?.length} /></span>
                  <span className="text-lg text-gray-500">Events</span>
                </div>
                <p className="text-base text-gray-600">Across all categories</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Pending Event</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"><CountUp end={runningEvent?.length} duration={3}></CountUp></span>
                  <span className="text-lg text-gray-500">Events</span>
                </div>
                <p className="text-base text-gray-600">Events waiting for approval</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          <CompletedChart totalEvent={data?.data?.data?.length } completedEvent={completedEvent?.length} />
        </div>
        <div className="mt-8">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
