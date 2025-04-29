/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import FAQPage from "@/app/components/theme4/faq/faq";
import FAQPage4 from "@/app/components/theme4/faq/faq4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const FAQ = () => {
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
          {activeTheme === "four" && <FAQPage4 />}
          {activeTheme === "one" && <FAQPage />}
          {activeTheme === "two" && <FAQPage />}
          {activeTheme === "three" && <FAQPage />}
        </div>
      )}
    </div>
  );
};

export default FAQ;
