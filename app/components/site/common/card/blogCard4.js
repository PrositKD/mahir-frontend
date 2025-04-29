"use client";
import { useI18n } from "@/app/contexts/i18n";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import dayjs from 'dayjs'
import { FaAngleRight, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const BlogCard4 = ({ data, index, page }) => {
  const i18n = useI18n()
  const { langCode } = useI18n();
  const cardWidth =
    index === 1
      ? "w-full md:w-1/2" 
      : "w-full md:w-1/4";

  return (
    <div className={`group ${cardWidth}`}>
      <div
        className={`rounded-[10px] relative overflow-hidden`}
        style={
          index === 1
            ? {
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, #000 44.37%)",
            }
            : {}
        }
      >
        {
          index === 1 ? (
            <div>
              <Image
                width={500}
                height={500}
                className="w-full lg:h-[344px] sm:h-[312px] h-[250px] object-fill rounded-[20px] transition duration-500 opacity-50"
                src={data?.banner_image}
                alt="Image"
              />
              <div className="absolute flex flex-col justify-end inset-0 xl:p-6 lg:p-5 md:p-4 p-4">
                <h3 className="text-[#FFF] description-2">{dayjs(data?.createdAt).format("MMM D, YYYY")}</h3>
                <h3
                  className={`text-[#FFF] heading-5 transform-all duration-500 mt-3 group-hover:text-primary`}
                >
                  <Tooltip
                    title={
                      columnFormatter(data?.title)?.length > 30
                        ? columnFormatter(data?.title)
                        : undefined
                    }
                  >
                    <span className="cursor-help">
                      {data?.title[langCode]?.length > 30
                        ? columnFormatter(data?.title)?.slice(0, 30) + "..."
                        : columnFormatter(data?.title)}
                    </span>
                  </Tooltip>
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <h3 className="w-[60%] text-[#FFF] description-2 mt-4" >
                    <Tooltip
                      title={
                        columnFormatter(data?.short_description)?.length > 70
                          ? columnFormatter(data?.short_description)
                          : undefined
                      }
                    >
                      <span className="cursor-help">
                        {data?.short_description[langCode]?.length > 70
                          ? columnFormatter(data?.short_description)?.slice(0, 70) + "..."
                          : columnFormatter(data?.short_description)}
                      </span>
                    </Tooltip>
                  </h3>
                  <Link href={`blog/${data?._id}`} className="md:w-[30%] w-[40%] common-btn bg-[#31D692] hover:bg-[#0DBC79] duration-300 text-white flex items-center gap-2 description-1">
                    {i18n.t("Read More")}
                    <FaArrowRightLong className="text-base" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${page === 'blog' ? '' : "xl:p-6 lg:p-5 md:p-4 p-4"} `}>
              <h3 className="text-[#888AA0] description-2">{dayjs(data?.createdAt).format("MMM D, YYYY")}</h3>
              <h3 className={`text-[#333333] heading-5 transform-all duration-500 mt-4`}>
                <Tooltip
                  title={
                    columnFormatter(data?.title)?.length > 30
                      ? columnFormatter(data?.title)
                      : undefined
                  }
                >
                  <span className="cursor-help">
                    {data?.title[langCode]?.length > 30
                      ? columnFormatter(data?.title)?.slice(0, 30) + "..."
                      : columnFormatter(data?.title)}
                  </span>
                </Tooltip>
              </h3>
              <h3 className={`text-[#888AA0] description-2 mt-4`} >
                <Tooltip
                  title={
                    columnFormatter(data?.short_description)?.length > 75
                      ? columnFormatter(data?.short_description)
                      : undefined
                  }
                >
                  <span className="cursor-help">
                    {data?.short_description[langCode]?.length > 75
                      ? columnFormatter(data?.short_description)?.slice(0, 75) + "..."
                      : columnFormatter(data?.short_description)}
                  </span>
                </Tooltip>
              </h3>
              <Link href={`blog/${data?._id}`} className="group-hover:text-primary transform
              duration-300 xl:mt-12 lg:mt-10 md:mt-8 sm:mt-6 mt-5 flex items-center gap-2 description-1">
                {i18n.t("Read More")}
                <FaAngleRight />
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default BlogCard4;


