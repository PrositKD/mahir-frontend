"use client";
import { useI18n } from "@/app/contexts/i18n";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const RoundCard = ({ item, theme }) => {
    const { langCode } = useI18n();
  return (
    <div className="shadow-custom-light bg-gray-gradient rounded-full mx-auto w-[270px] md:w-fit group">
      { item?.card_image && (
        <Image
        className="h-[370px] rounded-t-full"
        src={item?.card_image}
        width={1000}
        height={1000}
        alt="image"
      />
      )}
      
      <div className="pb-4">
        <h1 className="transform duration-300 heading-5 font-semibold my-4 md:my-4 lg:my-6 text-center text-textBody group-hover:text-primary">
          <Tooltip
            title={
              columnFormatter(item?.title)?.length > 18
                ? columnFormatter(item?.title)
                : undefined
            }
          >
            <span className="cursor-help">
              {item?.title[langCode]?.length > 18
                ? columnFormatter(item?.title)?.slice(0, 18) + "..."
                : columnFormatter(item?.title)}
            </span>
          </Tooltip>
        </h1>
        <Link href={`/service/${item?._id}`}>
          <GoArrowRight
            className={`transform duration-300 ${
              theme === "theme3"
                ? "group-hover:text-[#02050A] text-white group-hover:bg-primary"
                : "text-textMain group-hover:border-white"
            } border duration-100 border-primary text-4xl group-hover:shadow-custom-light rounded-full p-2 text-center mx-auto`}
          />
        </Link>
      </div>
    </div>
  );
};

export default RoundCard;
