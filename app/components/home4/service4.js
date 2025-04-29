'use client'
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import ServiceCard4 from "../site/common/card/serviceCard4";
import { getAllPublicServices } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const Service4 = () => {
   const [data] = useFetch(getAllPublicServices, { limit: 3 });
   const i18n = useI18n();
   return (
      <div className="agency-container xl:mt-12 lg:mt-10 md:mt-8 sm:mt-6 mt-5">
         <SectionHeader align="center" maxWidth="max-w-[710px]" title="Services" heading="We provide best service" description="We deliver high quality reliable services that meet your needs and drive your success and your satisfaction is our priority" />
         <div className="xl:mt-10 lg:mt-8 md:mt-6 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
            {
               data?.docs?.map((item, index) => (
                  <ServiceCard4 key={index} data={item} />
               ))
            }
         </div>
         <div className="flex items-center justify-center xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-6">
            <Link href="/service" className="flex items-center justify-center gap-2 bg-[#31D692] hover:bg-[#0DBC79] duration-300 text-white !rounded-[10px] common-btn ">
               {i18n.t("More Services")}
               <FaArrowRightLong />
            </Link>
         </div>
      </div>
   );
}
export default Service4