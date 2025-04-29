
import Link from 'next/link';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaArrowRightLong } from 'react-icons/fa6';

const CommonBanner = ({ title = 'Home', link = '#', subtitle = '', textTitle='text-[#FFFFFF]', textSubtitle='text-primary' }) => {
    return (
        <div
            className="relative h-[400px] -mt-32 pt-[150px] sm:pt-[160px] md:pt-[170px] pb-10 sm:pb-16 md:pb-20 bg-cover bg-center"
            style={{ backgroundImage: `url('/theme4/banner.png')` }}
        >
            <div className="absolute inset-0 bg-[#000] opacity-70 z-0"></div>
            <div className="relative z-10 flex flex-col justify-center agency-container">
                <h1 className="banner-heading mt-6 text-white">{title}</h1>
                <div className="flex items-center gap-2 sm:gap-3 mt-4">
                    <Link href='/' className='description-1 text-white flex items-center gap-2'> <AiOutlineHome className='text-2xl -mt-1'/> <span>Home</span> </Link>
                    <FaArrowRightLong className='text-white' />
                    <Link href={link} className={`description-1 hover:text-primary transform duration-300 ${textTitle}`}>{title}</Link>
                    {subtitle && <FaArrowRightLong className='text-white' />}
                    {/* <FaArrowRightLong className='text-white' /> */}
                    <p className={`description-1 ${textSubtitle}`}>{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default CommonBanner;
