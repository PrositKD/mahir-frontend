/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import BlogPage from "@/app/components/theme4/blog/blog";
import BlogPage4 from "@/app/components/theme4/blog/blog4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Blog = () => {
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
            {activeTheme === "four" && (<BlogPage4 />)}
            {activeTheme === "one" && (<BlogPage />)}
            {activeTheme === "two" && (<BlogPage />)}
            {activeTheme === "three" && (<BlogPage />)}
           
          </div>
        )
      }
    </div>
  );
};

export default Blog;