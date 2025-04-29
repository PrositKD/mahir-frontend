"use client";
import React, { useEffect } from "react";
import RoundCard2 from "../site/common/card/roundCard2";
import { useFetch } from "@/app/helper/hooks";
import { getAllPublicServices } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import { FcSelfServiceKiosk } from "react-icons/fc";

const Service2 = ({ theme }) => {
  const i18n = useI18n();
  const [services, getServices] = useFetch(getAllPublicServices, {
    limit: 4,
  });

  useEffect((services) => {
    getServices(services);
  }, []);
  return (
    <div className="agency-container 2xl:my-[130px] xl:my-[100px] lg:my-[80px] my-[60px] ">
      <div
        className={`flex justify-center items-center section-heading ${
          theme === "theme3" ? "text-white" : "text-[#02050A]"
        } gap-3 text-center mx-auto`}
      >
        {" "}
        <FcSelfServiceKiosk className="text-[28px]" />
        <p> {i18n.t("Our Service")} </p>{" "}
      </div>
      <h1 className="heading-2 mt-3 text-textMain text-center">
        {i18n.t("We provide best service")}{" "}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-32">
        {services?.docs?.map((item) => (
          <RoundCard2 key={item._id} item={item}></RoundCard2>
        ))}
      </div>
    </div>
  );
};

export default Service2;
