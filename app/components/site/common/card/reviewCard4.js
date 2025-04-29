import { Rate, Tooltip } from "antd";
import Image from "next/image";
import React from "react";

const ReviewCard4 = ({ data }) => {
  return (
    <div className="xl:p-5 lg:p-4 p-3 w-full border bg-[#ECFDF4] h-200px] md:h-[260px]  flex flex-col rounded-[20px]">
      <Rate className="text-primary text-sm lg:text-base" disabled value={data?.rating} allowHalf />
      <p className="mt-3 md:mt-3 lg:mt-5 text-[#333] description-1">
        {data?.comment?.length > 100 ? (
          <Tooltip title={data?.comment}>
            <span className="cursor-help">
              {data?.comment.slice(0, 100)}...
            </span>
          </Tooltip>
        ) : (
          data?.comment
        )}
      </p>
      <div className="flex-grow"></div>
      <div className="flex items-center xl:mt-10 lg:mt-8 md:mt-6 mt-5">
        {data?.user?.image ? (
          <Image
            className="w-14 h-14 object-fill bg-white border-[2px] border-primary rounded-full animate-rotate-border"
            src={data?.user?.image}
            width={1000}
            height={1000}
            alt="image"
          />
        ) : (
          <Image
            className="w-14 h-14 object-fill bg-white border-[2px] border-primary rounded-full animate-rotate-border"
            src="/man.png"
            width={1000}
            height={1000}
            alt="image"
          />
        )}

        <div className="ml-3">
          <h1 className="heading-5 !font-normal text-[#333333]">
            {data?.user?.name || "Unknown"}
          </h1>
          <h5 className="description-2 font-normal text-[#888AA0]">
            {data?.user?.country || "Anonymous"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard4;
