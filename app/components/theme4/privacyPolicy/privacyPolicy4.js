"use client";
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import { fetchPageContent } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import React, { useEffect, useState } from "react";
import CommonBanner from "../../common/commonBanner";
const PrivacyPolicyPage4 = () => {
  const i18n = useI18n();
  const [data] = useFetch(fetchPageContent, {
    slug: "privacy_policy",
  });
  return (
    <div className="">
      <CommonBanner title={data?.content?.title} textTitle="text-primary" />
      <div className="agency-container">
        <p
          className="description text-[#333] pt-20 pb-20"
          dangerouslySetInnerHTML={{
            __html: columnFormatter(data?.content?.description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage4;