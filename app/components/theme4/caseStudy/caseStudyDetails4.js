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
import { useParams, useRouter } from 'next/navigation';
import { columnFormatter } from '@/app/helper/utils';
import { FaUser } from 'react-icons/fa6';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { IoMdStopwatch } from 'react-icons/io';
import { useCurrency } from '@/app/contexts/site';
import CommonBanner from '../../common/commonBanner';
import { useI18n } from '@/app/contexts/i18n';


const CaseStudyDetailsPage4 = () => {
  const router = useRouter()
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
    <div className=''>
      <CommonBanner title="Case Study" link={"/caseStudy"} subtitle={columnFormatter(data?.title)} />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[50%] lg:w-[60%] xl:w-[67%]'>
            <div className='bg-[#ECFDF4] xl:p-6 lg:p-5 md:p-4 p-3 rounded-[10px] lg:rounded-[20px]'>
              {
                data?.banner_image && (
                  <Image className='rounded-[10px] lg:rounded-[20px] w-full xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px] object-fill' src={data?.banner_image} width={1000} height={1000} alt="image" />
                )
              }
            </div>
            <h2 className='xl:mt-14 lg:mt-12 md:mt-10 mt-7 heading-2 text-[#333]'>{i18n.t("Title")}:
              <span className='pl-2 lg:mt-6 md:mt-5 mt-4 heading-2 text-primary font-normal leading-6'>
                {columnFormatter(data?.title)}
              </span>
            </h2>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-6 heading-8 text-[#333]'>{i18n.t("Description")}</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.description)}
            </p>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-6 heading-8 text-[#333]'>{i18n.t("Challenge")}</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.challenge)}
            </p>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-6 heading-8 text-[#333]'>{i18n.t("Problem")}</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.problem)}
            </p>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-6 heading-8 text-[#333]'>{i18n.t("Solution")}</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.solution)}
            </p>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-6 heading-8 text-[#333]'>{i18n.t("Result")}</h2>
            <p className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              {columnFormatter(data?.result)}
            </p>
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[33%]'>
            <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
              <div className='flex items-center gap-3 border-b border-[#888AA0] pb-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <FaUser className='text-[#333] p-1 text-3xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Client')}</h2>
                  <h2 className='heading-5 font-medium text-[#333]'>{data?.client}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 border-b border-[#888AA0] py-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <FaMoneyCheckAlt className='text-[#333] p-1 text-4xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Budget')}</h2>
                  <h2 className='heading-5 text-primary '>{currency_symbol} {data?.budget}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 pt-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <IoMdStopwatch className='text-[#333] p-1 text-4xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Duration')}</h2>
                  <h2 className='heading-5 text-[#333]'>{data?.duration} hours</h2>
                </div>
              </div>
            </div>
            <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:mt-6 lg:mt-5 md:mt-4 mt-3 p-10'>
              <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Related Case Study')}</h2>
              <div className='xl:mt-10 lg:mt-8 md:mt-6 mt-5'>
                {data?.related_case_study?.map((caseStudy) => (
                  <div onClick={() => {router.push(`/caseStudy/${caseStudy?._id}`)}}
                   key={caseStudy._id} className="cursor-pointer border-b last:border-b-0 last:pb-0 first:pt-0 pt-4 pb-4 rounded">
                    <div className='flex items-center gap-2'>
                      <Image width={1000} height={1000} src={caseStudy?.card_image} alt="image" className="w-14 h-14 object-cover rounded-[10px]" />
                      <div>
                        <h3 className="description-1">{columnFormatter(caseStudy?.title)}</h3>
                        <h3 className="description-1 text-[#888AA0] mt-2">🕒 {data?.duration} hours</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
              <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Have Query')}?</h2>
              <Form className='mt-6 theme5' layout='vertical' onFinish={handleSubmit} form={form}>
                <div>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Name' type='text' name='name' placeholder='Enter your name' required={true} />
                </div>
                <div className=''>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Subject' type='text' name='subject' placeholder='Enter your subject' required={true} />
                </div>
                <div className=''>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Email' type='email' isEmail={true} name='email' placeholder='Enter your email' required={true} />
                </div>
                <div className=''>
                  <FormInput textArea={true} rows={3} className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Message' type='text' name='message' placeholder='Enter your message ...' required={true} />
                </div>
                <div className="text-center mt-8">
                  <button type='submit' className='w-full common-btn bg-primary text-white'>{loading ? "Sending..." : "Send Message"}</button>
                </div>
              </Form>
            </div>
            <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
              <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Popular Tags')}</h2>
              <div className="flex flex-wrap gap-2 xl:mt-10 lg:mt-8 md:mt-6 mt-5">
                {data?.tags.map((tag) => (
                  <span key={tag?._id} className="bg-primary description-2 py-2 px-4 description-2 text-white rounded-md">
                    {columnFormatter(tag?.name)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailsPage4;

