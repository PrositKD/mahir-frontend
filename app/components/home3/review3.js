"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowRight, GoArrowLeft, GoCodeReview } from "react-icons/go";
import ReviewCard3 from "../site/common/card/reviewCard3";
import Image from "next/image";
import { useFetch } from "@/app/helper/hooks";
import { getAllPublicReviews } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";

const Review3 = () => {
  const i18n = useI18n();
  const [data] = useFetch(getAllPublicReviews, { limit:100 })
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, []);

  const Next = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const Previous = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="relative">
      <div>
        <Image className='absolute top-20 hidden xl:block right-0 xl:-left-10 2xl:left-16' src='/home3/r2.png' width={500} height={500} alt='shape' />
        <Image className='absolute top-28 hidden xl:block xl:-right-20 2xl:right-16 ' src='/home3/r1.png' width={500} height={500} alt='shape' />
      </div>
      <div className="agency-container px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-heading text-white flex gap-3 justify-start items-center"> <span> <GoCodeReview  className="text-[28px]" /> </span> {i18n.t("Testimonials")}</p>
            <h1 className="heading-2 font-medium text-white max-w-[450px]"> {i18n.t("What they’re talking About us")}</h1>
          </div>
          <div className="flex justify-center gap-4 ">
            <button
              onClick={Previous}
              className={`group text-white border hover:border-primary hover:bg-primary flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
            >
              <GoArrowLeft className="group-hover:text-black" size={20} />
            </button>
            <button
              onClick={Next}
              className={`group text-white border hover:border-primary hover:bg-primary flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
            >
              <GoArrowRight className="group-hover:text-black" size={20} />
            </button>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 lg:mt-16 xl:mt-20 w-full ">
          <Swiper
            keyboard={{ enabled: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
            }}
            loop={true}
            mousewheel={true}
            modules={[Keyboard, Navigation, Mousewheel]}
            ref={swiperRef}
            className="w-full"
          >
            {data?.docs?.map((item, index) => (
              <SwiperSlide key={index} >
                <div className="w-full">
                  <ReviewCard3 item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Review3;
