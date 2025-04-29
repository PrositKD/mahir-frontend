'use client'
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import { getPublicCaseStudies, } from "@/app/helper/backend";
import CaseStudyCard4 from "../site/common/card/caseStudyCard4";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";

const CaseStudy4 = () => {
   const [data] = useFetch(getPublicCaseStudies);
   return (
      <div className="agency-container w-full">
         <SectionHeader align="center" maxWidth="max-w-[730px]" title="Case Study" heading="See how we help businesses succeed." description="Our case studies highlight reliable solutions tailored to client needs delivering impactful results and lasting success" />
         <div className='mt-5 lg:mt-5 xl:mt-6 case-study w-full'>
            <Swiper
               keyboard={{ enabled: true }}
               pagination={{ clickable: true }}
               breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 6 },
                  640: { slidesPerView: 3, spaceBetween: 8 },
                  768: { slidesPerView: 3, spaceBetween: 16 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
               }}
               loop={true}
               mousewheel={true}
               modules={[Keyboard, Mousewheel, Pagination]}
               className="w-full"
            >
               {data?.docs?.map((item, index) => (
                  <SwiperSlide key={index} >
                     <div className="w-full">
                        <CaseStudyCard4 data={item} />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   );
}
export default CaseStudy4