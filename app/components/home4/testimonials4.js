'use client';
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import { getAllPublicReviews } from "@/app/helper/backend";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useRef } from "react";
import ReviewCard4 from "../site/common/card/reviewCard4";

const Testimonials4 = () => {
  const [data] = useFetch(getAllPublicReviews);
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
    <div className="agency-container w-full">
      <SectionHeader
        align="left"
        maxWidth="max-w-[560px]"
        title="Testimonials"
        heading="Some Good Words From Our Clients"
        description="Hear from our happy clients and discover how our work has positively impacted their businesses and experiences with us."
      />
      <div className="mt-5 lg:mt-5 xl:mt-6 w-full">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          keyboard={{ enabled: true }}
          mousewheel={true}
          loop={true}
          modules={[Keyboard, Mousewheel, Navigation]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="w-full"
        >
          {data?.docs?.map((item, index) => (
            <SwiperSlide key={index} >
              <div className="w-full">
                <ReviewCard4 data={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={Previous}
            className="bg-[#31D692] hover:bg-[#0DBC79] transform duration-300 text-white flex items-center justify-center w-12 h-12 rounded-full shadow-md"
          >
            <GoArrowLeft size={20} />
          </button>
          <button
            onClick={Next}
            className="bg-[#31D692] hover:bg-[#0DBC79]  transform duration-300 text-white flex items-center justify-center w-12 h-12 rounded-full shadow-md"
          >
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials4;
