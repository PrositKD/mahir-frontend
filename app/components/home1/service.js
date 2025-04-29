"use client";
import React, { useEffect } from "react";
import RoundCard from "../site/common/card/roundCard";
import Image from "next/image";

import { getAllPublicServices } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useI18n } from "@/app/contexts/i18n";
import { FcSelfServiceKiosk } from "react-icons/fc";

const Service = ({ theme }) => {
  const i18n = useI18n();
  const [services, getServices] = useFetch(getAllPublicServices, { limit: 4 });
  useEffect((services) => {
    getServices(services);
  }, []);

  return (
    <section className="relative">
      {theme === "theme3" ? (
        <div>
          <Image
            className="absolute -top-28 hidden xl:block right-0 xl:-left-10 2xl:left-16"
            src="/home3/s1.png"
            width={500}
            height={500}
            alt="shape"
          />
          <Image
            className="absolute -bottom-32 hidden xl:block xl:-right-20 2xl:right-16"
            src="/home3/s2.png"
            width={500}
            height={500}
            alt="shape"
          />
        </div>
      ) : (
        <br />
      )}
      <div className="relative z-10 agency-container">
        <div className={`flex justify-center items-center section-heading ${
          theme === "theme3" ? "text-white" : "text-[#02050A]"
        } gap-3 text-center mx-auto`}>  <FcSelfServiceKiosk className="text-[28px]" /><p> {i18n.t("Our Service")} </p> </div>
        <h1
          className={`mt-3 ${theme === "theme3" ? "text-white" : "text-textMain"
            } md:mb-6 mb-4 lg:mb-12 heading-2 text-center`}
        >
          {i18n.t("We provide best service")}
        </h1>

        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-20 gap-5">
          {services?.docs?.map((item) => (
            <RoundCard key={item._id} theme={theme} item={item} />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button onClick={() => { window.location.href = "/service" }} className="md:mt-10 mt-8 lg:mt-12 py-4 px-8 bg-primary text-white hover:bg-primary/80 hover:text-white/90 duration-300 rounded-[8px] text-xl"> Show More </button>
        </div>
      </div>
    </section>
  );
};

export default Service;
