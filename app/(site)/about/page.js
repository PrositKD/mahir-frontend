/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import AboutPage from "@/app/components/theme4/about/about";
import AboutPage4 from "@/app/components/theme4/about/about4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const About = () => {
  const [dataTheme, getDataTheme, { loading }] = useFetch(fetchPageContentTheme1, {
    status: true,
  });
  useEffect(() => {
    if (dataTheme)
      getDataTheme()
  }, [])
  const activeTheme = dataTheme?.theme;
  console.log("🚀 ~ About ~ activeTheme:", activeTheme)

  return (
    <div>
      {
        loading ? (
          <div className="flex items-center justify-center">
            <MainLoader />
          </div>
        ) : (
          <div>
            {activeTheme === "four" && (<AboutPage4 />)}
            {activeTheme === "one" && (<AboutPage />)}
            {activeTheme === "two" && (<AboutPage />)}
            {activeTheme === "three" && (<AboutPage />)}
           
          </div>
        )
      }
    </div>
  );

};

export default About;