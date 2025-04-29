/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import MainLoader from "@/app/(dashboard)/components/common/loader";
import CaseStudyDetailsPage from "@/app/components/theme4/caseStudy/caseStudyDetails";
import CaseStudyDetailsPage4 from "@/app/components/theme4/caseStudy/caseStudyDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const CaseStudyDetails = () => {
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
            {activeTheme === "four" && (<CaseStudyDetailsPage4 />)}
            {activeTheme === "one" && (<CaseStudyDetailsPage />)}
            {activeTheme === "two" && (<CaseStudyDetailsPage />)}
            {activeTheme === "three" && (<CaseStudyDetailsPage />)}
          </div>
        )
      }
    </div>
  );
};

export default CaseStudyDetails;

