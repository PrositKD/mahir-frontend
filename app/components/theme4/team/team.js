'use client'
import ExpertCard1 from '@/app/components/site/common/card/expertCard1';
import Banner from '@/app/components/site/common/component/Banner';
import { useI18n } from '@/app/contexts/i18n';
import { GetPublicProviders } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import React from 'react';

const TeamPage = () => {
   const [providers] = useFetch(GetPublicProviders);
   const i18n = useI18n();
   return (
      <div className='bg-[#0F172A]'>
         <Banner title='Team' />
         <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
            <h1 className=" heading-2 font-medium text-center text-white">
               {i18n.t('best experts working our agency')}
            </h1>
            <div className='xl:mt-14 lg:mt-10 md:mt-8 sm:mt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10 lg:gap-8 md:gap-6 gap-5'>
               {providers?.docs?.map((item, index) => (
                  <div key={index} className="w-full">
                     <ExpertCard1 theme='theme3' data={item} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default TeamPage;