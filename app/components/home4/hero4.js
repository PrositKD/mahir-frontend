"use client";
import Image from "next/image";
import { Modal } from "antd";
import { useState } from "react";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaCheckCircle, FaLongArrowAltRight } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import Link from "next/link";
import { useFetch } from "@/app/helper/hooks";
import {
  fetchPublicSettings,
  getAllPublicReviews,
} from "@/app/helper/backend";
import { columnFormatter } from "@/app/helper/utils";
import { LayoutLoader } from "@/app/(dashboard)/components/common/loader";

const Hero4 = ({ data: heroData }) => {
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [siteData, { loading }] = useFetch(fetchPublicSettings);
  const [review] = useFetch(getAllPublicReviews, { limit: 1000 });
  const social_media = siteData?.social_media_link;
  const hero = heroData?.content?.hero;
  const items = ["Products", "Services", "Events"];
  // const showLoading = () => {
  //   setOpen(true);
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LayoutLoader />
      </div>
    );
  }
  return (
    <div className="z-10 -mt-[120px] min-h-screen bg-[url('/herobg.jpg')] bg-cover  bg-no-repeat flex items-center overflow-hidden relative bg-[#ECFDF4] mb-12">
      <div className="w-[1320px] mx-auto px-4 sm:px-6  xl:px-0 ">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="max-w-[672px]">
            <div className="relative">
              <h1 className="text-3xl relative z-50 font-bold font-lexend text-[#333] leading-tight tracking-tight sm:text-4xl md:leading-[120%] lg:leading-[120%] md:text-5xl lg:text-[64px] mt-32 lg:mt-56">
                {columnFormatter(hero?.heading)}
              </h1>
              <Image
                src="/theme4/design.svg"
                width={214}
                height={23}
                alt="image"
                className="absolute top-32 right-32 hidden lg:block "
              ></Image>
            </div>

            <p className="mt-8 text-base leading-7 text-[#888AA0]">
              {columnFormatter(hero?.short_description)}
            </p>

            <div className="mt-8 flex gap-4 sm:gap-10 ">
              <Link href="/quote">
                <div className="flex items-center  gap-1 sm:gap-2 bg-[#31D692] hover:bg-[#0DBC79] duration-300 py-2 sm:py-4 px-4 sm:px-8 rounded-[10px]">
                  <p className="text-sm sm:text-lg font-medium text-[#fff] whitespace-pre">
                    Get a Quote
                  </p>
                  <FaLongArrowAltRight className="text-xl text-[#fff] flex items-center mt-1" />
                </div>
              </Link>
              <div className="flex items-center capitalize font-inter text-lg font-medium text-[#333]">
                <div
                  // onClick={showLoading}
                  onClick={() => setOpen(true)}
                  className=" flex items-center gap-2 cursor-pointer"
                >
                  <MdOutlineSlowMotionVideo className="text-3xl sm:text-4xl text-primary animate-blink" />
                  <p className="text-sm sm:text-lg font-medium  whitespace-pre">
                    Explore More
                  </p>
                </div>
                <Modal
                  title=" "
                  footer=" "
                  open={open}
                  onCancel={() => setOpen(false)}
                >
                  <iframe
                    className="w-full mt-6 h-64 sm:h-96"
                    src={hero?.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Modal>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-6 md::gap-8 justify-start items-center mt-14">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xl sm:text-2xl" />
                  <span className="text-gray-800 font-medium text-base sm:text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto ">
            <div className="">
              {hero?.image4 ? (
                <Image
                  src={hero?.image4} //""
                  width={550}
                  height={812}
                  loading="lazy"
                  alt="Hero"
                  className="mt-0 lg:mt-6  relative lg:-bottom-24 xl:-bottom-16 2xl:-right-10 w-[350px] sm:!w-[400px] xl:!w-[500px] h-[500px] sm:h-[600px]  lg:h-[702px] xl:h-[812px] "
                />
              ) : (
                <Image
                  src="/theme4/man.png"
                  width={550}
                  height={812}
                  loading="lazy"
                  alt="Hero"
                  className="mt-0 lg:mt-6  relative lg:-bottom-24 xl:-bottom-16 2xl:-right-10 w-[350px] sm:!w-[400px] xl:!w-[500px] h-[500px] sm:h-[600px]  lg:h-[702px] xl:h-[812px] "
                />
              )}
            </div>

            <div className="bg-white  shadow-md rounded-lg p-4 mx-auto animate-bounceUpDown  absolute right-0 sm:right-48 bottom-72 sm:bottom-96">
              <div className="flex items-center gap-4 text-xl ">
                <AiFillLike className="text-primary text-lg sm:text-xl" />
                <p className="text-[#333] font-medium text-base sm:text-lg">
                  99% Reviewed
                </p>
              </div>
            </div>
            <div className="bg-white animate-bounceLeftRight shadow-md rounded-lg p-4 sm:p-8 w-52 sm:w-64 mx-auto  absolute right-10 bottom-28">
              <p className="text-gray-500 text-sm mb-3">Social Media:</p>
              <div className="flex items-center gap-4 text-lg sm:text-xl">
                {social_media?.[2]?.link && (
                  <Link href={social_media[2].link}>
                    <BsInstagram className="cursor-pointer duration-300 hover:text-primary" />
                  </Link>
                )}
                {social_media?.[0]?.link && (
                  <Link href={social_media[0].link}>
                    <FaFacebookF className="cursor-pointer duration-300 hover:text-primary" />
                  </Link>
                )}
                {social_media?.[1]?.link && (
                  <Link href={social_media[1].link}>
                    <FaTwitter className="cursor-pointer duration-300 hover:text-primary" />
                  </Link>
                )}
                {social_media?.[3]?.link && (
                  <Link href={social_media[3].link}>
                    <FaLinkedinIn className="cursor-pointer duration-300 hover:text-primary" />
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-white shadow-md animate-bounceUpDown hidden sm:block lg:hidden xl:block rounded-lg p-4 mx-auto  absolute right-[400px] md:right-[500px] xl:right-[700px] bottom-40">
              <div className="flex items-center gap-4 text-xl">
                <FaCheckCircle className="text-primary text-xl" />
                <p className="text-[#333] font-medium text-lg">{review?.docs?.length} Reviews</p>
              </div>
            </div>
            <div className="bg-white p-6 hidden animate-bounceLeftRight rounded-xl shadow-md w-24 h-24 2xl:flex items-center justify-center absolute right-[700px] bottom-80">
              <Image
                src="/theme4/graph.svg"
                width={64}
                height={64}
                alt="graph"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero4;
