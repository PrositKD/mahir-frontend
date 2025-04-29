'use client'
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import { GetPublicProviders } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import TeamCard4 from "../site/common/card/teamCard4";

const Team4 = () => {
   const [data] = useFetch(GetPublicProviders, { limit: 4 });
   const i18n = useI18n();
   return (
      <div className="agency-container">
         <SectionHeader align="center" maxWidth="max-w-[647px]" title="Team" heading="The People Behind Our Success" description="Meet the dedicated and talented individuals whose passion expertise and collaboration drive everything we do" />
         <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
            {
               data?.docs?.map((item, index) => (
                  <TeamCard4 key={index} data={item} />
               ))
            }
         </div>
         <div className="flex items-center justify-center xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-6">
            <Link href="/team" className="flex items-center justify-center gap-2 bg-[#31D692] hover:bg-[#0DBC79] duration-300 text-white !rounded-[10px] common-btn ">
               {i18n.t("More Expertise")}
               <FaArrowRightLong />
            </Link>
         </div>
      </div>
   );
}
export default Team4