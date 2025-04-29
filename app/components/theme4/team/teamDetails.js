/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

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
import FormInput from '@/app/components/form/input';
import { useParams } from 'next/navigation';
import { GetPublicProviders, sentMessage } from '@/app/helper/backend';
import { useAction, useFetch } from '@/app/helper/hooks';
import { useI18n } from '@/app/contexts/i18n';
import { columnFormatter } from '@/app/helper/utils';

const TeamDetailsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (value) => {
    setLoading(true);
    useAction(sentMessage, {
      body: {
        name: value.name,
        email: value.email,
        subject: value.subject,
        message: value.text
      },
    },
      () => {
        setLoading(false);
        form.resetFields();
      }
    )
  }

  return (

    <div className='bg-[#0F172A]'>
      <Banner title='Team Details' />
      <div className='2xl:py-[150px] xl:py-[120px] lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col items-center sm:flex-row 2xl:gap-[113px] xl:gap-24 lg:gap-14 md:gap-10 gap-4'>
          <div className='w-full sm:w-[50%]'>
            {
              data?.image && (
                <Image className='w-full sm:w-[735px] xl:h-[542px] lg:h-[420px] md:h-[350px] sm:h-[220px] h-[200px] object-fill' src={data?.image} width={1000} height={1000} alt="image" />
              )
            }
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%]'>
            <div className=''>
              <h3 className='heading-6 text-white'>{data?.name}</h3>
              <p className='xl:mt-8 lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.about)}</p>
              <p className='xl:mt-[42px] lg:mt-9 md:mt-7 mt-5 heading-3 text-white !font-normal'>{data?.phone}</p>
              <p className='md:mt-4 mt-3 heading-3 text-white !font-normal'>{data?.email}</p>
              <div className='xl:mt-[42px] lg:mt-9 md:mt-7 mt-5 flex items-center gap-3 md:gap-4 lg:gap-5'>
                {links
                  .filter(link => link?.link)
                  .map((link, index) => (
                    <Link key={index} href={link?.link} className='group' target="_blank" rel="noopener noreferrer">
                      <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full hover:bg-primary transform duration-300 bg-[#162C36] flex items-center justify-center'>
                        <div className='text-white text-xs sm:text-base lg:text-xl group-hover:text-black transform duration-300'>
                          {link?.icon}
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='xl:mt-[60px] lg:mt-12 md:mt-10 sm:mt-7 mt-5 flex flex-col sm:flex-row 2xl:gap-[113px] xl:gap-24 lg:gap-14 md:gap-10 gap-4'>
          <div className='w-full sm:s-[50%]'>
            <h2 className='heading-6 text-white'>{i18n.t('Professional Skills')}</h2>
            <p className='xl:mt-8 lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.professional_info)} </p>
            <div className='xl:mt-8 lg:mt-6 md:mt-5 mt-4 flex flex-col gap-8'>
              {
                data?.dynamic_records?.map((item, index) => (
                  <div key={index}>
                    <p className='description-2 text-white font-normal'>{item?.key}</p>
                    <Progress
                      percent={item?.value}
                      strokeColor="#48E98A"
                      trailColor="#888AA0"
                      format={(percent) => <span style={{ color: "white" }}>{percent}%</span>}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className='w-full sm:s-[50%]'>
            <h2 className='heading-6 text-white'>{i18n.t('Career Guidelines')}</h2>
            <p className='xl:mt-8 lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>{columnFormatter(data?.guidelines)} </p>
          </div>
        </div>
        <div className='relative 2xl:p-14 xl:p-12 lg:p-10 md:p-8 sm:p-6 p-5 2xl:mt-[150px] xl:mt-[120px] lg:mt-[100px] md:mt-20 sm:mt-16 mt-12 max-w-[868px] mx-auto bg-[#122130]'>
          <h1 className='heading-6 text-white text-center'>Send Us Message</h1>
          <Form className='xl:mt-12 lg:mt-10 md:mt-6 mt-5' layout='vertical' onFinish={handleSubmit} form={form}>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3'>
              <div>
                <FormInput className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Name' name='name' placeholder='Enter your name' required={true} />
              </div>
              <div className=''>
                <FormInput className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Email' isEmail={true} name='email' placeholder='Enter your email' required={true} />
              </div>
            </div>
            <div className='w-full'>
              <FormInput className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Subject' name='subject' placeholder='Enter your Subject' required={true} />
            </div>
            <div className='mt-3'>
              <FormInput textArea={true} rows={4} className='w-full min-h-[112px] p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Message' type='text' name='text' placeholder='Enter your message ...' required={true} />
            </div>
            <div className="flex justify-center mt-8">
              <button type='submit' className='common-btn bg-[#55E6A5]'>{loading ? 'Sending...' : 'Send Message'}</button>
            </div>
          </Form>
          <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
            <Image className='h-24' width={264} height={147} src="/hand.png" alt="hand" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default TeamDetailsPage;

