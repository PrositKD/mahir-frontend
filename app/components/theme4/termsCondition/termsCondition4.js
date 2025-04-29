'use client';
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import { fetchPageContent } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import React from "react";
import CommonBanner from "../../common/commonBanner";
const TermsConditionPage4 = () => {
  const i18n = useI18n();
  const [data] = useFetch(fetchPageContent, {
    slug: "terms_and_conditions",
  });
  return (
    <div className="">
      <CommonBanner title='Terms & Conditions' textTitle="text-primary" />
      <div className="agency-container">
        <p
          className="description text-[#333]  pt-20 pb-20"
          dangerouslySetInnerHTML={{
            __html: columnFormatter(data?.content?.description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default TermsConditionPage4;