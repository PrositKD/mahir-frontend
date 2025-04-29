import Link from 'next/link';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

const PriceCard2 = ({ item = {}, text = 'text-white', theme }) => {
   const { id, type, date, price, } = item
   return (
      <div className='group border-[#0F172A] hover:border-primary border-b-8'>
         <div className={`transform duration-300 xl:mt-10 lg:mt-8 sm:mt-6 mt-5 ${theme === 'theme3' ? 'group-hover:bg-primary/15 custom-bg border border-white/25' : 'group-hover:bg-[#0E1327] border-2 border-textBody'}`}>
            <div className={`sm:flex items-center ${theme === 'theme3' ? 'group-hover:h-[90%]' : ''} justify-around text-center space-y-12 lg:space-y-0 md:space-y-0 ${text} py-10`}>
               <div>
                  <h6 className={`capitalize description-2 text-textBody !text-left ${theme === 'theme3' ? 'group-hover:text-primary' : ''}`}>{type}</h6>
                  <h1 className='heading-3 !capitalize'>{date}</h1>
               </div>
               <div className='flex items-center'>
                  <div className={`lg:space-y-2 space-y-1 description-2 text-textBody ${theme === 'theme3' ? 'group-hover:text-white' : ''}`}>
                     <div className='flex items-center gap-2'>
                        <BsCheckCircle />
                        <h6>All Limited Link</h6>
                     </div>
                     <div className='flex items-center gap-2'>
                        <BsCheckCircle />
                        <h1>Own Analytics Platform</h1>
                     </div>
                     <div className='flex items-center gap-2'>
                        <BsCheckCircle />
                        <h1>Chat Support</h1>
                     </div>
                     <div className='flex items-center gap-2'>
                        <BsCheckCircle />
                        <h1>Unlimited Users</h1>
                     </div>
                  </div>
               </div>
               <div>
                  <h1 className='heading-2 group-hover:text-primary'>{price}</h1>
               </div>
               <Link href={`/pricingDetails?_id=${id}`} className={`${theme === 'theme3' ? 'group-hover:bg-primary' : '!rounded-full'} common-btn  border border-primary`}>Choose this plan</Link>
            </div>
         </div>
      </div>
   );
};

export default PriceCard2;