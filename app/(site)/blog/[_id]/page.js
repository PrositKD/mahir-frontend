/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MainLoader from "@/app/(dashboard)/components/common/loader";
import BlogDetailsPage from "@/app/components/theme4/blog/blogDetails";
import BlogDetailsPage4 from "@/app/components/theme4/blog/blogDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const BlogDetails = () => {
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
            {activeTheme === "four" && (<BlogDetailsPage4 />)}
            {activeTheme === "one" && (<BlogDetailsPage />)}
            {activeTheme === "two" && (<BlogDetailsPage />)}
            {activeTheme === "three" && (<BlogDetailsPage />)}
          </div>
        )
      }
    </div>
  );
};

export default BlogDetails;
