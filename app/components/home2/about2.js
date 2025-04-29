'use client';
import Image from 'next/image';
import React from 'react';
import Business from '../common/bussiness';

const About2 = ({ theme, exploreBtn }) => {
  return (
    <div className={`${theme === 'theme2' ? 'bg-[#070713]' : ''} relative`}>
      {
        theme === 'theme2' ?
          <Image className='absolute top-0 right-0' src="/Group 1000006943.png" width={200} height={200} alt="image" />
          : ''
      }
      <div className='py-12 lg:py-20'>
        <Business exploreBtn={exploreBtn} theme={theme} />
      </div>
      {
        theme === 'theme2' ?
          <Image className='absolute bottom-0 left-0' src="/Group2 1.png" width={100} height={100} alt="image" />
          : ''
      }
    </div>
  );
};

export default About2;