/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  getLatestPublicBlog,
  getPublicBlog,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import dayjs from "dayjs";
import CommonBanner from "../../common/commonBanner";
import { MdOutlineWatchLater, MdPerson } from "react-icons/md";
import { useI18n } from "@/app/contexts/i18n";
const BlogDetailsPage4 = () => {
  const i18n = useI18n()
  const [data, getData] = useFetch(getPublicBlog, {}, false);
  const params = useParams();
  const { _id } = params;
  useEffect(() => {
    getData({ _id: _id });
  }, []);
  const router = useRouter()
  const [latestBlog] = useFetch(getLatestPublicBlog);
  return (
    <div className="">
      <CommonBanner title="Blog" link="/blog" subtitle={columnFormatter(data?.title)} />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        {data?.banner_image && (
          <Image
            className='rounded-[10px] lg:rounded-[20px] w-full object-fill xl:h-[560px] lg:h-[420px] md:h-[350px] sm:h-[300px] h-[200px]'
            src={data?.banner_image}
            width={1000}
            height={1000}
            alt="image"
          />
        )}
        <div className='flex items-center xl:gap-6 lg:gap-5 gap-4 xl:mt-7 lg:mt-6 md:mt-5 mt-4'>
          <div className='flex items-center gap-2'>
            <MdPerson className='text-primary' />
            <p className='description-2 text-[#888AA0]'>{data?.author?.name}</p>
          </div>
          <div className='flex items-center gap-2'>
            <MdOutlineWatchLater className='text-primary' />
            <p className='description-2 text-[#888AA0]'>{dayjs(data?.createdAt).format('DD MMM YYYY')}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          <div className="w-full sm:w-[60%] xl:w-[70%]">
            <h2 className='heading-2 !font-lexend text-[#333] xl:mt-10 lg:mt-7 md:mt-7 mt-5'>{columnFormatter(data?.title)}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: columnFormatter(data?.description),
              }}
              className="lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6"
            />
          </div>
          <div className="mt-5 sm:mt-0 w-full sm:w-[40%] xl:w-[30%] ">
            <div className="">
              <div className='bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:mt-6 lg:mt-5 md:mt-4 mt-3 p-10'>
                <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Latest Blog')}</h2>
                <div className='xl:mt-10 lg:mt-8 md:mt-6 mt-5'>
                  {latestBlog?.docs?.map((blog) => (
                    <div onClick={() => {
                      router.push(`/blog/${blog?._id}`)
                    }} key={blog?._id} className="cursor-pointer border-b last:border-b-0 last:pb-0 first:pt-0 pt-4 pb-4 rounded">
                      <div className='flex items-center gap-2'>
                        <Image width={1000} height={1000} src={blog?.card_image} alt="image" className="w-14 h-14 object-cover rounded-[10px]" />
                        <div>
                          <h3 className="description-1">{columnFormatter(blog?.title)}</h3>
                          <h3 className="description-1 text-[#888AA0] mt-2">🕒  {dayjs(blog?.createdAt).format("MMM D, YYYY")}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='xl:mt-6 lg:mt-5 md:mt-4 mt-3 bg-[#ECFDF4] rounded-[10px] lg:rounded-[20px] xl:p-10 lg:p-8 md:p-7 sm:p-6 p-5'>
                <h2 className='heading-8 !font-lexend text-[#333]'>{i18n.t('Popular Tags')}</h2>
                <div className="flex flex-wrap gap-2 xl:mt-10 lg:mt-8 md:mt-6 mt-5">
                  {data?.tags.map((tag) => (
                    <span key={tag?._id} className="bg-primary description-2 py-2 px-4 description-2 text-white rounded-md">
                      {columnFormatter(tag?.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage4;
