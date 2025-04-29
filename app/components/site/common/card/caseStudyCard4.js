"use client";
import { useI18n } from "@/app/contexts/i18n";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CaseStudyCard4 = ({ data }) => {
  const { langCode } = useI18n();

  return (
    <Link href={`/caseStudy/${data?._id}`} className="group block">
      <div className="relative rounded-[10px] overflow-hidden">
        <Image
          width={500}
          height={500}
          className="w-full lg:h-[414px] sm:h-[312px] h-[250px] object-cover"
          src={data?.card_image}
          alt="Image"
        />
        
        {/* Overlay for gradient and text */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h4 className="description-1 text-white font-semibold">
            {columnFormatter(data?.category?.name)}
          </h4>
          <h3 className="text-white heading-3 whitespace-pre font-medium mt-2 group-hover:text-primary transition-all duration-500">
            <Tooltip
              title={
                columnFormatter(data?.title)?.length > 10
                  ? columnFormatter(data?.title)
                  : undefined
              }
            >
              <span className="cursor-help">
                {data?.title[langCode]?.length > 20
                  ? columnFormatter(data?.title)?.slice(0, 20) + "..."
                  : columnFormatter(data?.title)}
              </span>
            </Tooltip>
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard4;
