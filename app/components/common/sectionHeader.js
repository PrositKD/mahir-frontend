'use client'
import { useI18n } from "@/app/contexts/i18n";
import Image from "next/image";

const SectionHeader = ({ align = 'center', maxWidth = 'max-w-[710px]', title, heading, description }) => {
   const i18n = useI18n();
   return (
      <div className="agency-container">
         <div className={`${align === 'center' ? 'flex flex-col items-center justify-center text-center' : ''} `}>
            <div className="relative w-[214px] h-[50px]">
               <Image src="/home4/sectionBg.png" width={1000} height={1000} className="object-cover" alt="background" />
               <p className="absolute inset-0 flex !font-lexend !text-[#333] items-center justify-center section-heading !font-normal -mt-2">{i18n.t(title)}</p>
            </div>
            <h1 className={`heading-2 !font-lexend !text-[#333] md:mt-4 mt-3 ${maxWidth}`}>{i18n.t(heading)}</h1>
            <p className={`description-1 text-[#888AA0] lg:mt-6 md:mt-5 mt-4 ${maxWidth}`}>{i18n.t(description)}</p>
         </div>
      </div>
   );
}
export default SectionHeader