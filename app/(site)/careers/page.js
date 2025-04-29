/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import CareersPage from "@/app/components/theme4/career/career";
import CareersPage4 from "@/app/components/theme4/career/career4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Career = () => {
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
            {activeTheme === "four" && (<CareersPage4 />)}
            {activeTheme === "one" && (<CareersPage />)}
            {activeTheme === "two" && (<CareersPage />)}
            {activeTheme === "three" && (<CareersPage />)}
          </div>
        )
      }
    </div>
  );
};

export default Career;
