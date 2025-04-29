/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import Banner from '@/app/components/site/common/component/Banner';
import { createEventPayment, GetAllPublicEvents } from '@/app/helper/backend';
import { columnFormatter } from '@/app/helper/utils';
import { useFetch } from '@/app/helper/hooks';
import { TableImage } from '@/app/(dashboard)/components/common/table';
import { message, Modal, Radio } from 'antd';
import { useI18n } from '@/app/contexts/i18n';
import { useCurrency } from '@/app/contexts/site';
import { useUser } from '@/app/contexts/user';

const EventDetailsPage = () => {
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
    { title: 'Name', value: data?.organizer_name },
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
    <div className='bg-[#0F172A]'>
      <Banner title='Event Details' />
      <div className='agency-container py-12 sm:py-16 md:py-20 lg:py-[100px]'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[60%] xl:w-[70%]'>
            {data?.image && (
              <Image
                className='w-full object-fill xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px]'
                src={data.image}
                width={1000}
                height={1000}
                alt='Event Image'
              />
            )}
            <h2 className='heading-2 text-white xl:mt-8 lg:mt-7 md:mt-5 mt-4'>{columnFormatter(data?.title)}</h2>
            <p
              className='description-2 text-[#888AA0] font-normal leading-6 lg:mt-6 md:mt-5 mt-4'
              dangerouslySetInnerHTML={{ __html: columnFormatter(data?.description) }}
            />
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
                  className="xl:my-14 lg:my-12 md:my-8 my-6 bg-primary/50 text-white common-btn">{i18n.t('Book Now')}
                </button>
              )
            }

          </div>
          <div className='w-full sm:w-[40%] xl:w-[30%] mt-5 sm:mt-0'>
            <div className='flex flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-[60px]'>
              <div className='common-bg p-4 sm:px-3 sm:py-2 md:px-4 md:py-5 lg:px-6 lg:py-7'>
                <h3 className='heading-3 text-white'>Event Info</h3>
                <div className='mt-4 xl:mt-7 lg:mt-6 md:mt-5'>
                  {eventData.map((event, index) => (
                    <div key={index} className='mt-5 grid grid-cols-2'>
                      <h2 className='description-1 font-normal text-white'>{event.title}</h2>
                      <h2 className='description-1 font-normal text-[#888AA0]'>{event.value}</h2>
                    </div>
                  ))}
                </div>
              </div>
              <div className='common-bg p-4 sm:px-3 sm:py-2 md:px-4 md:py-5 lg:px-6 lg:py-7'>
                <h3 className='heading-3 text-white'>Event Organizer</h3>
                <div className='mt-4 xl:mt-7 lg:mt-6 md:mt-5'>
                  {data?.organizer_image && (
                    <div className='mt-5 grid grid-cols-2'>
                      <h2 className='description-1 font-normal text-white'>Image</h2>
                      <TableImage url={data.organizer_image} />
                    </div>
                  )}
                  {organizerData.map((event, index) => (
                    <div key={index} className='mt-5 grid grid-cols-2'>
                      <h2 className='description-1 font-normal text-white'>{event.title}</h2>
                      <h2 className='description-1 font-normal text-[#888AA0]'>{event.value}</h2>
                    </div>
                  ))}
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

export default EventDetailsPage;
