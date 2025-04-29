import { useI18n } from "@/app/contexts/i18n";
import { Rate, Tooltip } from "antd";
import Image from "next/image";
import React from "react";

const ReviewCard1 = ({ item = {} }) => {
  const i18n = useI18n();
  return (
    <div className="pt-10 w-full">
      <div className='bg-[url("/review1/Vector-7.png")] bg-[length:100%_100%] lg:pb-8 pb-12 bg-no-repeat w-full !h-[250px]'>
        <div className="text-[#888AA0] relative p-5 md:p-8 lg:p-10">
          <Image
            className="w-14 absolute -top-5 lg:-top-8 px-2 lg:px-0 sm:left-8 lg:left-[30px] xl:left-[45px] bg-white"
            src="/review1/quote.png"
            width={1000}
            height={1000}
            alt="image"
          />
          <div className="flex items-center gap-2 mt-4 mb-4">
            <div className="">
              <Rate
                className="text-[#D5CF47] text-base"
                disabled
                count={5}
                defaultValue={item?.rating}
              />
            </div>
            <h1 className="description-3 text-[#888AA099]">
              ({item.rating} {i18n.t("Rating")})
            </h1>
          </div>
          <Tooltip
            title={item?.comment?.length > 80 ? item?.comment : undefined}
          >
            <p className="cursor-help">
              {item?.comment?.length > 80
                ? item?.comment.slice(0, 80) + "..."
                : item?.comment}
            </p>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-center ml-5 lg:ml-12 mt-3">
        {item?.user?.image ? (
          <Image
            className="w-20 h-20 object-fill bg-white border-[2px] border-primary rounded-full animate-rotate-border"
            src={item?.user?.image}
            width={1000}
            height={1000}
            alt="image"
          />
        ) : (
          <Image
            className="w-20 h-20 object-fill bg-white border-[2px] border-primary rounded-full animate-rotate-border"
            src="/man.png"
            width={1000}
            height={1000}
            alt="image"
          />
        )}

        <div className="ml-3">
          <h1 className="heading-3 font-medium text-[#02050A]">
            {item?.user?.name || "Unknown"}
          </h1>
          <h5 className="description-2 font-normal text-[#888AA0]">
            {item?.user?.country || "Anonymous"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard1;
