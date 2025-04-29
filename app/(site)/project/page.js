"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ProjectPage from "@/app/components/theme4/product/product";
import ProjectPage4 from "@/app/components/theme4/product/product4";
import {
  fetchPageContentTheme1,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const Project = () => {
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
          {activeTheme === "four" && <ProjectPage4 />}
          {activeTheme === "one" && <ProjectPage />}
          {activeTheme === "two" && <ProjectPage />}
          {activeTheme === "three" && <ProjectPage />}
        
        </div>
      )}
    </div>
  );
};

export default Project;
