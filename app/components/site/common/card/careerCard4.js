"use client";
import React from "react";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import { columnFormatter } from "@/app/helper/utils";
import Link from "next/link";

const CareerCard4 = ({ data }) => {
  const formattedContext = columnFormatter(data?.job_context || "");
  const showTooltip = formattedContext.length > 200;

  return (
    <div className="bg-[#ECFDF4] border-[#E8EAE8] rounded-xl max-w-[424px] 2xl:h-[424px] lg:h-[524px] lg:p-10 md:p-8 sm:p-6 p-10 w-full shadow-md flex flex-col border">
      {/* Top content */}
      <div className="flex-grow">
        <p className="text-[#333] text-lg font-medium mb-2 capitalize">
          {data?.job_type}
        </p>
        <h3 className="text-lg sm:text-2xl font-semibold text-[#333] mb-3">
          {data?.job_position}
        </h3>
        {showTooltip ? (
          <Tooltip title={formattedContext}>
            <h3 className="description-2 text-[#888AA0] mb-3 cursor-pointer">
              {formattedContext.slice(0, 200)}...
            </h3>
          </Tooltip>
        ) : (
          <h3 className="description-2 text-[#888AA0] mb-3">
            {formattedContext}
          </h3>
        )}

        <p className="description-1 text-[#888AA0] leading-relaxed mb-5">
          {dayjs(data?.deadline).format("DD MMM YYYY")}
        </p>
      </div>

      {/* Button at bottom */}
      <Link href={`/careers/${data?._id}`} className="max-w-[158px]">
        <button className="bg-emerald-500 text-white px-6 description-1 py-3 sm:px-8 sm:py-4 rounded-md text-sm font-medium hover:bg-emerald-600 transition duration-300 w-full">
          Apply Now
        </button>
      </Link>
    </div>
  );
};

export default CareerCard4;
