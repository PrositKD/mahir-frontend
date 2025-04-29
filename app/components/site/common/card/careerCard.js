'use client'
import React from 'react';
import { PiBagSimpleLight } from "react-icons/pi";
import { IoLocation } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { columnFormatter } from '@/app/helper/utils';
import dayjs from 'dayjs';
import { useUser } from '@/app/contexts/user';
import { useRouter } from 'next/navigation';
const CareerCard = ({ data }) => {
   const { user } = useUser();
   const router = useRouter();
   return (
      <div className='group common-bg first:mt-0 xl:mt-9 lg:mt-8 md:mt-7 sm:mt-6 mt-5 xl:p-8 lg:p-7 md:p-6 sm:p-5 p-4'>
         <div className='flex items-center xl:gap-8 lg:gpa-7 md:gap-6 sm:gap-5 gap-4'>
            <div className='common-btn bg-white flex items-center gap-2'>
               <PiBagSimpleLight className='text-primary font-bold text-xl' />
               <span className='text-[#888AA0] capitalize'>{columnFormatter(data?.category?.name)}</span>
            </div>
            <div className='common-btn bg-white flex items-center gap-2'>
               <IoLocation className='text-primary font-bold text-xl' />
               <span className='text-[#888AA0] capitalize'>{data?.job_location}</span>
            </div>
         </div>
         <h2 className='xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5 mt-4 heading-3 text-white'>{data?.job_position}</h2>
         <h2 className='lg:mt-6 md:mt-5 sm:mt-4 mt-3 description-1 text-white'>Company: <span className='xl:ml-6 lg:lm-6 md:ml-5 sm:ml-4 ml-3 description-2 text-[#888AA0]'>{data?.company_name}</span></h2>
         <h2 className='lg:mt-6 md:mt-5 sm:mt-4 mt-3 description-1 text-white'>Deadline: <span className='xl:ml-6 lg:lm-6 md:ml-5 sm:ml-4 ml-3 description-2 text-[#888AA0]'>{dayjs(data?.deadline).format("DD MMM YYYY")}</span></h2>
         <div className='xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5 mt-4 flex items-center xl:gap-8 lg:gpa-7 md:gap-6 sm:gap-5 gap-4'>
            <div className='common-btn bg-primary/10 flex items-center gap-2'>
               <FaRegClock className='text-primary font-bold text-xl' />
               <span className='text-white'>{data?.job_type}</span>
            </div>
            <button onClick={() => {
               if (user) {
                  router.push(`/careers/${data?._id}`)
               }
               else {
                  router.push('/login')
               }
            }} className='common-btn bg-primary/60 text-white'>Apply Now</button>
         </div>
      </div>
   );
};

export default CareerCard;