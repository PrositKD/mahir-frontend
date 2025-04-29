'use client'
import RecentlyProjectsInnerPage from '@/app/components/home1/recentProjectsInnerPage';
import Banner from '@/app/components/site/common/component/Banner';
import { getPublicProjectCategories, getPublicProjects } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import { columnFormatter } from '@/app/helper/utils';
import { Empty } from 'antd';
import React, { useState } from 'react';

const ProjectPage = () => {
  const [data, getData] = useFetch(getPublicProjects);
  const [categories] = useFetch(getPublicProjectCategories);
  const [activeTab, setActiveTab] = useState("All");
  return (
    <div className='bg-[#0F172A]'>
      <Banner title='Product' />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='overflow-x-auto pb-4 w-full'>
          <div className='min-w-max w-full mx-auto'>
            <div className='flex items-center justify-center gap-3 md:gap-4 lg:gap-6'>
              <button
                onClick={() => { setActiveTab("All"), getData({ category: undefined }) }}
                className={`common-btn !rounded border border-primary whitespace-pre px-4 py-2 
                                                  ${activeTab === "All" ? 'bg-primary text-black' : 'text-[#888AA0]'}`}
              >
                Show All
              </button>
              {categories?.docs?.map((item) => (
                <button
                  key={item?._id}
                  onClick={() => { setActiveTab(item?._id), getData({ category: item?._id }) }}
                  className={`common-btn !rounded border border-primary whitespace-pre px-4 py-2 
                                                  ${activeTab === item?._id ? 'bg-primary text-black' : 'text-[#888AA0]'}`}
                >
                  {columnFormatter(item?.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
        {
          data?.docs?.length > 0 ? (
            <RecentlyProjectsInnerPage theme="theme3" text='project' items={data?.docs} />
          ) : (
            <div className='flex justify-center mt-10'>
              <Empty description="No Projects Found" />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ProjectPage;