"use client";
import { useI18n } from "@/app/contexts/i18n";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

const ServiceCard4 = ({ data }) => {
  const i18n = useI18n();
  const fullText = columnFormatter(data?.short_description || "");
  const showTooltip = fullText.length > 150;
  const displayText = fullText.slice(0, 150);

  return (
    <div className="w-full sm:max-w-[424px] bg-white rounded-[20px] shadow-md overflow-hidden border group flex flex-col">
      <div className="rounded-t-[20px] overflow-hidden">
        <Image
          src={data?.card_image}
          alt="App Development"
          className="w-full h-[340px] object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="heading-3 transform duration-300 group-hover:text-primary mb-2">{columnFormatter(data?.title)}</h3>

        {showTooltip ? (
          <Tooltip title={fullText}>
            <p className="description-1 text-[#888AA0] md:mt-3 mt-2 cursor-pointer">
              {displayText}...
            </p>
          </Tooltip>
        ) : (
          <p className="description-1 text-[#888AA0] md:mt-3 mt-2">
            {fullText}
          </p>
        )}
      </div>
      <div className="px-6 pb-6  ">
        <Link href={`/service/${data?._id}`}>
          <button className="px-8 py-4  bg-[#31D692] group-hover:bg-[#0DBC79] text-white rounded-lg text-base font-medium transition duration-300">
            {i18n.t("View Details")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard4;
