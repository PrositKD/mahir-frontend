
"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import ExploreBtn from "../btn/ExploreBtn";
import { Modal, Rate } from "antd";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import LeftImageMotion from "@/app/helper/leftImageMotion";
import RightImageMotion from "@/app/helper/rightImageMotion";
import { useFetch } from "@/app/helper/hooks";
import {
  fetchPublicSettings,
  getAllPublicReviews,
} from "@/app/helper/backend";
import Link from "next/link";
import { columnFormatter } from "@/app/helper/utils";
import { useI18n } from "@/app/contexts/i18n";
import { RxVideo } from "react-icons/rx";
const Hero = ({
  textColor = "text-textMain",
  bgColor = "bg-[#FFFFFF]",
  theme,
  data: heroData,
}) => {
  const [setting] = useFetch(fetchPublicSettings);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const i18n = useI18n();
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const [review] = useFetch(getAllPublicReviews, { limit: 100 });
  const averageRating =
    review?.docs?.reduce((acc, curr) => acc + curr.rating, 0) /
    review?.docs?.length || 0;

  const hero = heroData?.content?.hero;
  return (
    <section
      className={`${bgColor} relative pb-0 -mt-20 md:mt-0 md:pb-12 lg:pb-0`}
    >
      <div className="!w-[300px] !h-[300px] absolute hidden 2xl:block right-0 -top-48">
        {bgColor === "bg-[#070713]" ? (
          <Image
            className="animate-blink"
            src="/BigStarB.png"
            width={300}
            height={300}
            alt="image"
          />
        ) : (
          <Image
            className="animate-blink"
            src="/Star.png"
            width={300}
            height={300}
            alt="image"
          />
        )}
      </div>
      <div className="agency-container mx-auto pt-14 pb-24">
        <div className="lg:flex md:flex md:gap-16 lg:gap-28 items-center pt-12">
          <div className="lg:w-3/5 md:w-1/2">
            <LeftImageMotion>
              <h1 className={`pt-12 md:pt-0 pb-5 heading-1 ${textColor}`}>
                {columnFormatter(hero?.heading)}
              </h1>
            </LeftImageMotion>
            <RightImageMotion>
              <p
                className={`banner_paragraph text-textBody lg:py-10 md:py-6 max-w-[672px]`}
              >
                {columnFormatter(hero?.short_description)}
              </p>
            </RightImageMotion>

            <div className="my-6 md:my-0">
              <ExploreBtn
                theme={theme}
                name={i18n.t("Get a Quote")}
                link="quote"
                iconColor="#32BA7D"
                textColor="#32BA7D"
              />
            </div>
            <div className="flex justify-start sm:justify-end pb-7 lg:pt-20">
              <div className="flex flex-col sm:flex-row justify-start relative">
                <div className="flex flex-wrap gap-2">
                  {review?.docs?.slice(0, 4).map((item, index) =>
                    item?.user?.image ? (
                      <Image
                        key={index}
                        className="rounded-full border-2 w-12 h-12 object-cover"
                        src={item?.user?.image || "/man.png"}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    ) : (
                      <Image
                        key={index}
                        className="rounded-full border-2 w-12 h-12 object-cover"
                        src="/man.png"
                        width={100}
                        height={100}
                        alt="image"
                      />
                    )
                  )}
                </div>
                <div className="flex flex-wrap justify-start sm:flex-col  sm:pl-32 gap-3 sm:gap-0 ">
                  <div className="">
                    <Rate disabled count={5} allowHalf value={averageRating} className="text-primary" />
                  </div>
                  <h3 className={`${textColor} description-2`}>
                    {averageRating.toFixed(1)} {i18n.t("review")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 md:w-1/2 relative overflow-x-hidden">
            <div onClick={showLoading} className="absolute right-16 top-6 cursor-pointer animate-bounce h-14 w-14 bg-primary rounded-full flex justify-center items-center">
              <RxVideo className="text-white heading-3" />
            </div>
            <Modal
              title=" "
              footer=" "
              open={open}
              onCancel={() => setOpen(false)}
            >
              {hero?.video?.includes("youtube.com") ||
                hero?.video?.includes("youtu.be") ? (
                <iframe
                  className="w-full mt-6 h-64 sm:h-96"
                  src={hero.video.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls className="w-full h-auto video">
                  <source src={hero?.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Modal>

            <div>
              {hero?.image1 && (
                <Image
                  className="w-2/4 md:w-2/3 mx-auto md:mx-0"
                  src={hero?.image1}
                  width={1000}
                  height={1000}
                  alt="image"
                />
              )}
            </div>
            <div className="absolute hidden xl:block bottom-10 md:bottom-[20%] -right-[36%] lg:-right-[8%]">
              {hero?.image2 && (
                <Image
                  className="w-1/3 lg:w-2/3 "
                  src={hero?.image2}
                  width={1000}
                  height={1000}
                  alt="image"
                />
              )}
            </div>
          </div>
        </div>
        <div className="lg:flex md:flex justify-evenly pt-12 items-center relative">
          {bgColor === "bg-[#070713]" ? (
            <Image
              className="hidden 2xl:block absolute -top-20 left-20 animate-blink"
              src="/StarB.png"
              width={150}
              height={150}
              alt="image"
            />
          ) : (
            <Image
              className="hidden 2xl:block absolute -top-20 left-20 animate-blink"
              src="/StarH.png"
              width={150}
              height={150}
              alt="image"
            />
          )}
          {hero?.image3 && (
            <Image
              className="z-20 hidden md:block"
              src={hero?.image3}
              width={300}
              height={300}
              alt="image"
              style={{ width: "auto", height: "auto" }}
            />
          )}

          <hr
            className={`${theme === "theme4" ? "text-Body_Text_Color" : "text-White_Color"
              } sm:px-10 mx-4 hidden md:block !w-0 md:max-w-60 lg:w-60`}
          />
          <p
            className="max-w-[580px] text-textBody"
            dangerouslySetInnerHTML={{
              __html: columnFormatter(hero?.description),
            }}
          />
          {bgColor === "bg-[#070713]" ? (
            <Image
              className="absolute top-0 -right-40 hidden 2xl:block animate-blink"
              src="/StarB.png"
              width={150}
              height={150}
              alt="image"
            />
          ) : (
            <Image
              className="absolute top-0 -right-40 hidden 2xl:block animate-blink"
              src="/StarH.png"
              width={150}
              height={150}
              alt="image"
            />
          )}
        </div>
        <div className=" hidden 2xl:block">
          <div
            className={`text-sm flex items-center justify-center flex-col absolute left-5 top-1/4 space-y-8
                ${theme === "theme4" ? "text-Primary_Color" : "text-White_Color"
              }
                `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="129"
              viewBox="0 0 8 129"
              fill="none"
            >
              <path
                d="M3.64644 128.354C3.8417 128.549 4.15829 128.549 4.35355 128.354L7.53553 125.172C7.73079 124.976 7.73079 124.66 7.53553 124.464C7.34027 124.269 7.02368 124.269 6.82842 124.464L3.99999 127.293L1.17157 124.464C0.976305 124.269 0.659723 124.269 0.464461 124.464C0.269198 124.66 0.269198 124.976 0.464461 125.172L3.64644 128.354ZM3.5 -2.18558e-08L3.49999 128L4.49999 128L4.5 2.18558e-08L3.5 -2.18558e-08Z"
                fill={textColor === "text-[#ffffff]" ? "#ffffff" : "#55E6A5"}
              />
            </svg>
            {setting?.social_media_link?.[0]?.link && (
              <Link href={setting?.social_media_link[0]?.link} target="_blank">
                <div className="flex justify-center items-center group flex-col duration-200">
                  <BiLogoFacebook
                    className={`${bgColor === "bg-[#070713]"
                      ? "text-[#ffffff]"
                      : "text-primary"
                      } text-xl cursor-pointer`}
                  />
                </div>
              </Link>
            )}
            {setting?.social_media_link?.[1]?.link && (
              <Link href={setting?.social_media_link[1]?.link} target="_blank">
                <div className="flex justify-center items-center group flex-col duration-200">
                  <FaTwitter
                    className={`${bgColor === "bg-[#070713]"
                      ? "text-[#ffffff]"
                      : "text-primary"
                      } text-lg cursor-pointer`}
                  />
                </div>
              </Link>
            )}
            {setting?.social_media_link?.[3]?.link && (
              <Link href={setting?.social_media_link[3]?.link} target="_blank">
                <div className="flex justify-center items-center flex-col group">
                  <FaLinkedinIn
                    className={`${bgColor === "bg-[#070713]"
                      ? "text-[#ffffff]"
                      : "text-primary"
                      } text-lg cursor-pointer`}
                  />
                </div>
              </Link>
            )}

            <div className="pt-5">
              <h1 className={`${textColor} rotate-90`}>{i18n.t("Follow US")}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
