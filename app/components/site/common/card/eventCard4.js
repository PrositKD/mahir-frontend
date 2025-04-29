import { columnFormatter } from "@/app/helper/utils";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const EventCard4 = ({ data, slug }) => {
  return (
    <div className=" p-3 xl:p-6 hover:rounded-xl  hover:shadow-lg transition-all duration-300 border-b-[1px] border-[#E8EAE8] mt-6">
        <div className="flex flex-col md:flex-row gap-3 xl:gap-6 items-start mb-10 ">
      {/* Date */}
      <div className="flex flex-col justify-center min-w-[70px]">
        <p className="text-xl font-semibold text-[#333] font-inter">
          {dayjs(data?.date).format("MMM")}
        </p>
        <div className="w-[24px] h-[4px] bg-[#4DB49C] -mt-1" />
        <p className="heading-2 !font-lexend mt-3 font-bold">
          {dayjs(data?.date).format("DD")}{" "}
          <span className="text-[#888AA0] text-base -ml-2 font-inter">
            {" "}
            | {dayjs(data?.date).format("YYYY")}
          </span>{" "}
        </p>
      </div>

      {/* Image */}
      <div className="w-full sm:w-[500px] md:w-[300px] lg:w-[450px] xl:w-[650px] 2xl:w-[760px] xl:h-[420px] lg:h-[420px] md:!h-[420px] h-[250px]">
        <Image
          className="w-full xl:h-[420px] lg:h-[320px] md:!h-[420px] sm:h-[220px] h-[200px] object-fill rounded-[20px]"
          src={data?.image}
          width={1000}
          height={1000}
          alt="image"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="heading-9 font-semibold text-[#333] -mt-2 !font-lexend">
          {columnFormatter(data?.title)}
        </h3>
        <p className="text-lg text-[#888AA0] font-medium mb-2 capitalize">
          {data?.location} | {dayjs(data?.date).format("hh:mm A")}
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: columnFormatter(data?.description),
          }}
          className="xl:mt-6  mt-4 description-2 text-[#888AA0] font-normal leading-6"
        ></p>

        <Divider className="my-6 text-[#E8EAE8]" />
        <button className="flex items-center  hover:text-[#0DBC79] text-[#31D692] text-base font-semibold hover:underline">
          <Link href={`/events/${data?._id}`}>View Event Details </Link>{" "}
          <FaArrowRightLong className="ml-1 text-[#0DBC79]" />
        </button>
      </div>
      </div>

    </div>
  );
};

export default EventCard4;
