"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import ExpertCard1 from "../site/common/card/expertCard1";
import { useFetch } from "@/app/helper/hooks";
import { GetPublicProviders } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import Image from "next/image";
import { GrUserExpert } from "react-icons/gr";

const Expert1 = ({ theme }) => {
  const i18n = useI18n();
  const [providers] = useFetch(GetPublicProviders);
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
    <div className="agency-container w-full mx-auto px-4">
      <div className={`flex justify-center items-center section-heading ${
          theme === "theme3" ? "text-white" : "text-[#02050A]"
        }  gap-3 text-center mx-auto`} >  <GrUserExpert  className="text-[28px]" /><p> {i18n.t("Our Experts")} </p> </div>
      <h1
        className={`mt-2 ${
          theme === "theme3" ? "text-white" : "text-[#02050A]"
        } heading-2 font-medium text-center`}
      >
        {i18n.t("Best experts working our agency")}
      </h1>

      <div className="absolute right-52 animate-blink ">
        <Image
          src="/StarG.png"
          width={170}
          height={170}
          alt="image"
          className=""
        />
      </div>
      <div className="mt-10 sm:mt-12 lg:mt-16 xl:mt-20 w-full">
        <Swiper
          keyboard={{ enabled: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 40 },
            640: { slidesPerView: 2, spaceBetween: 36 },
            768: { slidesPerView: 4, spaceBetween: 36 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          loop={true}
          mousewheel={true}
          modules={[Keyboard, Navigation, Mousewheel]}
          ref={swiperRef}
          className="w-full !pl-5 !pb-20"
        >
          {providers?.docs?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full">
                <ExpertCard1 theme={theme} data={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-between gap-4 ">
          <button
            onClick={Previous}
            className={`${
              theme === "theme3"
                ? "border border-white/30 text-white hover:text-black hover:bg-primary hover:border-primary"
                : theme === "theme2"
                ? "text-[#02050A] hover:text-black hover:bg-primary"
                : "bg-[#D9D9D91A] text-gray-500"
            }  flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
          >
            <GoArrowLeft size={20} />
          </button>
          <button
            onClick={Next}
            className={`${
              theme === "theme3"
                ? "border border-white/30 text-white hover:text-black hover:bg-primary hover:border-primary"
                : theme === "theme2"
                ? "text-[#02050A] hover:text-black hover:bg-primary"
                : "bg-[#D9D9D91A] text-gray-500"
            }  flex items-center justify-center w-12 h-12 rounded-full shadow-md`}
          >
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert1;
