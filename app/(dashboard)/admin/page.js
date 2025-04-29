'use client'
import { FaUsers } from "react-icons/fa6";
import Image from "next/image";
import { MdEmojiEvents, MdWork, MdWorkHistory } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { AiFillProduct } from "react-icons/ai";
import { useI18n } from "@/app/contexts/i18n";
import AdminProductOrders from "./projectManagement/orders/page";
import { useFetch } from "@/app/helper/hooks";
import { getDashboardData } from "@/app/helper/backend";

const AdminDashboard = () => {
  const i18n = useI18n();
  const [summeryData] = useFetch(getDashboardData);
  const dashboardData = summeryData?.[0];
  const data = [
    {
      icon: <FaUsers />,
      value: dashboardData?.user || 0,
      title: "Total Users",
    },
    {
      icon: <GrServices />,
      value: dashboardData?.service || 0,
      title: "Total Services",
    },

    {
      icon: <MdEmojiEvents />,
      value: dashboardData?.event || 0,
      title: "Total Event",
    },
    {
      icon: <MdWork />,
      value: dashboardData?.job || 0,
      title: "Total Jobs",
    },
    {
      icon: <MdWorkHistory />,
      value: dashboardData?.job_apply || 0,
      title: "Total Applied Jobs",
    },
    {
      icon: <AiFillProduct />,
      value: dashboardData?.product || 0,
      title: "Total Product",
    },
  ]
  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded">
        <div className="xl:p-[30px] lg:p-6 md:p-5 sm:p-4 p-3 grid grid-cols-1 sm:grid-cols-3 xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-3">
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
        <AdminProductOrders limit={5} title="Recent Orders" />
      </div>
    </div>
  );
}

export default AdminDashboard
