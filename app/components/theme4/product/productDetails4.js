/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormInput from '@/app/components/form/input';
import { Empty, Form, message, Modal, Radio, Rate } from 'antd';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import "swiper/css";
import { useParams, useRouter } from 'next/navigation';
import { createProductPayment, createProductReview, getAllOrders, getPublicProductReview, getPublicProjects, sentMessage } from '@/app/helper/backend';
import { useAction, useFetch } from '@/app/helper/hooks';
import { columnFormatter } from '@/app/helper/utils';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { TbDiscountOff } from 'react-icons/tb';
import { useI18n } from '@/app/contexts/i18n';
import Button from '@/app/(dashboard)/components/common/button';
import { useCurrency } from '@/app/contexts/site';
import { useUser } from '@/app/contexts/user';
import CommonBanner from '../../common/commonBanner';
import ProductReviewCard4 from '../../site/common/card/productReviewCard4';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const ProjectDetailsPage4 = () => {
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
  const swiperRef = useRef(null);

  const Next = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const Previous = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className=''>
      <CommonBanner title="Product" link='/project' subtitle={data?.name} />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[50%] lg:w-[60%] xl:w-[66%]'>
            <div className='w-full'>
              <div className='w-full'>
                <div className='relative bg-[#ECFDF4] xl:p-10 lg:p-8 md:p-6 p-5 rounded-[10px] lg:rounded-[20px]'>
                  <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    keyboard={{ enabled: true }}
                    mousewheel={true}
                    loop={true}
                    modules={[Keyboard, Mousewheel, Navigation]}
                    breakpoints={{
                      320: { slidesPerView: 1, spaceBetween: 10 },
                      480: { slidesPerView: 1, spaceBetween: 12 },
                      640: { slidesPerView: 1, spaceBetween: 14 },
                      768: { slidesPerView: 1, spaceBetween: 16 },
                      1024: { slidesPerView: 1, spaceBetween: 24 },
                    }}
                    className="w-full"
                  >
                    <SwiperSlide >
                      <div className="w-full">
                        {
                          data?.thumb_image && (
                            <Image className='rounded-[10px] lg:rounded-[20px] w-full xl:h-[576px] lg:h-[420px] md:h-[350px] sm:h-[220px] h-[200px] object-fill' src={data?.thumb_image} width={1000} height={1000} alt="image" />
                          )
                        }
                      </div>
                    </SwiperSlide>
                    <SwiperSlide >
                      <div className="w-full">
                        {
                          data?.images?.[0] && (
                            <Image className='rounded-[10px] lg:rounded-[20px] w-full xl:h-[576px] lg:h-[420px] md:h-[350px] sm:h-[220px] h-[200px] object-fill' src={data?.images?.[0]} width={1000} height={1000} alt="image" />
                          )
                        }
                      </div>
                    </SwiperSlide>
                    <SwiperSlide >
                      <div className="w-full">
                        {
                          data?.images?.[1] && (
                            <Image className='rounded-[10px] lg:rounded-[20px] w-full xl:h-[576px] lg:h-[420px] md:h-[350px] sm:h-[220px] h-[200px] object-fill' src={data?.images?.[1]} width={1000} height={1000} alt="image" />
                          )
                        }
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  {/* Swipper Navigation */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 z-50 pointer-events-none">
                    <button
                      onClick={Previous}
                      className="bg-[#31D692] hover:bg-[#0DBC79] transform duration-300 text-white flex items-center justify-center w-12 h-12 rounded-full shadow-md pointer-events-auto"
                    >
                      <GoArrowLeft size={20} />
                    </button>
                    <button
                      onClick={Next}
                      className="bg-[#31D692] hover:bg-[#0DBC79] transform duration-300 text-white flex items-center justify-center w-12 h-12 rounded-full shadow-md pointer-events-auto"
                    >
                      <GoArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className='xl:mt-10 lg:mt-8 md:mt-6 mt-5 heading-2 !font-lexend text-[#333333]'>{data?.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: columnFormatter(data?.description) }} className='lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6' />
            <div className='xl:mt-[60px] lg:mt-12 md:mt-10 mt-7 xl:p-10 lg:p-8 md:p-6 p-5 border rounded-[10px] lg:rounded-[20px] w-full'>
              <div className='description-2 text-[#888AA0] font-normal leading-6'>
                <h2 className='heading-9 text-[#333333]'>{i18n.t('Review')}</h2>
                {
                  publicReviewData?.docs?.length > 0 ? (
                    publicReviewData?.docs?.map((item, index) => (
                      <div key={index} className='md:mt-6 mt-4'>
                        <ProductReviewCard4 data={item} />
                      </div>
                    ))
                  ) : (
                    <div className='flex items-center justify-center empty-theme4'>
                      <Empty description={i18n.t('No Review Available')} />
                    </div>
                  )
                }
              </div>
              {
                check && (
                  <div className='xl:mt-10 lg:mt-8 md:mt-7 mt-5 description-2 text-[#888AA0] font-normal leading-6'>
                    <h2 className='heading-9 text-[#333333]'>{i18n.t('Add Review')}</h2>
                    <div className="mt-4 border border-primary/30 rounded-[10px] p-3 lg:p-4 xl:p-5">
                      <Form className='mt-6 ' layout='vertical' onFinish={handleAddReview} form={addReviewForm}>
                        <p className="font-inter font-medium text-[#333]"> {i18n.t('Your Rating',)} </p>
                        <Rate className="mt-1 text-primary" defaultValue={rating} onChange={(value) => setRating(value)} />
                        <div className='mt-4 '>
                          <FormInput
                            textArea={true}
                            rows={4}
                            name="comment"
                            label={i18n.t('Comment')}
                            className="border w-full p-2 sm:p-3 xl:p-4 theme4 !bg-white text-[#333] rounded-[10px] focus:outline-primary"
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
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[34%]'>
            <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
              <div className='flex items-center gap-3 border-b border-[#888AA0] pb-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <BiCategoryAlt className='text-[#333] p-1 text-3xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Category')}</h2>
                  <h2 className='heading-5 font-medium text-[#333] '>{columnFormatter(data?.category?.name)}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 border-b border-[#888AA0] py-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <RiMoneyDollarCircleLine className='text-[#333] p-1 text-4xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Price')}</h2>
                  <h2 className='heading-5 text-primary '>{currency_symbol} {data?.price?.amount}</h2>
                </div>
              </div>
              <div className='flex items-center gap-3 pt-5'>
                <div className='bg-[#A6F4CC] h-14 w-14 rounded-full flex items-center justify-center'>
                  <TbDiscountOff className='text-[#333] p-1 text-4xl ' />
                </div>
                <div className=''>
                  <h2 className='description-2 text-[#888AA0]'>{i18n.t('Discount')}</h2>
                  <h2 className='heading-5 text-[#EF4444] '>{currency_symbol} {data?.price?.discount} </h2>
                </div>
              </div>
              <div className='flex items-center justify-center xl:mt-10 lg:mt-8 md:mt-6 mt-5'>
                <button onClick={() => {
                  if (user) {
                    setIsModalOpen(true)
                  }
                  else {
                    router.push('/login')
                  }
                }} className=" bg-primary w-full text-white common-btn">{i18n.t('Purchase Now')}
                </button>
              </div>
            </div>
            <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:mt-6 lg:mt-5 md:mt-4 mt-3 p-10'>
              <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Related Products')}</h2>
              <div className='xl:mt-10 lg:mt-8 md:mt-6 mt-5'>
                {data?.related_products?.map((product) => (
                  <div onClick={() => {
                    router.push(`/project/${product?._id}`)
                  }}
                    key={product._id} className="cursor-pointer border-b last:border-b-0 last:pb-0 first:pt-0 pt-4 pb-4 rounded">
                    <div className='flex items-center gap-2'>
                      <Image width={1000} height={1000} src={product?.thumb_image} alt={product?.name} className="w-14 h-14 object-cover rounded-[10px]" />
                      <div>
                        <h3 className="description-1">{product?.name}</h3>
                        <h3 className="description-1 text-[#029962] mt-2">{currency_symbol} {data?.price?.amount}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
              <h2 className='heading-8 !font-lexend  text-[#333]'>{i18n.t('Have Query ?')}</h2>
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
                <div className="text-center mt-6">
                  <button type='submit' className='w-full common-btn bg-primary text-white'>{loading ? "Sending..." : "Send Message"}</button>
                </div>
              </Form>
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

export default ProjectDetailsPage4;
