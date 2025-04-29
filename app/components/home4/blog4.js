'use client'
import { useFetch } from "@/app/helper/hooks";
import SectionHeader from "../common/sectionHeader";
import { getLatestPublicBlog, GetPublicProviders } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import BlogCard4 from "../site/common/card/blogCard4";

const Blog4 = () => {
   const [data] = useFetch(getLatestPublicBlog, { limit: 3 });
   const i18n = useI18n();
   return (
      <div className="agency-container w-full">
         <SectionHeader align="center" maxWidth="max-w-[670px]" title="Blog" heading="Latest Trends & Expert Tips" description="Stay informed with the latest industry insights trends and expert tips curated by our team of professionals" />
         <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 flex flex-col md:flex-row items-center gap-4 w-full">
            {
               data?.docs?.map((item, index) => (
                  <BlogCard4 key={index} index={index} data={item} />
               ))
            }
         </div>
         <div className="flex items-center justify-center xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-6">
            <Link href="/blog" className="flex items-center justify-center gap-2 bg-[#31D692] hover:bg-[#0DBC79] duration-300 text-white !rounded-[10px] common-btn ">
               {i18n.t("Explore Blog")}
               <FaArrowRightLong />
            </Link>
         </div>
      </div>
   );
}
export default Blog4