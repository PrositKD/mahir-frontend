'use client'
import Image from 'next/image';
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import Link from 'next/link';
import { columnFormatter } from '@/app/helper/utils';
import dayjs from "dayjs"
const EventCard = ({ data, slug }) => {
   return (
      <div className='group first:mt-0 2xl:mt-[60px] xl:mt-12 lg:mt-10 md:mt-8 mt-6'>
         <div className='relative'>
            <Image className='w-full xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px] object-fill' src={data?.image} width={1000} height={1000} alt="image" />
         </div>
         <div className='lg:mt-6 sm:mt-5 mt-4 flex flex-col sm:flex-row xl:gap-14 lg:gap-12 md:gap-3 sm:gap-3 gap-2'>
            <div className='flex xl:gap-14 lg:gap-12 md:gap-3 sm:gap-3 gap-2'>
               <div className='flex gap-1 sm:gap-2 lg:gap-3'>
                  <CiClock2 className='text-primary text-base lg:text-xl' />
                  <p className='description-2 font-normal text-[#888AA0]'>{dayjs(data?.date).format("DD MMM YYYY") }</p>
               </div>
               <div className='flex gap-1 sm:gap-2 lg:gap-3'>
                  <FaLocationDot className='text-primary text-base lg:text-xl' />
                  <p className='description-2 font-normal text-[#888AA0]'>{data?.location}</p>
               </div>
            </div>
         </div>
         <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-2 text-white'>{columnFormatter(data?.title)}</h2>
         <p dangerouslySetInnerHTML={{__html:columnFormatter(data?.description)}} className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
            
         </p>
         {
            slug === 'blog' && (
               <button className='transform duration-300 group-hover:text-[#02050A] mt-4 learn-btn bg-[#55E6A5] text-white flex items-center justify-center gap-1 md:gap-2'>
                  <Link href={`/events/${data?._id}`}>Learn More</Link>
                  <GoArrowUpRight className=' text-xl font-bold group-hover:rotate-45 transform duration-300' />
               </button>
            )
         }
      </div>
   );
};

export default EventCard;