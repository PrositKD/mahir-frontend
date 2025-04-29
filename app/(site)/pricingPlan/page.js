
import PriceCard2 from '@/app/components/site/common/card/pricingCard2';
import Banner from '@/app/components/site/common/component/Banner';
import Image from 'next/image';
import React from 'react';

const PricingPlan = () => {
   const items = [
      {
         id: 1,
         type: 'Basic',
         date: "30 days freegtytjuilkiol",
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
      <div className='bg-[#0F172A]'>
         <Banner title='Pricing Plan' />
         <div className='2xl:py-[150px] xl:py-[120px] lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
               <div className="agency-container">
                  <div className=''>
                     {
                        items.map(item => <PriceCard2 key={item.id} theme='theme3' item={item} />)
                     }
                  </div>
               </div>
         </div>
      </div>
   );
};

export default PricingPlan;