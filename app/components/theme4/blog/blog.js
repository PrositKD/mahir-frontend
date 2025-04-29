'use client'
import Banner from '@/app/components/site/common/component/Banner';
import React, { useState } from 'react';
import { SearchInput1 } from '@/app/components/form/search';
import Image from 'next/image';
import { FaCalendarAlt, FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { useFetch } from '@/app/helper/hooks';
import { fetchPublicSettings, getBlogCategoriesPublic, getLatestPublicBlog, getPublicBlog } from '@/app/helper/backend';
import dayjs from "dayjs";
import { columnFormatter } from '@/app/helper/utils';
import InnerBlogCard from '@/app/components/site/common/card/interBlogCard';
import { Empty } from 'antd';
const BlogPage = () => {
  const [data, getData] = useFetch(getPublicBlog);
  const [blogCategory] = useFetch(getBlogCategoriesPublic);
  const [siteData] = useFetch(fetchPublicSettings);
  const [activeCategory, setActiveCategory] = useState("All");
  const socialMediaLinks = [
    { name: 'facebook', icon: <FaFacebook /> },
    { name: 'twitter', icon: <FaTwitter /> },
    { name: 'instagram', icon: <FaInstagramSquare /> },
    { name: 'linkedin', icon: <FaLinkedin /> },
  ];

  const links = socialMediaLinks
    .map((item) => {
      const socialLink = siteData?.social_media_link?.find((s) => s.name === item.name)?.link;
      return socialLink ? { link: socialLink, icon: item.icon } : null;
    })
    .filter(Boolean);

  const [latestBlog] = useFetch(getLatestPublicBlog);
  return (
    <div className='bg-[#0F172A]'>
      <Banner title='Blog' />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          <div className='w-full sm:w-[60%] xl:w-[70%]'>
            {
              data?.docs?.length > 0 ? (
                data?.docs?.map((item) => (
                  <InnerBlogCard slug={'blog'} key={item._id} data={item} />
                ))
              ) : (
                <div className='flex items-center justify-center w-full'>
                  <Empty description='No Blogs Found' />
                </div>
              )
            }
          </div>
          <div className='mt-5 sm:mt-0 w-full sm:w-[40%] xl:w-[30%] '>
            <div className='flex flex-col 2xl:gap-[60px] xl:gap-12 lg:gap-10 md:gap-8 sm:gap-6 gap-5'>
              <div className='common-bg lg:px-5 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4'>
                <SearchInput1 onChange={(e) => getData({ search: e.target.value })} className='w-full !py-2 !md:py-3  lg:!py-4 bg-[#55E6A5] bg-opacity-10 text-white' placeholder='Search Blog' />
              </div>
              <div className='common-bg lg:px-6 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4'>
                <h3 className='heading-3 text-white'>Latest News</h3>
                <div className='xl:mt-7 lg:mt-6 md:mt-5 mt-4 flex flex-col xl:gap-8 lg:gap-6 md:gap-5 gap-4'>
                  {
                    latestBlog?.docs?.map((item) => (
                      <Link href={`/blog/${item?._id}`} className='flex items-center justify-between lg:gap-3 gap-2 group' key={item?._id}>
                        <div className='flex flex-col justify-between'>
                          <h4 className='description-1 text-white capitalize group-hover:text-primary transform !leading-6 duration-300'>{columnFormatter(item?.title)}</h4>
                          <div className='flex gap-2 lg:mt-4 sm:mt-3 mt-2'>
                            <FaCalendarAlt className='text-primary' />
                            <p className='description-3 font-normal text-[#888AA0]'>{dayjs(item?.createdAt).format("MMM D, YYYY")}</p>
                          </div>
                        </div>
                        <div className='w-[86px] h-[77px]'>
                          {
                            item?.card_image && (
                              <Image className='w-full md:w-[80px] h-full object-fill' src={item?.card_image} width={1000} height={1000} alt="image" />
                            )
                          }
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
              <div className='common-bg lg:px-6 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4'>
                <h3 className='heading-3 text-white'>Blog Categories</h3>
                <div className='xl:mt-7 lg:mt-6 md:mt-5 mt-4 flex flex-col lg:gap-3 gap-2'>
                  <button
                    onClick={() => { setActiveCategory('All'), getData({ category: undefined }) }}
                    className={`group flex items-center justify-between lg:gap-3 gap-2 px-4 py-2 rounded-md duration-300
                          ${activeCategory === 'All' ? 'text-primary bg-white/10' : 'text-[#888AA0]'}
                        hover:text-primary hover:bg-white/10`}
                  >
                    <p className='description-2 font-normal'>All</p>
                    <p className='description-2 font-normal'>{blogCategory?.docs?.reduce((acc, item) => acc + item?.count, 0)}</p>
                  </button>
                  {
                    blogCategory?.docs.map((item) => (
                      <button
                        key={item?.category?._id}
                        onClick={() => { setActiveCategory(item?.category?._id), getData({ category: item?.category?._id }) }}
                        className={`group flex items-center justify-between lg:gap-3 gap-2 px-4 py-2 rounded-md duration-300
                          ${activeCategory === item?.category?._id ? 'text-primary bg-white/10' : 'text-[#888AA0]'}
                        hover:text-primary hover:bg-white/10`}
                      >
                        <p className='description-2 font-normal'>{columnFormatter(item?.category?.name)}</p>
                        <p className='description-2 font-normal'>{item?.count}</p>
                      </button>
                    ))
                  }
                </div>
              </div>
              <div className='common-bg lg:px-6 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4'>
                <h3 className='heading-3 text-white'>Follow Us</h3>
                <div className='xl:mt-8 lg:mt-7 md:mt-6 mt-5 flex items-center gap-3 md:gap-4 lg:gap-5'>
                  {
                    links.map((link, index) => (
                      <Link key={index} href={link.link} className='group' >
                        <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full hover:bg-primary transform duration-300 bg-[#162C36] flex items-center justify-center'>
                          <div className='text-white text-xs sm:text-base lg:text-xl group-hover:text-black transform duration-300'>
                            {
                              link.icon
                            }
                          </div>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;