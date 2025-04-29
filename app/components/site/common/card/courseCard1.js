import { Color } from "antd/es/color-picker";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GoArrowRight } from "react-icons/go";

const CourseCard = ({ product = {}, color, theme }) => {
  const { image, title, _id } = product || {};

  return (
    <div className="group opacity-100 border border-black/5 shadow-[4px_4px_20px_0px_rgba(0,0,0,0.05)] rounded-md overflow-hidden">
      <Image
        className="w-full sm:w-[512px] h-[244px]"
        src={image}
        width={1000}
        height={1000}
        alt="image"
      />
      <div className={`p-6 border border-t-0 border-white/10 ${theme === 'theme3' ? 'custom-bg' : ''}`}>
        <div className="flex justify-between items-center">
          <div className="text-xl flex items-center gap-2">
            <AiFillStar className="text-[#D5CF47]" />{" "}
            <span className={`description-3 text-[#888AA0] ${theme === 'theme3' ? 'group-hover:text-white' : ''}`}>4.8</span>
          </div>
          <p
            className={`shadow-custom-light ${theme === 'theme2' ? 'bg-primary' : theme === 'theme3' ? 'border border-primary ' : ''}  text-${color} font-semibold desertion-1 rounded-md px-5 py-[10px]`}
          >
            $100
          </p>
        </div>

        <div className="mt-2 text-start py-2">
          <p className={`group-hover:text-primary heading-4 font-medium translate-transform duration-300 text-${color}`}>
            {title}
          </p>
          <hr className="mt-2 border-White_Color border-opacity-10" />
          <div className="mt-4 pt-2 flex items-center justify-between">
            <div>
              <p className={`description-1 font-normal text-[#888AA0] ${theme === 'theme3' ? 'group-hover:text-white' : ''}`}>
                20+ Course
              </p>
            </div>
            <Link
              href={`/coursesDetails?_id=${_id}`}
              className={`w-12 h-12 flex justify-center items-center duration-300 rounded-full ${theme === "theme3"
                  ? "group-hover:bg-primary border border-primary"
                  : "group-hover:shadow-custom-light"
                }`}
            >
              <GoArrowRight className={`text-xl ${theme === 'theme3' ? 'text-white group-hover:text-black': ''}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
