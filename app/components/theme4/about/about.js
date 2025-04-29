import Blogs2 from '@/app/(site)/allBlog/page';
import Expert1 from '@/app/components/home1/expert1';
import Partner from '@/app/components/home1/partner';
import About2 from '@/app/components/home2/about2';
import Banner from '@/app/components/site/common/component/Banner';
import React from 'react';

const AboutPage = () => {
   const userBackground = {
      background:
         "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(217, 217, 217, 0.10) 100%)",
      borderRadius: "100px",
      border: "1px solid #FFFFFF",
      boxShadow: "0px 4px 25px -1px rgba(0, 0, 0, 0.20)",
      backdropFilter: "blur(50px)"
   };
   return (
      <div className='bg-[#0F172A]'>
         <Banner title='About' />
         <div className='flex flex-col 2xl:gap-[150px] xl:gap-[120px] lg:gap-[100px] md:gap-20 sm:gap-14 gap-10'>
            <About2 theme="theme3" exploreBtn='false' />
            <Partner  />
            <Expert1 theme="theme3" />
            <Blogs2 radius="rounded" color="text-white" align="text-center" theme="theme3" userBackground={userBackground} />
         </div>
      </div>
   );
};

export default AboutPage;