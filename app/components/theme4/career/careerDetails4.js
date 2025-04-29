/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Banner from '@/app/components/site/common/component/Banner';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import FormInput from '@/app/components/form/input';
import { useParams } from 'next/navigation';
import { useAction, useFetch } from '@/app/helper/hooks';
import { createApplyJob, getPublicJobs, singlePDFUpload } from '@/app/helper/backend';
import { columnFormatter } from '@/app/helper/utils';
import dayjs from 'dayjs';
import UploadFileInput from '@/app/components/form/UploadFileInput';
import CommonBanner from '../../common/commonBanner';
import { useCurrency } from '@/app/contexts/site';
const CareersDetailsPage4 = () => {
  const [jobData, getJobData] = useFetch(getPublicJobs, {}, false);
  const { currency_symbol } = useCurrency()

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    getJobData({ _id: _id });
  }, [_id]);
  const [form] = Form.useForm();

  const handleSubmit = async (value) => {

    let resume = '';
    let cover_latter = '';

    if (value?.resume?.[0]?.originFileObj) {
      const { data } = await singlePDFUpload({
        pdf: value.resume[0].originFileObj,
        file_name: "resume",
      });
      resume = data || "";
    } else {
      resume = value?.banner_image?.[0]?.url || "";
    }

    if (value?.cover_latter?.[0]?.originFileObj) {
      const { data } = await singlePDFUpload({
        pdf: value.cover_latter[0].originFileObj,
        file_name: "cover_latter",
      });
      cover_latter = data || "";
    } else {
      cover_latter = value?.cover_latter?.[0]?.url || "";
    }
    const payload = {
      ...value,
      job: _id,
      resume: resume,
      cover_latter: cover_latter,
    };
    setLoading(true);
    useAction(createApplyJob, { body: payload });
    setLoading(false);
    form.resetFields();
  }
  const data = [
    {
      id: 1,
      heading: 'Job Context',
      description: columnFormatter(jobData?.job_context),
    },
    {
      id: 2,
      heading: 'Job Responsibility',
      description: columnFormatter(jobData?.job_responsibility)
    },
    {
      id: 3,
      heading: 'Educational Requirement',
      description: columnFormatter(jobData?.educational_requirement)
    },
    {
      id: 4,
      heading: 'Experience Requirement',
      description: columnFormatter(jobData?.experience_requirement)
    },
    {
      id: 5,
      heading: 'Additional Requirement',
      description: columnFormatter(jobData?.additional_requirements)
    },
  ];
  const categories = [
    { id: 1, name: 'Company', value: jobData?.company_name },
    { id: 2, name: 'Job Category', value: columnFormatter(jobData?.category?.name) },
    { id: 3, name: 'Job Position', value: jobData?.job_position },
    { id: 4, name: 'Job Type', value: jobData?.job_type },
    { id: 5, name: 'Job Location', value: jobData?.job_location },
    { id: 6, name: 'Salary', value: `${ currency_symbol } ${jobData?.salary}` },
    { id: 7, name: 'Deadline', value: dayjs(jobData?.deadline).format('YY MMM DD') },
  ];
  return (
    <div className=''>
      <CommonBanner title="Career" link='/careers' subtitle={columnFormatter(jobData?.title)} />
      <div className='2xl:py-[150px] xl:py-[120px] lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[60%] xl:w-[70%]'>
            {
              data?.map((item) => (
                <div key={item.id} className='first:mt-0 xl:mt-8 lg:mt-7 md:mt-5 mt-4'>
                  <h2 className='heading-8 font-semibold text-[#333333]'>{item?.heading}</h2>
                  {
                    item.heading == "Educational Requirement" || item.heading == "Experience Requirement" || item.heading == "Additional Requirement" || item.heading == "Job Responsibility" ?
                      (<p dangerouslySetInnerHTML={{ __html: item?.description }} className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 description-2 text-[#888AA0] font-normal leading-6' />) :
                      (<p className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 description-2 text-[#888AA0] font-normal leading-6'>{item?.description}</p>)
                  }

                </div>
              ))
            }
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[40%] xl:w-[30%] '>
            <div className='flex flex-col 2xl:gap-[60px] xl:gap-12 lg:gap-10 md:gap-8 sm:gap-6 gap-5'>
              <div className='bg-[#ECFDF4] xl:p-10 lg:p-8 md:p-6 p-4 rounded-[10px] lg:rounded-[20px]'>
                <h3 className='heading-8 !font-lexend  text-[#333333]'>Job Information</h3>
                <div className='xl:mt-10 lg:mt-8 md:mt-6 mt-5 flex flex-col lg:gap-3 gap-2'>
                  {
                    categories.map((item) => (
                      <div
                        key={item.id}
                        className='grid grid-cols-2 items-center gap-2 md:gap-4 border-b last:border-0 border-[#EBEDF9]/20 first:pt-0 pt-4 last:pb-0 pb-4'
                      >
                        <p className='description-2 font-semibold text-[#888AA0]'>{item.name}</p>
                        <p className='description-1 font-medium text-[#333333]'>{item.value}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='2xl:mt-[140px] xl:mt-[110px] lg:mt-[100px] md:mt-20 sm:mt-16 mt-12'>
          <h3 className='heading-2 !font-lexend text-primary'>Apply to job</h3>
          <Form className='theme5' layout='vertical' onFinish={handleSubmit} form={form}>
            <div className='xl:p-10 lg:p-8 md:p-6 sm:p-5 p-4 xl:mt-8 lg:mt-7 md:mt-5 mt-4 border border-[#EBEDF9]/20 bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px]'>
              <div className=''>
                <h4 className='heading-3 !font-lexend font-semibold text-primary lg:pb-6 md:pb-5 pb-4 border-b border-[#EBEDF9]/20'>Personal Information</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3 mt-5'>
                  <div>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Full Name' name='full_name' placeholder='Enter your name' required={true} />
                  </div>
                  <div className=''>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Email' name='email' isEmail={true} type='email' placeholder='Enter your email' required={true} />
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3'>
                  <div>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Address' name='address' placeholder='Enter your Address' required={true} />
                  </div>
                  <div className=''>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Phone Number' name='phone' type='number' placeholder='Enter your Phone Number' required={true} />
                  </div>
                </div>
              </div>
              <div className='xl:mt-5 lg:mt-4 md:mt-4 mt-2'>
                <h4 className='heading-3 !font-lexend font-semibold text-primary lg:pb-6 md:pb-5 pb-4 border-b border-[#EBEDF9]/20'>Online Profile</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3 mt-5'>
                  <div>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Linkedin Profile' name='linkedin' placeholder='Enter your Linkedin Profile Link' required={true} />
                  </div>
                  <div className=''>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='GitHub' name='github' placeholder='Enter your GitHub Profile' required={true} />
                  </div>
                </div>
              </div>
              <div className='xl:mt-5 lg:mt-4 md:mt-4 mt-2'>
                <h4 className='heading-3 !font-lexend font-semibold text-primary lg:pb-6 md:pb-5 pb-4 border-b border-[#EBEDF9]/20'>Experience</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3 mt-5'>
                  <div>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Year of Experience' type='number' name='experience' placeholder='Example: 3, 4, 5' required={true} />
                  </div>
                  <div className=''>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Company Name' name='companyName' placeholder='Enter your Previous Company Name' required={true} />
                  </div>
                </div>
              </div>
              <div className='xl:mt-5 lg:mt-4 md:mt-4 mt-2'>
                <h4 className='heading-3 !font-lexend font-semibold text-primary lg:pb-6 md:pb-5 pb-4 border-b border-[#EBEDF9]/20'>Educational Information</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3 mt-5'>
                  <div>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Highest Education Level' name='education' placeholder='Example: B.Sc or M.Sc or Phd' required={true} />
                  </div>
                  <div className=''>
                    <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='University/College Name' name='university' placeholder='Enter University/College Name' required={true} />
                  </div>
                </div>
              </div>
              <div className='xl:mt-5 lg:mt-4 md:mt-4 mt-2'>
                <h4 className='heading-3 !font-lexend font-semibold text-primary lg:pb-6 md:pb-5 pb-4 border-b border-[#EBEDF9]/20'>Additional Information</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3 mt-5'>
                  <div className='file-upload-theme4'>
                    <UploadFileInput pdf={true} name='resume' label='Resume' placeholder='Upload your Resume' required={true} />
                  </div>
                  <div className='file-upload-theme4'>
                    <UploadFileInput pdf={true} name='cover_latter' label='Cover Letter' placeholder='Upload your Cover Letter' required={true} />
                  </div>
                </div>
              </div>
            </div>
            <button className='xl:mt-8 lg:mt-7 md:mt-6 sm:mt-5 mt-4 common-btn bg-primary text-white !rounded'>Submit</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CareersDetailsPage4;


