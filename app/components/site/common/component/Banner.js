import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from "react-icons/fa";

const Banner = ({ title = 'Home' }) => {
    return (
        <div
            className="relative -mt-44 pt-[200px] sm:pt-[220px] md:pt-[246px]  pb-10 sm:pb-16 md:pb-20 bg-cover bg-center"
            style={{ backgroundImage: `url('/footer/footer.png')` }}
        >
            <div className="flex flex-col justify-center items-center">
                <Image className='hidden 2xl:block absolute top-28 right-0' src="/footer/circle.png" alt="Circle" width={149} height={127} />
                <Image className='hidden 2xl:block absolute bottom-0 left-0' src="/footer/circle.png" alt="Circle" width={146} height={123} />
                <div className="flex  items-center justify-center gap-2 sm:gap-3 ">
                    <Link href='/' className='description-1 text-white'>Home</Link>
                    <FaChevronRight className='text-white'/>
                    <p className="description-1 text-primary">{title}</p>
                </div>
                <h1 className="banner-heading mt-6 text-white text-center">{title}</h1>
            </div>
        </div>
    );
};

export default Banner;
