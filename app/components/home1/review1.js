"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowRight, GoArrowLeft, GoCodeReview } from "react-icons/go";
import ReviewCard1 from "../site/common/card/reviewCard1";
import { useFetch } from "@/app/helper/hooks";
import { getAllPublicReviews } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";

const Review1 = ({ color }) => {
  const i18n = useI18n();
  const [data] = useFetch(getAllPublicReviews)
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
    <div className="agency-container w-full mx-auto  px-4">
      <div className=" flex justify-center items-center section-heading text-textMain  gap-3 text-center mx-auto">  <GoCodeReview  className="text-[28px]" /><p> {i18n.t("Testimonials")} </p> </div>
      <h1 className="heading-2 font-medium text-[#02050A] text-center">
        {i18n.t("What Our Clients Say")}
      </h1>
      <div className="mt-10 sm:mt-12 lg:mt-16 xl:mt-20 w-full ">
        <Swiper
          keyboard={{ enabled: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
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
                <ReviewCard1 item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={Previous}
            className={`bg-[#D9D9D91A] text-gray-500 hover:text-black hover:${color} flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
          >
            <GoArrowLeft size={20} />
          </button>
          <button
            onClick={Next}
            className={`bg-[#D9D9D91A] text-gray-500 hover:text-black hover:${color} flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
          >
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review1;
