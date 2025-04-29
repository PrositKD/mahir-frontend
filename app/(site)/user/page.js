/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { TbBrandBooking } from "react-icons/tb";
import { FaCartShopping, FaTicketSimple } from "react-icons/fa6";
import Image from "next/image";
import { MdWork } from "react-icons/md";
import ProductOrder from "./productOrder/page";
import { useFetch } from "@/app/helper/hooks";
import { getDashboardData } from "@/app/helper/backend";
import { useEffect } from "react";
import { useI18n } from "@/app/contexts/i18n";

const UserDashboard = () => {
  const i18n = useI18n();
  const [dashboardData, getData] = useFetch(getDashboardData);
  useEffect(() => {
    getData();
  }, []);
  const data = [
    {
      id: 1,
      icon: <TbBrandBooking />,
      value: dashboardData?.event || 0,
      title: "Event Booking",
    },
    {
      id: 2,
      icon: <FaCartShopping />,
      value: dashboardData?.order || 0,
      title: "Product Orders",
    },
    {
      id: 3,
      icon: <FaTicketSimple />,
      value: dashboardData?.support || 0,
      title: "Support Ticket",
    },
    {
      id: 4,
      icon: <MdWork />,
      value: dashboardData?.job_apply || 0,
      title: "Applied Jobs",
    },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-3">
        {
          data.map((item, index) => (
            <div key={index} className='relative common-bg xl:p-8 lg:p-7 md:p-6 sm:p-4 p-3 flex items-center lg:gpa-6 md:gap-5 sm:gap-4 gap-3'>
              <div className="common-bg bg-white w-16 h-16 flex items-center justify-center">
                <span className="text-[#22F55DCC] text-4xl">
                  {item.icon}
                </span>
              </div>
              <div>
                <p className="description-1 font-normal text-white">{i18n.t(item.title)}</p>
                <p className="heading-3 !font-bold  text-white">{item.value}</p>
              </div>
              <Image src="/inner/shape1.png" width={80} height={80} alt="image" className="absolute right-5 bottom-5" />
            </div>
          ))
        }
      </div>
      <div className="mt-8">
        <ProductOrder limit={5} title="Recent Orders" />
      </div>
    </div>
  );
}

export default UserDashboard
