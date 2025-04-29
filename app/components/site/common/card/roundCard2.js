import { columnFormatter } from '@/app/helper/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const RoundCard2 = ({ item = {} }) => {
    return (
        <div className=' pb-11 px-7 pt-16 rounded-full mx-auto w-[233px] group mt-10 bg-white/40 bg-gradient-to-b from-white/40 to-gray-300/10 shadow-[0px_4px_25px_-1px_rgba(0,0,0,0.20)] backdrop-blur-[25px]'>
            <div className=' flex justify-center '>
                <div className='p-5 rounded-full !bg-[#ffffff] group-hover:shadow-custom-light' >
                <Image className='h-[50px] w-[50px]' src={item?.card_image} width={50} height={50} alt="image"></Image>
                </div>
               
            </div>
            <h1 className='text-[#02050A] group-hover:text-Primary_Color text-xl pb-8 mt-9 text-center'>{columnFormatter(item?.title)}</h1>
            <Link href={`/service/${item?._id}`}><AiOutlineArrowRight className='text-[#02050A] group-hover:shadow-md border-2 border-primary text-4xl hover:text-black group-hover:bg-primary rounded-full p-2 text-center mx-auto'></AiOutlineArrowRight></Link>
        </div>
    );
};

export default RoundCard2;