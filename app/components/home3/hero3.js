"use client";
import Image from "next/image";
import React from "react";
import ExploreBtn from "../btn/ExploreBtn";
import Link from "next/link";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import {
  fetchPublicSettings,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { columnFormatter } from "@/app/helper/utils";
import { GoArrowUpRight } from "react-icons/go";
const Hero3 = ({ data: heroData }) => {
  const [siteData] = useFetch(fetchPublicSettings);
  const hero = heroData?.content?.hero;
  const socialMediaLinks = [
    { key: 1, name: "facebook", icon: <FaFacebook /> },
    { key: 2, name: "twitter", icon: <FaTwitter /> },
    { key: 3, name: "instagram", icon: <FaInstagramSquare /> },
    { key: 4, name: "linkedin", icon: <FaLinkedin /> },
  ];

  const smoothScroll = (target) => {
    let start = window.scrollY;
    let distance = target - start;
    let duration = 2000; 
    let startTime = null;

    const scroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      let elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * progress);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const scrollToTop = () => smoothScroll(0);
  const scrollToBottom = () =>
    smoothScroll(document.documentElement.scrollHeight);

  const links = socialMediaLinks
    .map((item) => {
      const socialLink = siteData?.social_media_link?.find(
        (s) => s.name === item.name
      )?.link;
      return socialLink
        ? { key: item.key, link: socialLink, icon: item.icon, name: item.name }
        : null; // Include key here
    })
    .filter(Boolean);

  return (
    <div className="-mt-48" style={{ backgroundImage: "url('/hero3bg.png')" }}>
      <div className="pt-40 agency-container mx-auto">
        <div className="flex justify-between items-start ">
          <div className="relative">
            <h1 className=" text-white mt-16 lg:mt-36 hero3-heading">
              {columnFormatter(hero?.heading)}
            </h1>
            <Image
              className="lg:w-full hidden lg:block absolute lg:-top-40 lg:-left-28"
              src="/BG_Biur.png"
              width={100}
              height={100}
              alt="image"
            />
          </div>
          <div className="mt-16 hidden sm:flex mr-20  flex-col gap-2 md:gap-3">
            {links?.map((item) => {
              return (
                <Link
                  href={item?.link}
                  key={item?.key}
                  target="_blank"
                  className="banner_link text-[#FFFFFF] flex items-center gap-2"
                >
                  <div className="flex justify-between gap-2">
                    <p className="text-[#888AA0]">{item?.icon}</p>
                    <h1 className="description-2 capitalize -mt-1 text-[#888AA0] font-normal">
                      {item?.name}
                    </h1>
                    <GoArrowUpRight />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sm:flex flex-row-reverse mt-8 lg:mt-24 items-center justify-between w-full gap-4">
          <div className="lg:flex sm:flex items-start md:mt-5 gap-4 xl:gap-8">
            <div className="xl:flex-1 hidden md:block sm:w-[30%] mt-2 bg-white/20 h-[1px]"></div>
            <p
              className="text-[#888AA0] desorption-2 sm:w-[70%] xl:flex-1"
              dangerouslySetInnerHTML={{
                __html: columnFormatter(hero?.description),
              }}

            />
          </div>
          <div className="lg:w-1/3 sm:w-3/4 mt-4 sm:mt-0">
            <ExploreBtn
              theme="theme3"
              name="Get a Quote"
              link="quote"
              iconColor="#32BA7D"
              textColor="#32BA7D"
            />
            <Image
              className="absolute top-96 -left-28 hidden lg:block"
              src="/BG_Biur-1.png"
              width={500}
              height={500}
              alt="image"
            />
          </div>
        </div>
        <div className="sm:flex mt-7 lg:mt-24 items-start justify-center">
          <div className="w-full relative">
            {hero?.image1 && (
              <Image
                className="w-full sm:w-[404px] h-[250px] lg:h-[290px] xl:h-[349px] hidden sm:block"
                src={hero?.image1}
                width={1000}
                height={1000}
                alt="image"
              />
            )}
            {hero?.image2 && (
              <Image
                className="absolute top-24 -z-10 -left-24 hidden sm:block"
                src={hero?.image2}
                width={1000}
                height={1000}
                alt="image"
              />
            )}
          </div>
          <div className="lg:ml-32 sm:mx-6 w-full">
            {hero?.image2 && (
              <Image
                className="w-full sm:w-[276px] sm:h-[160px] lg:h-[220px] xl:h-[242px]"
                src={hero?.image2}
                width={500}
                height={500}
                alt="image"
              />
            )}

            <div className="flex items-center gap-10 justify-center flex-col text-white border-2 border-white/20 w-8 mx-auto mt-5 lg:mt-28 md:mt-8 py-8 px-5 rounded-full">
              <BsArrowUp
                className="sm:text-xl lg:text-2xl xl:text-3xl cursor-pointer hover:text-primary"
                onClick={scrollToTop}
              />
              <BsArrowDown
                className="sm:text-xl lg:text-2xl xl:text-3xl cursor-pointer hover:text-primary"
                onClick={scrollToBottom}
              />
            </div>
          </div>
          {hero?.image3 && (
            <Image
              className="w-full sm:w-[404px] sm:h-[200px] lg:h-[331px] xl:h-[431px] mt-24 hidden sm:block"
              src={hero?.image3}
              width={500}
              height={500}
              alt="hero3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero3;
