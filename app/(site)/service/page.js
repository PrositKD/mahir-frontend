/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ServicePage from "@/app/components/theme4/service/service";
import ServicePage4 from "@/app/components/theme4/service/service4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Service = () => {
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
          {activeTheme === "four" && <ServicePage4 />}
          {activeTheme === "one" && <ServicePage />}
          {activeTheme === "two" && <ServicePage />}
          {activeTheme === "three" && <ServicePage />}
        </div>
      )}
    </div>
  );
};

export default Service;
