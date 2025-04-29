/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import { createEventPayment, GetAllPublicEvents } from '@/app/helper/backend';
import { columnFormatter } from '@/app/helper/utils';
import { useFetch } from '@/app/helper/hooks';
import { message, Modal, Radio } from 'antd';
import { useI18n } from '@/app/contexts/i18n';
import { useCurrency } from '@/app/contexts/site';
import { useUser } from '@/app/contexts/user';
import CommonBanner from '../../common/commonBanner';
import { IoLocationSharp } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';

const EventDetailsPage4 = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const i18n = useI18n();
  const params = useParams();
  const { _id } = params;
  const [data, getData] = useFetch(GetAllPublicEvents, {}, false);

  const [timeString, setTimeString] = useState('');
  const { currency_symbol } = useCurrency();

  useEffect(() => {
    getData({ _id });
  }, [_id]);

  useEffect(() => {
    if (data?.date) {
      const date = new Date(data.date);
      setTimeString(
        `${date.getUTCHours().toString().padStart(2, '0')}:` +
        `${date.getUTCMinutes().toString().padStart(2, '0')}:` +
        `${date.getUTCSeconds().toString().padStart(2, '0')}`
      );
    }
  }, [data?.date]);

  const eventData = [
    { title: 'Date', value: dayjs(data?.date).format('DD MMM YYYY') },
    { title: 'Time', value: timeString },
    { title: 'Cost', value: data?.payment_type === 'paid' ? <p> {currency_symbol} {data?.fee?.amount} </p> : 'Free' },
    { title: 'Category', value: columnFormatter(data?.category?.name) },
  ];

  const organizerData = [
    { title: 'Phone', value: data?.organizer_phone },
    { title: 'Email', value: data?.organizer_email },
  ];
  const handlePayment = async () => {
    const values = {
      event: _id,
      method: paymentMethod,
    };
    const response = await createEventPayment({ body: values });

    if (response?.success) {
      if (response?.data?.url) {
        router.push(response.data.url);
        message.success(response.message);
      } else {
        message.error("Payment URL not received. Please try again.");
      }
      setIsModalOpen(false);
    } else {
      message.error(response?.errorMessage || "Payment failed.");
    }
  };
  return (
    <div className=''>
      <CommonBanner title="Event" link='/events' subtitle={columnFormatter(data?.title)} />
      <div className='agency-container py-12 sm:py-16 md:py-20 lg:py-[100px]'>
        {data?.image && (
          <Image
            className='rounded-[10px] lg:rounded-[20px] w-full object-fill xl:h-[560px] lg:h-[420px] md:h-[350px] sm:h-[300px] h-[200px]'
            src={data?.image}
            width={1000}
            height={1000}
            alt='Event Image'
          />
        )}
        <div className='flex items-center xl:gap-6 lg:gap-5 gap-4 xl:mt-7 lg:mt-6 md:mt-5 mt-4'>
          <div className='flex items-center gap-2'>
            <IoLocationSharp className='text-primary' />
            <p className='description-2 text-[#888AA0]'>{data?.location}</p>
          </div>
          <div className='flex items-center gap-2'>
            <MdOutlineWatchLater className='text-primary' />
            <p className='description-2 text-[#888AA0]'>{dayjs(data?.date).format('DD MMM YYYY')}</p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[60%] xl:w-[70%]'>
            <h2 className='heading-2 !font-lexend text-[#333] xl:mt-10 lg:mt-7 md:mt-7 mt-5'>{columnFormatter(data?.title)}</h2>
            <p
              className='description-2 text-[#888AA0] font-normal leading-6 lg:mt-6 md:mt-5 mt-4'
              dangerouslySetInnerHTML={{ __html: columnFormatter(data?.description) }}
            />

          </div>
          <div className='w-full sm:w-[40%] xl:w-[30%] mt-5 sm:mt-0'>
            <div className=''>
              <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:mt-6 lg:mt-5 md:mt-4 mt-3 p-10'>
                <h2 className='heading-3 !font-lexend text-[#333]'>{i18n.t('Event Info')}</h2>
                <div className='xl:mt-8 lg:mt-7 md:mt-6 mt-5'>
                  {eventData.map((event, index) => (
                    <div key={index} className='first:pt-0 last:pb-0 pt-4 pb-4 last:border-b-0 border-b grid grid-cols-2'>
                      <h2 className='description-2 font-normal text-[#888AA0]'>{event.title}</h2>
                      <h2 className='description-1 font-normal text-[#333]'>{event.value}</h2>
                    </div>
                  ))}
                </div>
                <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-5 heading-3 !font-lexend text-[#333]'>{i18n.t('Event Organizer')}</h2>
                <div className='xl:mt-7 lg:mt-6 md:mt-5 mt-4'>
                  <div className='flex items-center gap-3'>
                    <div>
                      {data?.organizer_image && (
                        <Image width={1000} height={1000} className='w-14 h-14 rounded-full' src={data?.organizer_image} alt='Organizer Image' />
                      )}
                    </div>
                    <div className=''>
                      <p className='description-1 text-[#333] !font-semibold'>{data?.organizer_name}</p>
                      <p className='description-2 text-[#888AA0]'>Organizer</p>
                    </div>
                  </div>
                  <div className='xl:mt-8 lg:mt-7 md:mt-6 mt-5'>
                    {organizerData.map((event, index) => (
                      <div key={index} className='first:pt-0 last:pb-0 pt-4 pb-4 last:border-b-0 border-b grid grid-cols-2'>
                        <h2 className='description-2 font-normal text-[#888AA0]'>{event.title}</h2>
                        <h2 className='description-1 font-normal text-[#333]'>{event.value}</h2>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='xl:mt-10 lg:mt-8 md:mt-6 mt-5'>
                  {
                    data?.payment_type === 'paid' && (
                      <button
                        onClick={() => {
                          if (user) {
                            setIsModalOpen(true)
                          }
                          else {
                            router.push('/login')
                          }
                        }}
                        className="w-full bg-primary text-white common-btn">{i18n.t('Book Now')}
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Select Payment Method"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="flex flex-col gap-3"
        >
          <Radio value="stripe">Stripe</Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="razorpay">Razorpay</Radio>
        </Radio.Group>
        <button className="xl:mt-8 lg:mt-6 mt-5 w-full bg-[#14634E] text-white common-btn"
          onClick={handlePayment}>
          {i18n.t('Pay Now')}
        </button>
      </Modal>
    </div>
  );
};

export default EventDetailsPage4;
