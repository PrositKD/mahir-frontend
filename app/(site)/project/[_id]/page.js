/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ProjectDetailsPage from "@/app/components/theme4/product/productDetails";
import ProjectDetailsPage4 from "@/app/components/theme4/product/productDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const ProjectDetails = () => {
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
          {activeTheme === "four" && <ProjectDetailsPage4 />}
          {activeTheme === "one" && <ProjectDetailsPage />}
          {activeTheme === "two" && <ProjectDetailsPage />}
          {activeTheme === "three" && <ProjectDetailsPage />}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
