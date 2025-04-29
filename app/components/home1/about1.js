import React, { useEffect } from "react";
import Image from "next/image";
import ExploreBtn from "../btn/ExploreBtn";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Tooltip } from "antd";
import { useI18n } from "@/app/contexts/i18n";
import { FaInfoCircle } from "react-icons/fa";

const About = () => {
  const i18n = useI18n();
  const [heroData, getHeroData] = useFetch(fetchPageContentTheme1, {}, false);
  useEffect(() => {
    getHeroData({ theme: "one" });
  }, []);
  const about = heroData?.content?.about;
  const aboutDescription = columnFormatter(about?.about_description);
  const plainTextDescription = aboutDescription.replace(/<\/?[^>]+(>|$)/g, ""); 
  
  // Split words and count
  const words = plainTextDescription.split(/\s+/);
  const wordCount = words.length;
  
  const truncatedDescription =
    wordCount > 145 ? words.slice(0, 145).join(" ") + "..." : plainTextDescription;
  
  const contentToDisplay = wordCount > 145 ? (
    <Tooltip title={plainTextDescription}>
      <span>{truncatedDescription}</span>
    </Tooltip>
  ) : (
    <span>{truncatedDescription}</span>
  );

  return (
    <div className="relative agency-container overflow-x-hidden overflow-y-hidden">
      <div className="mx-auto relative">
        <div className="md:flex gap-6 xl:gap-0  justify-between ">
          <div className=" w-full lg:w-1/4">
            <div className="md:w-[600px] relative z-10 rounded-r-lg">
              <p className="section-heading text-textMain flex items-center gap-3"> <span className="text-[28px]"> <FaInfoCircle/></span> {i18n.t("About Us")}</p>
              <h1 className="heading-2  mt-3 text-textMain max-w-[390px]">
                {columnFormatter(about?.about_heading)}
              </h1>
            </div>
            <div className="rounded-r-xl">
              <p className="description-2 text-textBody pt-8 pb-8 w-full lg:w-[520px] xl:!w-[687px]">
                {contentToDisplay}
              </p>
            </div>
            <div className="rounded-full -py-4 p-4 overflow-hidden">
              <ExploreBtn
                theme="theme1"
                link="about"
                iconColor="#32BA7D"
                textColor="#32BA7D"
              />
            </div>
          </div>
          <div className="relative hidden xl:block !w-[987px] h-[509px]">
            { about?.image && (
              <Image
                className=" rounded-l-lg"
                src={about?.image}
                alt="about"
                height={509}
                width={987}
              />
            )}
          </div>
          <div className="relative hidden left-10 lg:block xl:hidden   max-w-[500px]  !h-[609px] mt-36">          
              <Image
                className="rounded-l-lg"
                src="/about2.png"
                alt="about"
                height={509}
                width={987}
              />
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
