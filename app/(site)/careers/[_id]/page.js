/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import MainLoader from "@/app/(dashboard)/components/common/loader";
import CareersDetailsPage from "@/app/components/theme4/career/careerDetails";
import CareersDetailsPage4 from "@/app/components/theme4/career/careerDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const Careers = () => {
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
            {activeTheme === "four" && (<CareersDetailsPage4 />)}
            {activeTheme === "one" && (<CareersDetailsPage />)}
            {activeTheme === "two" && (<CareersDetailsPage />)}
            {activeTheme === "three" && (<CareersDetailsPage />)}
          </div>
        )
      }
    </div>
  );
};

export default Careers;


