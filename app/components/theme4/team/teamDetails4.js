/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import Banner from '@/app/components/site/common/component/Banner';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';
import { Form, Progress } from 'antd';
import { useParams } from 'next/navigation';
import { GetPublicProviders } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import { useI18n } from '@/app/contexts/i18n';
import { columnFormatter } from '@/app/helper/utils';
import CommonBanner from '../../common/commonBanner';

const TeamDetailsPage4 = () => {
  const i18n = useI18n();
  const params = useParams();
  const { _id } = params;
  const [data, getData] = useFetch(GetPublicProviders, {}, false);

  useEffect(() => {
    getData({ _id: _id });
  }, []);
  const links = [
    {
      link: data?.x_url,
      icon: <FaTwitter />
    },
    {
      link: data?.facebook_url,
      icon: <FaFacebook />
    },
    {
      link: data?.instagram_url,
      icon: <FaInstagramSquare />
    },
    {
      link: data?.linkedin_url,
      icon: <FaLinkedin />
    }
  ]
  return (
    <div className=''>
      <CommonBanner title="Team" link='/team' subtitle={data?.name} />
      <div className='2xl:py-[150px] xl:py-[120px] lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-[60px] lg:gap-8 md:gap-6 gap-4'>
          <div className='w-full sm:w-[50%] xl:w-[47%]'>
            <div className='bg-[#ECFDF4] xl:p-6 lg:p-5 md:p-4 p-3 rounded-[10px] lg:rounded-[20px]'>
              {
                data?.image && (
                  <Image className='rounded-[10px] lg:rounded-[20px] w-full sm:w-[735px] xl:h-[642px] lg:h-[520px] md:h-[450px] sm:h-[320px] h-[300px] object-fill' src={data?.image} width={1000} height={1000} alt="image" />
                )
              }
              <h3 className='text-center heading-8 font-normal text-[#333] xl:mt-10 lg:mt-8 md:mt-7 mt-5'>{data?.name}</h3>
              <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 flex items-center justify-center gap-3 md:gap-4 lg:gap-5'>
                {links
                  .filter(link => link?.link)
                  .map((link, index) => (
                    <Link key={index} href={link?.link} className='group' target="_blank" rel="noopener noreferrer">
                      <div className='text-[#333] text-xs sm:text-base lg:text-xl group-hover:text-primary transform duration-300'>
                        {link?.icon}
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%] xl:w-[53%]'>
            <h3 className='heading-8 text-[#333]'>{i18n.t('About')}</h3>
            <p className='xl:mt-6 lg:mt-5 description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.about)} </p>
            <h2 className='heading-8 text-[#333] xl:mt-8 lg:mt-6'>{i18n.t('Professional Skills')}</h2>
            <p className='xl:mt-6 lg:mt-5  description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.professional_info)} </p>
            <div className='xl:mt-12 lg:mt-8 md:mt-7 mt-10 flex flex-col gap-8'>
              {
                data?.dynamic_records?.map((item, index) => (
                  <div className='w-full -mt-4' key={index}>
                    <div className='flex items-center justify-between'>
                      <p className='description-2 text-[#333] font-normal'>{item?.key}</p>
                      <p className='description-2 text-[#333] font-normal pr-1'>{item?.value}%</p>
                    </div>
                    <Progress
                      percent={item?.value}
                      strokeColor="#0DBC79"
                      trailColor="#888AA0"
                      format={() => ''} 
                    />
                  </div>
                ))
              }
            </div>
            <div className='xl:mt-8 lg:mt-6 mt-3'>
              <h2 className='heading-8 text-[#333]'>{i18n.t('Career Guidelines')}</h2>
              <p className='xl:mt-8 lg:mt-6 md:mt-5  description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.guidelines)} </p>
            </div>
            <div className=''>
              <p className='xl:mt-8 lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.about)}</p>
              <p className='xl:mt-[42px] lg:mt-9 md:mt-7 mt-5 heading-3 text-white !font-normal'>{data?.phone}</p>
              <p className='md:mt-4 mt-3 heading-3 text-white !font-normal'>{data?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage4;

