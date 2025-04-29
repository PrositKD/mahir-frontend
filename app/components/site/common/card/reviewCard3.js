import { Rate } from 'antd';
import Image from 'next/image';
import React from 'react';

const ReviewCard3 = ({ item = {}, }) => {
  return (
    <div
      className='bg-[url("/review3/reviewBG.png")] bg-cover bg-no-repeat w-full bg-center xl:pb-8 md:pb-20 sm:pb-28 pb-10'
      style={{ backgroundSize: '100% 100%' }}
    >
      <div className='sm:p-2 lg:p-5'>
        <div className='relative'>
          <div className='flex justify-between pt-6'>
            <h1 className='heading-3 font-medium  px-6 lg:px-8 xl:px-10 text-white'>{item?.user?.name}</h1>
            <Image className='lg:h-12 h-8 w-8 lg:w-12' src="/review3/quote.png" width={50} height={50} alt='Quote' />
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='rounded-full lg:w-[101px] lg:h-[101px] sm:w-[72px] sm:h-[72px] border lg:border-2 border-primary mx-5'>
                { item?.user?.image && (
                  <Image className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px]  object-fill rounded-full p-[6px]" src={item?.user?.image} width={1000} height={1000} alt="image" />
                )}
              </div>
              <Rate
                className='text-sm'
                disabled
                count={5}
                defaultValue={item?.rating}
              />
              <p className='description-2 text-white'>({item?.rating} Rating)</p>
            </div>
          </div>
          <p className='absolute top-16 lg:top-20 px-6 mr-[90px] sm:mr-20 md:mr-24 lg:px-8 xl:px-10 lg:mr-28 xl:mr-32 description-2 text-[#C9C9C9] font-medium'>{item?.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard3;
