'use client';
import { useI18n } from '@/app/contexts/i18n';
import { fetchPublicSettings } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Partner = ({theme, bgColor='bg-[#ECFDF4]', bgOpacity= 'bg-opacity-100'}) => {
  const  i18n = useI18n();
  const [setting] = useFetch(fetchPublicSettings);
  const partnerImages = setting?.partner ? [...setting.partner, ...setting.partner] : [];
  return (
    <div className={` ${bgColor}  ${theme === 'theme4' ? ' ' : 'shadow-custom-light'}  py-4 md:py-6 xl:py-8`}>
      <h1 className='font-medium sm:text-xl md:text-2xl font-lexend  text-[#333] text-center mb-10'>{i18n.t('Trusted by over 32K growing companies')}</h1>
      <Marquee speed={100} pauseOnHover={true}>
        <div className="flex items-center gap-0">
          {partnerImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 mx-3 md:mx-6">
              <Image
                className="w-[168px] h-[48px] object-contain"
                src={image}
                width={168}
                height={48}
                alt={`partner-image-${index}`}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Partner;
