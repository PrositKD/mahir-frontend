"use client";
import { fetchPublicSettings } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import Image from "next/image";
import Link from "next/link";
const HeaderNav = () => {
  const [siteSetting] = useFetch(fetchPublicSettings);
  return (
    <div
      className="flex !h-[100px] border-t-[1px] border-white justify-between items-center px-6 
      bg-gradient-to-b from-white/40 to-gray-300/10 shadow-md backdrop-blur-xl "
    >
      {/* Logo with Image */}
      <div className="flex items-center gap-2">
        { 
        siteSetting?.site_logo ? (
          <Image
          src={siteSetting?.site_logo}
          alt="Agency Logo"
          width={168} 
          height={43}
        />
        ):
        (
          <Image
          src="/logo.png" 
          alt="Agency Logo"
          width={168} 
          height={43}
        />
        )}
        
       
      </div>

      {/* View Site Button */}
      <Link
      target="_blank"
        href="/"
        className="px-4 py-2 bg-green-500 text-black font-semibold rounded-md"
      >
        View Site
      </Link>
    </div>
  );
};

export default HeaderNav;

