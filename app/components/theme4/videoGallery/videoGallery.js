'use client';
import Banner from '@/app/components/site/common/component/Banner';
import { getAllPublicServices } from '@/app/helper/backend';
import { useFetch } from '@/app/helper/hooks';
import { columnFormatter } from '@/app/helper/utils';
import { Modal } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

const VideoGalleryPage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentVideo, setCurrentVideo] = useState("");
   const [data] = useFetch(getAllPublicServices, { fields: 'banner_image,video_url,title'});
   const openModal = (videoUrl) => {
      let videoId = null;
   
      if (videoUrl.includes("youtu.be/")) {
         videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
      } else if (videoUrl.includes("youtube.com/watch?v=")) {
         videoId = new URL(videoUrl).searchParams.get("v");
      }
      if (videoId) {
         const embedUrl = `https://www.youtube.com/embed/${videoId}`;
         setCurrentVideo(embedUrl);
         setIsModalOpen(true);
      } else {
         console.error("Invalid YouTube URL:", videoUrl);
      }
   };
   

   const closeModal = () => {
      setCurrentVideo("");
      setIsModalOpen(false);
   };

   return (
      <div className='bg-[#0F172A]'>
         <Banner title='Video Gallery' />
         <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
            <div className='2xl:mt-[60px] xl:mt-14 lg:mt-10 md:mt-8 sm:mt-7 mt-6 grid grid-cols-1 sm:grid-cols-2 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-2'>
               {data?.docs?.map((video) => (
                  <div key={video?.id} className="relative rounded overflow-hidden cursor-pointer">
                     {/* Thumbnail Image */}
                     <Image
                        src={video?.banner_image} 
                        alt={'image'} 
                        width={1000}
                        height={1000}
                        className="w-full h-[150px] sm:h-[180px] md:h-[200px] xl:h-[250px] 2xl:h-[300px] object-fill rounded"
                     />
                     
                     <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 hover:opacity-100 transition duration-300"
                        onClick={() => openModal(video?.video_url)}
                     >
                        <div className="bg-white p-3 rounded-full">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-600">
                              <path d="M7 6v12l10-6z" />
                           </svg>
                        </div>
                     </div>

                     {/* Video Title */}
                     <h2 className='border border-t-0 border-white/5 heading-3 xl:pt-6 xl:pb-8 xl:pl-8 lg:p-6 md:p-5 sm:p-4 p-3 text-white'>{columnFormatter(video?.title)}</h2>
                  </div>
               ))}
            </div>
         </div>

         {/* Video Modal */}
         <Modal
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            centered
            width={800}
         >
            {currentVideo && (
               <iframe
                  className="w-full h-[450px]"
                  src={currentVideo}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
               ></iframe>
            )}
         </Modal>
      </div>
   );
};

export default VideoGalleryPage;
