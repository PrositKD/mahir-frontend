import React from 'react';
import { FiCheck } from 'react-icons/fi';

const PriceCard1 = ({ item = {} }) => {
      const items = [
            { id: 1, title: 'All Timeted Link' },
            { id: 2, title: 'All Timeted Link' },
            { id: 3, title: 'All Timeted Link' },
            { id: 4, title: 'All Timeted Link' },
            { id: 5, title: 'All Timeted Link' },
      ];

      return (
            <div
                  className='group rounded-lg border border-white bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,rgba(217,217,217,0.10)_100%)] shadow-[0px_4px_25px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[25px]'
            >

                  
                  <div className='shadow-custom-light transition-all ease-in-out duration-300 py-2 md:py-3 lg:py-4 '>
                        <div className='heading-2 text-center text-[#888AA0] group-hover:text-primary'>{item.title}</div>
                  </div>
                  <div className='opacity-0 group-hover:opacity-100 shadow-custom-light transition-all ease-in-out duration-300 w-full h-5'>
                        <br />
                  </div>
                  <div className="">
                        <h1 className='heading-6 text-center text-[#02050A] mt-5 md:mt-6 lg:mt-8 xl:mt-10'>
                              ${item.price} <span className='description-2 text-[#888AA0] ps-2'>/Month</span>
                        </h1>
                        <ul className='sm:mt-6 mt-5 lg:mt-8 xl:mt-10 flex flex-col items-center justify-center'>
                              {items.map((item) => (
                                    <li key={item.id} className='flex items-center py-1 sm:py-2'>
                                          <span className='rounded-full border border-primary p-[2px]'>
                                                <FiCheck className='text-primary text-xs' />
                                          </span>
                                          <p className='ml-2 sm:ml-3 text-[#888AA0] description-2 font-normal'>{item.title}</p>
                                    </li>
                              ))}
                        </ul>
                        <div className="sm:mt-6 mt-5 lg:mt-8 xl:mt-10 flex items-center justify-center sm:mb-6 mb-5 lg:mb-8 xl:mb-10">
                              <button className='common-btn group-hover:shadow-custom-light group-hover:text-primary duration-300 ease-in description-1'>
                                    Choose This Plan
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default PriceCard1;
