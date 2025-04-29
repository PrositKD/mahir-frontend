'use client'
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import { getPublicProjects } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCard4 from "../site/common/card/productCard4";
import Link from "next/link";

const Product4 = () => {
   const [data] = useFetch(getPublicProjects, { limit: 3 });
   const i18n = useI18n();
   return (
      <div className="agency-container">
         <SectionHeader align="right" maxWidth="max-w-[747px]" title="Product" heading="Exceptional Products for Every Need" description="We deliver high quality reliable products designed to meet your needs and drive your success your satisfaction is our priority" />
         <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
            {
               data?.docs?.map((item, index) => (
                  <ProductCard4 key={index} data={item} />
               ))
            }
         </div>
         <div className="flex items-center justify-center xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-6">
            <Link href="/project" className="flex items-center justify-center gap-2 bg-[#31D692] hover:bg-[#0DBC79] duration-300 text-white !rounded-[10px] common-btn ">
               {i18n.t("More Products")}
               <FaArrowRightLong />
            </Link>
         </div>
      </div>
   );
}
export default Product4