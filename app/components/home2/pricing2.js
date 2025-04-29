'use client';
import React from 'react';
import Image from 'next/image';
import PriceCard2 from '../site/common/card/pricingCard2';
const Pricing2 = ({ theme = '', bg = '' }) => {

    const items = [
        {
            id: 1,
            type: 'Basic',
            date: "30 days free",
            price: "Free",
        },
        {
            id: 2,
            type: 'Standard',
            date: "1 / months",
            price: "$20.00",
        },
        {
            id: 3,
            type: 'Premium',
            date: "1 / Years",
            price: "$50.00",
        },
    ]
    return (
        <div className={`bg-[${bg}]`}>
            <div className='py-16 lg:py-32'>
                <div className='relative'>
                    <div className="agency-container">
                        <div className='w-full lg:flex md:flex lg:gap-16 justify-between items-center'>
                            <h1 className='text-white md:w-1/2 heading-2 max-w-[430px] relative z-50'>The Right plan for Transparent pricing</h1>
                            <p className='description-2 text-textBody lg:pl-8 md:w-1/2 hidden md:block lg:block'>Creative agencies are businesses that specialize in creating and with on a executing mark creative agencies  businesses that specialize need more than</p>
                            <Image className={`absolute -top-10 ${theme === 'theme3' ? 'md:-top-14 lg:-top-32' : 'lg:-top-20'} left-0 hidden md:block lg:block`} src="/BG 1.png" width={500} height={500} alt="image"></Image>
                        </div>
                        <div className=''>
                            {
                                items.map(item => <PriceCard2 key={item.id} theme={theme} item={item} />)
                            }

                        </div>
                    </div>
                    <div className='absolute md:-bottom-16 lg:-bottom-32 right-0 overflow-hidden'>
                        <Image className='hidden md:block' src="/pbg-2.png" width={300} height={300} alt="image"></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing2;

