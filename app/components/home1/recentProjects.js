/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Mousewheel } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { columnFormatter } from "@/app/helper/utils";
import { useFetch } from "@/app/helper/hooks";
import { getPublicProjects } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { AiOutlineProduct } from "react-icons/ai";

const RecentlyProjects = ({ theme, text }) => {
  const i18n = useI18n();
  const [data, getData] = useFetch(getPublicProjects);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [select, setSelect] = useState(null);

  const mainSwiperRef = useRef(null);
  const items = data?.docs;

  useEffect(() => {
    if (items?.length > 0) {
      setSelect(items[0]);
    }
  }, [i18n]);

  const getCurrentSwiperIndex = () => {
    if (mainSwiperRef.current) {
      const swiper = mainSwiperRef.current.swiper;
      setSelect(items?.[swiper.realIndex]);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <div className="agency-container max-w-[1320px] w-full mx-auto">
        <div className="relative w-full">
          <div
            className={`flex justify-start items-center section-heading ${
              theme === "theme3" ? "text-white" : "text-[#02050A]"
            } gap-3 text-center mx-auto`}
          >
            <AiOutlineProduct className="text-[28px]" />
            <p>{i18n.t("Our Product")}</p>
          </div>

          {text !== "project" && (
            <div className="mt-2 flex flex-col sm:flex-row  w-full">
              <h1
                className={`${
                  theme === "theme3" ? "text-white" : "text-textMain"
                } heading-2 w-ful text-left md:w-1/2 lg:w-1/2`}
              >
                {i18n.t("Recently Produced Products")}
              </h1>
            </div>
          )}

          <div className="relative">
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
              className="mySwiper2"
              ref={mainSwiperRef}
              onSwiper={(swiper) => setSelect(items?.[swiper.realIndex])}
              onSlideChange={getCurrentSwiperIndex}
              initialSlide={0}
            >
              {items?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/project/${item._id}`}>
                    {item?.thumb_image && (
                      <Image
                        className="w-full md:h-[380px] lg:h-[520px] h-[202px] mt-8 object-cover"
                        src={item?.thumb_image}
                        width={1000}
                        height={1000}
                        alt="image"
                      />
                    )}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="bg-white flex md:h-auto justify-between md:pb-7 lg:pb-12 absolute left-0 right-0 bottom-0 z-50 mx-4 md:mx-0 md:w-11/12 rounded-tl-[40px] h-[100px] md:rounded-r-none md:rounded-tl-3xl md:ml-auto">
              <div className="mt-1 ml-4 md:mt-6 md:ml-5 w-2/6">
                <h1 className="description-1 text-textBody  mt-6 md:mt-0">
                  {columnFormatter(select?.category?.name)}
                </h1>
                <p className="font-semibold hidden md:block text-textMain heading-3">
                  {select?.name}
                </p>
              </div>

              <div className="w-3/6 -mt-7 lg:-mt-12 preview-swiper hidden lg:block">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                  className="mySwiper"
                >
                  {items?.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="relative lg:w-[175px] w-[125px] h-[70px] lg:h-[100px] border rounded-full border-primary"
                    >
                      {item?.thumb_image && (
                        <Image
                          className="h-[70px] lg:h-[100px] rounded-full cursor-pointer"
                          src={item?.thumb_image}
                          width={1000}
                          height={1000}
                          alt="image"
                        />
                      )}
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black rounded-full opacity-60"></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="w-1/6">
                <button
                  className={`transform duration-300 ${
                    theme === "theme2" || theme === "theme3"
                      ? "hover:bg-primary"
                      : "bg-white"
                  } swiper-button-prev hover:shadow-custom-light rounded-full border-2 !w-10 !h-10 p-2 group !left-auto !right-16`}
                  onClick={getCurrentSwiperIndex}
                >
                  <GoArrowLeft className="group-hover:text-black text-4xl text-textBody text-center cursor-pointer" />
                </button>
                <button
                  onClick={getCurrentSwiperIndex}
                  className={`transform duration-300 ${
                    theme === "theme2" || theme === "theme3"
                      ? "hover:bg-primary"
                      : "bg-white"
                  } swiper-button-next hover:shadow-custom-light rounded-full border-2 !w-10 !h-10 p-2 group`}
                >
                  <GoArrowRight className="group-hover:text-black text-4xl text-textBody  text-center cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute -bottom-20 -left-20 z-50 animate-blink">
          <Image src="/StarG.png" width={170} height={170} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default RecentlyProjects;
