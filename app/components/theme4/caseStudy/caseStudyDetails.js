/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormInput from '@/app/components/form/input';
import Banner from '@/app/components/site/common/component/Banner';
import { Form } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import CaseStudyCard from '@/app/components/site/common/card/caseStudyCard';
import { getPublicCaseStudies, sentMessage } from '@/app/helper/backend';
import { useAction, useFetch } from '@/app/helper/hooks';
import { useParams } from 'next/navigation';
import { columnFormatter } from '@/app/helper/utils';
import { FaUser } from 'react-icons/fa6';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { IoMdStopwatch } from 'react-icons/io';
import { useCurrency } from '@/app/contexts/site';
import { useI18n } from '@/app/contexts/i18n';

const CaseStudyDetailsPage = () => {
  const i18n = useI18n();
  const [form] = Form.useForm();
  const { currency_symbol } = useCurrency();
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const { _id } = params;
  const [data, getData] = useFetch(getPublicCaseStudies, {}, false);
  useEffect(() => {
    getData({ _id: _id });
  }, [_id])

  const handleSubmit = async (values) => {
    setLoading(true);
    await useAction(sentMessage, { body: values });
    form.resetFields();
    setLoading(false);
  };

  return (
    <div className='bg-[#0F172A]'>
      <Banner title='Case Study Details' />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[50%] lg:w-[60%] xl:w-[70%]'>
            {
              data?.banner_image && (
                <Image className='w-full xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px] object-fill' src={data?.banner_image} width={1000} height={1000} alt="image" />
              )
            }
            <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary'>Title</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.title)}
            </p>
            <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary'>Description</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.description)}
            </p>

            <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary'>Result</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.result)}
            </p>
            <h2 className="xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {data?.tags.map((tag) => (
                <span key={tag?._id} className="first:mt-4 mt-0 description-2 text-[#888AA0] rounded-md">
                  {columnFormatter(tag?.name)}
                </span>
              ))}
            </div>

          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[30%] '>
            <div className='common-bg'>
              <div className='flex items-center gap-3 border-b border-[#888AA0] xl:px-7 xl:py-6 lg:py-5 md:py-4 p-3'>
                <FaUser className='text-primary text-6xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>Client</h2>
                  <h2 className='heading-4 text-white mt-2'>{data?.client}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 border-b border-[#888AA0] xl:px-7 xl:py-6 lg:py-5 md:py-4 p-3'>
                <FaMoneyCheckAlt className='text-primary text-6xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>Budget</h2>
                  <h2 className='heading-4 text-white mt-2'>{currency_symbol} {data?.budget}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 xl:px-7 xl:py-6 lg:py-5 md:py-4 p-3'>
                <IoMdStopwatch className='text-primary text-6xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>Duration</h2>
                  <h2 className='heading-4 text-white mt-2'>{data?.duration} hours</h2>
                </div>
              </div>
            </div>
            <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 common-bg xl:px-7 xl:py-8 lg:px-6 lg:py-7 sm:px-5 h sm:py-6 h p-4'>
              <h2 className='heading-3 text-white'>Have Query ?</h2>
              <Form className='mt-6' layout='vertical' onFinish={handleSubmit} form={form}>
                <div>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Name' type='text' name='name' placeholder='Enter your name' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Subject' type='text' name='subject' placeholder='Enter your Subject' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Email' type='email' isEmail={true} name='email' placeholder='Enter your email' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput textArea={true} rows={3} className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Message' type='text' name='message' placeholder='Enter your message ...' required={true} />
                </div>
                <div className="text-center -mt-5">
                  <button type='submit' className='w-[70%] common-btn bg-primary mt-6'>{loading ? 'Sending' : 'Send Message'}</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className='xl:mt-8 lg:mt-7 md:mt-5 mt-4'>
          <h2 className=' heading-3 text-primary'>{i18n.t('Related Case Study')}</h2>
          <div className='mt-5 lg:mt-5 xl:mt-6 course'>
            <Swiper
              keyboard={{ enabled: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 6 },
                640: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              loop={true}
              mousewheel={true}
              modules={[Keyboard, Mousewheel, Pagination]}
              className="w-full course"
            >
              {data?.related_case_study?.map((item, index) => (
                <SwiperSlide key={index} >
                  <div className="w-full">
                    <CaseStudyCard data={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailsPage;

