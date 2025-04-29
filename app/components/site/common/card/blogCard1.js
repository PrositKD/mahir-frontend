"use client";
import { columnFormatter } from "@/app/helper/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight, BsCalendar4Week } from "react-icons/bs";
import dayjs from "dayjs";
import { useI18n } from "@/app/contexts/i18n";
const BlogCard = ({
  item = {},
  radius = " ",
  color = "#02050A",
  userBackground,
  theme,
}) => {
  const i18n = useI18n();
  return (
    <div className="group w-full">
      <div className="relative w-full overflow-hidden group">
        {item?.card_image && (
          <Image
            className="w-full md:w-[424px] h-[250px] lg:h-[380px] object-cover"
            src={item?.card_image}
            width={424}
            height={380}
            alt="images"
          />
        )}

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div
          className={`
      absolute top-4 left-4 xl:px-7 xl:py-3 lg:px-6 lg:py-[10px] sm:px-5 px-4 py-2 
      duration-300 border border-white font-inter 
      shadow-[0px_4px_25px_-1px_rgba(0,0,0,0.20)] backdrop-blur-[25px] 
      group-hover:bg-[#55E6A5] group-hover:border-transparent group-hover:backdrop-blur-0 
      ${radius}
    `}
        >
          {columnFormatter(item?.category?.name)}
        </div>
      </div>
      <div
        className={`w-full relative border-[1px] ${
          theme === "theme3" ? `border-white/10 custom-bg` : " "
        } p-4 lg:p-8 md:p-5 duration-300 transition-all ease-in-out `}
      >
        <div
          style={theme === "theme3" ? userBackground : {}}
          className={`px-[10px] bg-white ${
            theme === "theme3" ? "z-50" : "z-10 "
          } py-2 flex items-center gap-4 rounded-full absolute -top-8 right-5`}
        >
          <h1 className={`pl-3 heading-5 !font-normal ${color}`}>
            {item?.author?.name}
          </h1>
          <Image
            className="rounded-full w-[50px] h-[50px] object-fill"
            src={item?.author?.image}
            width={50}
            height={50}
            alt="image"
          />
        </div>
        <div className="md:mt-6 md:text-sm lg:text-xl ">
          <div
            className={`flex flex-col lg:flex-row items-center justify-between mt-4 description-2 text-[#888AA0] !font-normal `}
          >
            <div className="flex items-center gap-2">
              <BsCalendar4Week
                className={`text-[#888AA0] ${
                  theme === "theme3" ? "group-hover:text-white" : ""
                }`}
              />
              <h3
                className={`text-[#888AA0] ${
                  theme === "theme3" ? "group-hover:text-white" : ""
                }`}
              >
                {dayjs(item?.createdAt).format("MMM DD, YYYY")}
              </h3>
            </div>
          </div>
          <h1
            className={`my-5 md:my-3 lg:my-5 heading-3 !font-medium group-hover:text-primary ${color}`}
          >
            {columnFormatter(item?.title)}
          </h1>
          <div className="flex items-center gap-2 mt-5 sm:mt-6 lg:mt-8 xl:mt-10">
            <Link
              href={`/blog/${item?._id}`}
              className="flex items-center group gap-4 description-1 font-normal"
            >
              <p
                className={`group-hover:text-primary group-hover:underline group-hover:decoration-primary ${color}`}
              >
                {i18n.t("Read more")}
              </p>
              <BsArrowRight className="hidden group-hover:block text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
