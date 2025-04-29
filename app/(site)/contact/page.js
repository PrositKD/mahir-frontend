/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ContactPage from "@/app/components/theme4/contact/contact";
import ContactPage4 from "@/app/components/theme4/contact/contact4";
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
            {activeTheme === "four" && (<ContactPage4 />)}
            {activeTheme === "one" && (<ContactPage />)}
            {activeTheme === "two" && (<ContactPage />)}
            {activeTheme === "three" && (<ContactPage />)}
         
          </div>
        )
      }
    </div>
  );
};

export default CaseStudy;