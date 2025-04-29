
'use client'
import { columnFormatter, } from "@/app/helper/utils";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const TeamCard4 = ({ data }) => {
   return (
      <div className="bg-[#FFF] group md:rounded-[20px] rounded-[10px] border border-[#E8EAE8] lg:p-5 p-4 group"
         style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)" }}
      >
         <Link href={`/team/${data?._id}`}>
            <Image
               src={data?.image}
               width={1000}
               height={1000}
               alt="Image"
               className="w-full h-[250px] md:w-[280px] md:h-[296px] md:rounded-[20px] rounded-[10px] object-fill group-hover:scale-105 transform duration-300"
            />
            <h3 className="heading-5 font-normal text-[#333] group-hover:text-primary duration-300 lg:mt-6 md:mt-5 mt-4 text-center">{data?.name}</h3>
            <p className="description-2 text-[#888AA0] mt-1 text-center">{columnFormatter(data?.expert?.name)}</p>
         </Link>
         <div className="flex justify-center items-center md:gap-4 gap-3 md:mt-3 mt-2 pb-1">
            <Link href={data?.instagram_url}><FaTwitter className="text-[#333333] hover:text-primary transform-all duration-300 text-xl" /> </Link>
            <Link href={data?.linkedin_url}><FaLinkedinIn className="text-[#333333] hover:text-primary transform-all duration-300 text-xl" /> </Link>
            <Link href={data?.facebook_url}><FaFacebookF className="text-[#333333] hover:text-primary transform-all duration-300 text-xl" /> </Link>
         </div>
      </div>
   );
}
export default TeamCard4
