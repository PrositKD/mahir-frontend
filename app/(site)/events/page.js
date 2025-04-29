/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import EventsPage from "@/app/components/theme4/event/event";
import EventsPage4 from "@/app/components/theme4/event/event4";
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
            {activeTheme === "four" && (<EventsPage4 />)}
            {activeTheme === "one" && (<EventsPage />)}
            {activeTheme === "two" && (<EventsPage />)}
            {activeTheme === "three" && (<EventsPage />)}
          </div>
        )
      }
    </div>
  );
};

export default CaseStudy;