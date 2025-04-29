"use client";
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import { fetchPageContent } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import React, { useEffect, useState } from "react";
const PrivacyPolicyPage = () => {
  const i18n = useI18n();
  const [data] = useFetch(fetchPageContent, {
    slug: "privacy_policy",
  });
  return (
    <div className="bg-[#0F172A]">
      <Banner title={data?.content?.title} />
      <div className="agency-container">
        <p
          className="description text-[#888AA0] pt-20 pb-40"
          dangerouslySetInnerHTML={{
            __html: columnFormatter(data?.content?.description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;