/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormInput from '@/app/components/form/input';
import Banner from '@/app/components/site/common/component/Banner';
import { Empty, Form, message, Modal, Radio, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { useParams, useRouter } from 'next/navigation';
import { createProductPayment, createProductReview, getAllOrders, getPublicProductReview, getPublicProjects, sentMessage } from '@/app/helper/backend';
import { useAction, useFetch } from '@/app/helper/hooks';
import { columnFormatter } from '@/app/helper/utils';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { TbDiscountOff } from 'react-icons/tb';
import { useI18n } from '@/app/contexts/i18n';
import ProductReviewCard from '@/app/components/site/common/card/productReviewCard';
import Button from '@/app/(dashboard)/components/common/button';
import { useCurrency } from '@/app/contexts/site';
import { useUser } from '@/app/contexts/user';

const ProjectDetailsPage = () => {
  const { user } = useUser();
  const [order] = useFetch(getAllOrders, { limit: 1000 });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const i18n = useI18n();
  const { currency_symbol } = useCurrency();
  const [form] = Form.useForm();
  const [addReviewForm] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const { _id } = params;
  const [data, getData] = useFetch(getPublicProjects, {}, false);
  useEffect(() => {
    getData({ _id: _id });
  }, [_id])
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(4);

  const handleSubmit = async (values) => {
    setLoading(true);
    await useAction(sentMessage, { body: values });
    form.resetFields();
    setLoading(false);
  };
  const [publicReviewData, getPublicReviewData] = useFetch(getPublicProductReview, {}, false);
  useEffect(() => {
    getPublicReviewData({ product: _id });
  }, [_id]);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    const isChecked = order?.docs?.some((order1) =>
      order1?.product?._id == _id
    );
    setCheck(isChecked);
  }, [order, _id]);

  const handleAddReview = async () => {
    const values = {
      rating: rating,
      comment: comment,
      product: _id,
    };
    await useAction(createProductReview, { body: values });
    getPublicReviewData({ product: _id });
    addReviewForm.resetFields();
  };
  const handlePayment = async () => {
    const values = {
      product: _id,
      method: paymentMethod,
    };
    const response = await createProductPayment({ body: values });

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
      <Banner title='Product Details' />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[50%] lg:w-[60%] xl:w-[70%]'>
            {
              data?.thumb_image && (
                <Image className='w-full xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px] object-fill' src={data?.thumb_image} width={1000} height={1000} alt="image" />
              )
            }
            <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary'>{data?.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: columnFormatter(data?.description) }} className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6' />
            <button onClick={() => {
              if (user) {
                setIsModalOpen(true)
              }
              else {
                router.push('/login')
              }

            }} className="xl:my-14 lg:my-12 md:my-8 my-6 bg-primary/50 text-white common-btn">{i18n.t('Purchase Now')}</button>
            <h2 className='xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-3 text-primary'>{i18n.t('Images')}</h2>
            <div className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6'>
              <div className='flex items-center xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
                <div>
                  {
                    data?.images?.[0] && (
                      <Image className='w-[300px] h-[200px] object-fill' src={data?.images?.[0]} width={1000} height={1000} alt="image" />
                    )
                  }
                </div>
                <div>
                  {
                    data?.images?.[1] && (
                      <Image className='w-[300px] h-[200px] object-fill' src={data?.images?.[1]} width={1000} height={1000} alt="image" />
                    )
                  }
                </div>
              </div>
            </div>
            <div className='xl:mt-10 lg:mt-8 md:mt-7 mt-5 description-2 text-[#888AA0] font-normal leading-6'>
              <h2 className='heading-3 text-primary'>{i18n.t('Review')}</h2>
              {
                publicReviewData?.docs?.length > 0 ? (
                  publicReviewData?.docs?.map((item, index) => (
                    <div key={index} className='first:mt-6 mt-4'>
                      <ProductReviewCard data={item} />
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center'>
                    <Empty description={i18n.t('No Review Available')} />
                  </div>
                )
              }
            </div>
            {
              check && (
                <div className='xl:mt-10 lg:mt-8 md:mt-7 mt-5 description-2 text-[#888AA0] font-normal leading-6'>
                  <h2 className='heading-3 text-primary'>{i18n.t('Add Review')}</h2>
                  <div className="mt-4 border border-primary/30 p-3 lg:p-4 xl:p-5">
                    <Form className='mt-6' layout='vertical' onFinish={handleAddReview} form={addReviewForm}>
                      <p className=" text-white"> {i18n.t('Your rating',)} </p>
                      <Rate className="mt-1 text-primary" defaultValue={rating} onChange={(value) => setRating(value)} />
                      <div className='mt-4'>
                        <FormInput
                          textArea={true}
                          rows={4}
                          name="comment"
                          label={i18n.t('Comment')}
                          className="border w-full p-2 sm:p-3 xl:p-4 glass-effect-job rounded text-white"
                          placeholder={i18n.t('Write a comment......')}
                          getValueFromEvent={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <Button type='submit' className="pet-button " >
                        {i18n.t('Submit',)}
                      </Button>
                    </Form>
                  </div>
                </div>
              )
            }
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[30%] '>
            <div className='common-bg'>
              <div className='flex items-center gap-3 border-b border-[#888AA0] xl:px-6 xl:py-5 lg:p-5 md:p-4 p-3'>
                <BiCategoryAlt className='text-primary xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Category')}</h2>
                  <h2 className='heading-5 text-white '>{columnFormatter(data?.category?.name)}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 border-b border-[#888AA0] xl:px-6 xl:py-5 lg:p-5 md:p-4 p-3'>
                <RiMoneyDollarCircleLine className='text-primary xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Price')}</h2>
                  <h2 className='heading-5 text-white '>{currency_symbol} {data?.price?.amount}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 xl:px-6 xl:py-5 lg:p-5  md:p-4 p-3'>
                <TbDiscountOff className='text-primary xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl' />
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Discount')}</h2>
                  <h2 className='heading-5 text-white '>{currency_symbol} {data?.price?.discount} </h2>
                </div>
              </div>
            </div>

            <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 common-bg xl:px-7 xl:py-8 lg:px-6 lg:py-7 sm:px-5 sm:py-6 p-4'>
              <h2 className='heading-3 text-white'>{i18n.t('Have Query ?')}</h2>
              <Form className='mt-6' layout='vertical' onFinish={handleSubmit} form={form}>
                <div>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Name' type='text' name='name' placeholder='Enter your name' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Subject' type='text' name='subject' placeholder='Enter your subject' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Email' type='email' isEmail={true} name='email' placeholder='Enter your email' required={true} />
                </div>
                <div className='sm:!mt-2'>
                  <FormInput textArea={true} rows={3} className='w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white' label='Message' type='text' name='message' placeholder='Enter your message ...' required={true} />
                </div>
                <div className="text-center mt-6">
                  <button type='submit' className='w-[70%] common-btn bg-primary'>{loading ? "Sending..." : "Send Message"}</button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div className='xl:mt-16 lg:mt-12 md:mt-8 mt-6'>
          <h2 className=' heading-3 text-primary'>{i18n.t('Related Products')}</h2>
          <div className='mt-5 lg:mt-5 xl:mt-6 course'>
            <Swiper
              keyboard={{ enabled: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 6 },
                640: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              loop={true}
              mousewheel={true}
              modules={[Keyboard, Mousewheel, Pagination]}
              className="w-full course"
            >
              {data?.related_products?.map((item, index) => (
                <SwiperSlide key={index} >
                  <Link href={`/project/${item._id}`} key={item.id} className='w-full'>
                    {
                      item?.thumb_image && (
                        <Image className='w-full xl:h-[300px] lg:h-[250px] md:h-[200px] sm:h-[220px] h-[150px] object-fill' src={item?.thumb_image} width={1000} height={1000} alt="image" />
                      )
                    }
                    <div className='common-bg'>
                      <h3 className='heading-3 text-white xl:pl-10 xl:py-6 lg:pl-8 lg:py-5 sm:pl-6 sm:py-3 pl-3 py-2'>{item?.name}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
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

export default ProjectDetailsPage;
