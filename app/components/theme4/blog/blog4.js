"use client";
import { useFetch } from "@/app/helper/hooks";
import { getLatestPublicBlogSite } from "@/app/helper/backend";
import SectionHeader from "../../common/sectionHeader";
import BlogCard4 from "../../site/common/card/blogCard4";
import CommonBanner from "../../common/commonBanner";

const BlogPage4 = () => {
  const [data] = useFetch(getLatestPublicBlogSite, { limit: 9 });
  return (
    <div className="">
      <CommonBanner title="Blog" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <SectionHeader
          align="left"
          maxWidth="max-w-[670px]"
          title="Blog"
          heading="Latest Trends & Expert Tips"
          description="Stay informed with the latest industry insights trends and expert tips curated by our team of professionals"
        />
        <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 flex flex-col md:flex-row items-center gap-4 w-full">
          {data?.docs?.slice(0, 3).map((item, index) => (
            <BlogCard4 key={index} page='blog' index={index} data={item} />
          ))}
        </div>
        <div className="xl:mt-16 lg:mt-12 md:mt-10 mt-8 flex flex-col md:flex-row items-center gap-4 w-full">
          {data?.docs?.slice(3, 6).map((item, index) => (
            <BlogCard4 key={index} page='blog' index={index} data={item} />
          ))}
        </div>
        <div className="xl:mt-10 lg:mt-8 md:mt-6 mt-5 flex flex-col md:flex-row items-center gap-4 w-full ">
          {data?.docs?.slice(6, 9).map((item, index) => (
            <BlogCard4 key={index} page='blog' index={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogPage4;
