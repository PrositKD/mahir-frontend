/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FaArrowRight } from "react-icons/fa";
import SectionHeader from "../common/sectionHeader";
import Image from "next/image";
import { useI18n } from "@/app/contexts/i18n";
import Link from "next/link";
import { useEffect } from "react";
import { useFetch } from "@/app/helper/hooks";
import { fetchPageContent } from "@/app/helper/backend";
import { columnFormatter } from "@/app/helper/utils";

const AboutSection = ({ bgColor = "bg-[#ECFDF4]", aboutMore }) => {
  const i18n = useI18n();
  const [data, getData, loading] = useFetch(fetchPageContent, {}, false);
  useEffect(() => {
    getData({ slug: "about" });
  }, []);

  return (
    <section className={`${bgColor}  py-20 mt-12`}>
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col-reverse md:flex-row gap-6 items-center">
        {/* Left: Images */}
        <div className="flex flex-row gap-4  relative w-full !mx-auto justify-center md:justify-start mt-6 md:mt-0">
          <div className="flex flex-col space-y-4">
            {data?.content?.image1 ? (
              <Image
                src={data?.content?.image1}
                alt="Team 1"
                className="rounded-lg w-[270px] h-[240px] object-cover"
                width={270}
                height={240}
              />
            ) : (
              <Image
                src="/home4/2.png"
                alt="Team 2"
                className="rounded-lg w-[270px] h-[240px] object-cover"
                width={270}
                height={240}
              />
            )}
            {data?.content?.image2 ? (
              <Image
                src={data?.content?.image2}
                alt="Team 1"
                className="rounded-lg w-[270px] h-[240px] object-cover"
                width={270}
                height={240}
              />
            ) : (
              <Image
                src="/home4/3.png"
                alt="Team 2"
                className="rounded-lg w-[270px] h-[240px] object-cover"
                width={270}
                height={240}
              />
            )}
          </div>
          <div className="w-[270px] h-[498px]">
            {data?.content?.image ? (
              <Image
                src={data?.content?.image}
                alt="Team 1"
                className="rounded-lg w-[270px] h-[498px] object-cover"
                width={270}
                height={498}
              />
            ) : (
              <Image
                src="/home4/1.png"
                alt="Team 1"
                className="rounded-lg w-[270px] h-[498px] object-cover"
                width={270}
                height={498}
              />
            )}
          </div>
          <div className="absolute hidden xl:block -right-[110px] top-[198px] rounded-[30px]  z-50 -translate-y-1/2 bg-[#0DBC79] text-white text-center font-semibold text-lg p-[15px] rotate-[-270deg] border-[4px] border-white">
            <div className=" text-[#ECFDF4] items-center justify-center text-3xl lg:text-[56px] font-bold">
              {data?.content?.experience?.year_experiences}+{" "}
              <span className="description-1 relative bottom-3">
                Year Of Working Experience{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="md:-ml-[54px] flex md:block items-center justify-center md:items-start md:justify-start">
            <SectionHeader
              align="left"
              maxWidth="max-w-[70px]"
              title="About US"
            />
          </div>
          <h2 className="text-3xl text-center md:text-left font-lexend md:text-4xl -mt-4 lg:text-[48px] font-bold mb-4 text-[#333] lg:leading-[110%]">
            {i18n.t(data?.content?.title)}
          </h2>
          <p
            className="description-2 text-[#888AA0]"
            dangerouslySetInnerHTML={{
              __html: columnFormatter(data?.content?.description),
            }}
          ></p>
          {!aboutMore && (
            <Link
              href="/about"
              className="inline-flex text-lg mt-4 items-center text-[#0DBC79] font-semibold hover:underline"
            >
              About More <FaArrowRight className="ml-2 text-[#0DBC79]" />
            </Link>
          )}

          {/* Bottom Info Cards */}
          <div className="mt-14 flex  flex-row justify-between gap-4">
            <div className="flex gap-2 lg:gap-4 items-center">
              {data?.content?.project?.iconImg1 && (
                <Image
                  className="sm:w-14 w-12 h-12 sm:h-14"
                  src={data?.content?.project?.iconImg1 || "/about/star.png"}
                  width={80}
                  height={80}
                  alt="image"
                />
              )}

              <div>
                <h1 className="text-2xl lg:text-[32px] text-[#333] font-semibold">
                  {data?.content?.project?.num_projects}+
                </h1>
                <h4 className="description-1 text-[#333] font-normal">
                  {i18n.t("Project Complete")}
                </h4>
              </div>
            </div>
            <div className="border-l hidden sm:block border-l-[#4DB49C]" />
            <div className="flex gap-2 lg:gap-4 items-center ">
              <div>
                {data?.content?.experience?.iconImg2 && (
                  <Image
                    className="sm:w-14 w-12 h-12 sm:h-14"
                    src={
                      data?.content?.experience?.iconImg2 || "/about/man.png"
                    }
                    width={80}
                    height={80}
                    alt="image"
                  />
                )}
              </div>
              <div className="">
                <h1 className="text-2xl lg:text-[32px] text-[#333] font-semibold">
                  {data?.content?.experience?.year_experiences}+
                </h1>
                <h4 className="description-1 text-[#333] font-normal">
                  {i18n.t("Years of Experiences")}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
