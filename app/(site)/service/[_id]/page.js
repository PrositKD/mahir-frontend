/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ServiceDetailsPage4 from "@/app/components/theme4/service/serviceDetail4";
import ServiceDetailsPage from "@/app/components/theme4/service/serviceDetails";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const ServiceDetails = () => {
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
          {activeTheme === "four" && <ServiceDetailsPage4 />}
          {activeTheme === "one" && <ServiceDetailsPage />}
          {activeTheme === "two" && <ServiceDetailsPage />}
          {activeTheme === "three" && <ServiceDetailsPage />}
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
