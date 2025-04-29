/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import TermsConditionPage from "@/app/components/theme4/termsCondition/termsCondition";
import TermsConditionPage4 from "@/app/components/theme4/termsCondition/termsCondition4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const PrivacyPolicy = () => {
  const [dataTheme, getDataTheme, { loading }] = useFetch(
    fetchPageContentTheme1,
    {
      status: true,
    }
  );
  useEffect(() => {
    if (dataTheme) getDataTheme();
  }, []);
  const activeTheme = dataTheme?.theme;
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        <div>
          {activeTheme === "four" && <TermsConditionPage4 />}
          {activeTheme === "one" && <TermsConditionPage />}
          {activeTheme === "two" && <TermsConditionPage />}
          {activeTheme === "three" && <TermsConditionPage />}
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
