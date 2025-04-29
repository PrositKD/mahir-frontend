/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import QuotePage from "@/app/components/theme4/quoate/quoate";
import QuotePage4 from "@/app/components/theme4/quoate/quoate4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Quoate = () => {
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
          {activeTheme === "four" && <QuotePage4 />}
          {activeTheme === "one" && <QuotePage />}
          {activeTheme === "two" && <QuotePage />}
          {activeTheme === "three" && <QuotePage />}
        </div>
      )}
    </div>
  );
};

export default Quoate;
