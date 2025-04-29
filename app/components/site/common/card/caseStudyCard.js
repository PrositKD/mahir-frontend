"use client";
import { useI18n } from "@/app/contexts/i18n";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CaseStudyCard = ({ data }) => {
  const { langCode } = useI18n();
  return (
    <Link
      href={`/caseStudy/${data?._id}`}
      className="relative group overflow-hidden"
    >
      <div className="border border-primary/20 rounded md:p-4 p-3 shadow-custom-light">
        <Image
          width={500}
          height={500}
          className="w-[300px] h-[250px] object-fill"
          src={data?.card_image}
          alt="Image"
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#19B071] to-transparent transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-top-left"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-[#19B071] to-transparent transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-bottom-right"></div>
        </div>
        <p className="absolute inset-0 mx-8 flex items-center justify-center text-white description-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
        </p>{" "}
      </div>
    </Link>
  );
};

export default CaseStudyCard;
