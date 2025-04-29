/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import RoundCard from "@/app/components/site/common/card/roundCard";
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import {
   getAllPublicServices,
   GetPublicServiceCategories,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Empty } from "antd";
import React, { useEffect, useState } from "react";
const ServicePage = () => {
   const [services, getServices] = useFetch(
      getAllPublicServices,
      { status: true },
      { limit: 4 }
   );
   const [categories] = useFetch(GetPublicServiceCategories);
   const i18n = useI18n();
   useEffect((services) => {
      getServices(services);
   }, []);

   const [activeTab, setActiveTab] = useState("All");
   return (
      <div className='bg-[#0F172A]'>
         <Banner title='Service' />
         <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
            <div className='overflow-x-auto w-full pb-5 scrollbar-thin'>
               <div className='w-full mx-auto'>
                  <div className='flex items-center justify-center gap-3 md:gap-4 lg:gap-6 min-w-max'>
                     <button
                        onClick={() => { setActiveTab("All"), getServices({ category: undefined }) }}
                        className={`common-btn !rounded-full border border-primary whitespace-pre px-4 py-2
                            ${activeTab === "All" ? 'bg-primary text-black' : 'text-[#888AA0]'}`}
                     >
                        Show All
                     </button>
                     {categories?.docs?.map((item) => (
                        <button
                           key={item?._id}
                           onClick={() => { setActiveTab(item?._id), getServices({ category: item?._id }) }}
                           className={`common-btn !rounded-full border border-primary whitespace-pre px-4 py-2
                            ${activeTab === item?._id ? 'bg-primary text-black' : 'text-[#888AA0]'}`}
                        >
                           {columnFormatter(item?.name)}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
            <div className='relative 2xl:mt-[60px] xl:mt-12 lg:mt-10 md:mt-8 mt-6 2xl:gap-[100px] xl:gap-20 lg:gap-14 md:gap-10 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
               {
                  services?.docs?.length > 0 ? (services?.docs?.map((item) => (
                     <RoundCard key={item._id} theme='theme3' item={item} />
                  ))) : (
                     <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Empty className='mt-10' description='No Service Found' />
                     </div>
                  )
               }
            </div>
         </div>
      </div>

   );
};

export default ServicePage;
