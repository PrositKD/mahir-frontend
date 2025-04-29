import Expert1 from "@/app/components/home1/expert1";
import Partner from "@/app/components/home1/partner";
import About2 from "@/app/components/home2/about2";
import React from "react";

import CommonBanner from "../../common/commonBanner";
import Blogs2 from "@/app/(site)/allBlog/page";
import AboutSection from "../../home4/about4";
import Team4 from "../../home4/team4";
import Blog4 from "../../home4/blog4";

const AboutPage4 = () => {
  const userBackground = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(217, 217, 217, 0.10) 100%)",
    borderRadius: "100px",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 4px 25px -1px rgba(0, 0, 0, 0.20)",
    backdropFilter: "blur(50px)",
  };
  return (
    <div className="">
      <CommonBanner title="About" textTitle="text-primary" />
      <div className="flex flex-col ">
        <div className="-mt-12">
          <AboutSection bgColor="" aboutMore="false" />
        </div>
        <div className="mb-28 mt-10">
          <Partner
            bgColor="bg-[#ECFDF480]"
            theme="theme4"
            bgOpacity="opacity-50"
          />
        </div>
        <Team4 />
        <div className="mb-28 mt-20 bg-[#ECFDF480] py-12">
          <Blog4 />
        </div>
      </div>
    </div>
  );
};

export default AboutPage4;
