"use client";
import Image from "next/image";
import React from "react";
import { FiInstagram } from "react-icons/fi";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { columnFormatter } from "@/app/helper/utils";
import { FaTwitter } from "react-icons/fa6";
import Link from "next/link";
import { Tooltip } from "antd";

const ExpertCard1 = ({ data, theme }) => {
  const router = useRouter();
  const socialLinks = [
    { icon: <FaTwitter />, link: data?.x_url, key: 1 },
    { icon: <FiInstagram />, link: data?.instagram_url, key: 2 },
    { icon: <BsLinkedin />, link: data?.linkedin_url, key: 3 },
    { icon: <BiLogoFacebook />, link: data?.facebook_url, key: 4 },
  ];

  return (
    <div
      onClick={() => router.push(`/team/${data?._id}`)}
      className="relative group cursor-pointer"
    >
      <Image
        style={{ borderRadius: "0px 100px 0px 0px" }}
        className=" relative z-10 group w-full sm:w-[424px] h-[300px] sm:h-[300px] md:h-[230px] lg:h-[320px] xl:h-[430px]"
        src={data?.image}
        width={1000}
        height={1000}
        alt="image"
      />
      <div className="translation-transform duration-300 ease-in-out absolute bottom-0 group-hover:z-20 rounded-t-full bg-[#55E6A5] left-0">
        <div className="flex flex-col items-center justify-center lg:gap-8 gap-4 px-4 lg:px-6 text-2xl mt-16 md:mt-6 lg:mt-16 md:text-2xl mb-4 lg:mb-8">
          {socialLinks.map(({ icon, link, key }) => (
            <Link
              key={key}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="border absolute -bottom-5 -left-5 rounded-t-full w-3/5 group-hover:w-full h-5/6 border-primary duration-300 group-hover:-bottom-20 ease-in-out group-hover:h-full transition-all animate-rotate-border">
        <h1
          className={`${
            theme === "theme3" ? "text-white" : "text-[#02050A]"
          } heading-3 whitespace-pre font-semibold hidden group-hover:block text-end absolute md:bottom-2 lg:bottom-4 xl:bottom-6 right-0 p-3`}
        >
          {data?.name?.length > 15 ? (
            <Tooltip title={data?.name}>
              <span>{data?.name?.slice(0, 15)}...</span>
            </Tooltip>
          ) : (
            <span>{data?.name}</span>
          )}
        </h1>
        <h5 className="text-[#888AA0] description-2 font-normal hidden group-hover:block text-end absolute md:-bottom-3 lg:-bottom-0 right-0 p-3">
          {columnFormatter(data?.expert?.name)}
        </h5>
      </div>
    </div>
  );
};

export default ExpertCard1;
