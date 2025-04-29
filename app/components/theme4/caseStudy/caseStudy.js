'use client'
import CaseStudyCard from '@/app/components/site/common/card/caseStudyCard';
import Banner from '@/app/components/site/common/component/Banner';
import { getAllCaseStudyCategories, getPublicCaseStudies } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import { columnFormatter } from '@/app/helper/utils';
import React, { useState } from 'react';

const CaseStudyPage = () => {
  const [data, getData] = useFetch(getPublicCaseStudies);
  const [categories] = useFetch(getAllCaseStudyCategories);
  const [activeTab, setActiveTab] = useState("All");
  return (
    <div className='bg-[#0F172A]'>
      <Banner title='Case Study' />
      <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
        <div className='overflow-x-auto pb-5 w-full mx-auto scrollbar-thin'>
            <div className='flex items-center justify-center gap-3 md:gap-4 lg:gap-6 min-w-max'>
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
        <div className='xl:mt-14 lg:mt-10 md:mt-8 sm:mt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
          {data?.docs?.map((item, index) => (
            <div key={index} className="w-full">
              <CaseStudyCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;