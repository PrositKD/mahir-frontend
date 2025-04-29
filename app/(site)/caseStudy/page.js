/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import CaseStudyPage from "@/app/components/theme4/caseStudy/caseStudy";
import CaseStudyPage4 from "@/app/components/theme4/caseStudy/caseStudy4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const CaseStudy = () => {
  const [dataTheme, getDataTheme, { loading }] = useFetch(fetchPageContentTheme1, {
    status: true,
  });
  useEffect(() => {
    if (dataTheme)
      getDataTheme()
  }, [])
  const activeTheme = dataTheme?.theme;
  return (
    <div>
      {
        loading ? (
          <div className="flex items-center justify-center">
            <MainLoader />
          </div>
        ) : (
          <div>
            {activeTheme === "four" && (<CaseStudyPage4 />)}
            {activeTheme === "one" && (<CaseStudyPage />)}
            {activeTheme === "two" && (<CaseStudyPage />)}
            {activeTheme === "three" && (<CaseStudyPage />)}
          </div>
        )
      }
    </div>
  );
};

export default CaseStudy;