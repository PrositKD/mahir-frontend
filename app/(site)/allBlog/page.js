"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useFetch } from "@/app/helper/hooks";
import { getPublicBlog } from "@/app/helper/backend";
import BlogCard from "@/app/components/site/common/card/blogCard1";
import { Empty } from "antd";
import { useI18n } from "@/app/contexts/i18n";
import { LiaBlogSolid } from "react-icons/lia";

const Blogs2 = ({ radius = "", color = "#02050A", theme, userBackground }) => {
  const i18n = useI18n();
  const [data, getData] = useFetch(getPublicBlog, { limit: 3 });
  useEffect(() => {
    getData({ is_latest: true });
  }, []);
  return (
    <section className="relative pb-10 sm:pb-14 md:pb-20 lg:pb-[100px]">
      {theme === "theme3" ? (
        <div>
          <Image
            className="absolute -top-20 hidden xl:block right-0 xl:-left-10 2xl:left-16 "
            src="/home3/bs2.png"
            width={500}
            height={500}
            alt="shape"
          />
          <Image
            className="absolute bottom-0 hidden xl:block xl:-right-20 2xl:right-16 "
            src="/home3/bs1.png"
            width={500}
            height={500}
            alt="shape"
          />
        </div>
      ) : (
        <br />
      )}
      <div className="agency-container z-10">
        <div className=" flex justify-start items-center section-heading text-textMain  gap-3 text-center mx-auto">
          {" "}
          <LiaBlogSolid className={`text-[28px] ${color}`} />
          <p className={`${color}`}> {i18n.t("Blogs")} </p>{" "}
        </div>
        {theme === "theme3" ? (
          <h1 className={`heading-2 mt-3 ${color} text-left`}>
            {i18n.t("Latest Articles &News from the Blogs")}
          </h1>
        ) : (
          <div className="flex justify-between items-center w-full gap-2">
            <h1 className={`heading-2 ${color}`}>
              {i18n.t("Latest Articles &News from the Blogs")}
            </h1>
            <Link
              href={"/blog"}
              className="flex items-center gap-2 justify-end text-[#888AA0] font-normal description-2 whitespace-pre -mt-4 sm:mt-0"
            >
              <span text={"text-black whitespace-pre"}>{(i18n.t("View More"))}</span>
              <FaArrowRightLong className="hidden sm:block text-black" />
            </Link>
          </div>
        )}

        <div className="relative z-10 mt-5 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-[60px]">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 lg:gap-12 gap-5">
            {data?.docs?.length > 0 ? (
              data?.docs?.map((item) => (
                <BlogCard
                  key={item._id}
                  item={item}
                  color={color}
                  radius={radius}
                  userBackground={userBackground}
                  theme={theme}
                />
              ))
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Empty className="mt-28" description="No Service Found" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs2;
