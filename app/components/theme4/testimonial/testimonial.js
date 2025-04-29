'use client'
import ReviewCard3 from '@/app/components/site/common/card/reviewCard3';
import Banner from '@/app/components/site/common/component/Banner';
import { getAllPublicReviews } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import { Empty } from 'antd';
import React from 'react';

const TestimonialsPage = () => {
  const [data] = useFetch(getAllPublicReviews)
  return (
    <div className='bg-[#0F172A]'>
      <Banner title='Testimonials' />
      <div className='2xl:py-[150px] xl:py-[120px] lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className="agency-container">
          {
            data?.docs?.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {
                  data?.docs?.map(item => <ReviewCard3 key={item._id} count={data?.docs?.length} item={item} />)
                }
              </div>
            ) : (
              <div className='flex items-center justify-center'>
                <Empty description="No Reviews Found" />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;