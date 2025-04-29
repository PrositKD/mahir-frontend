/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import TestimonialsPage from "@/app/components/theme4/testimonial/testimonial";
import TestimonialsPage4 from "@/app/components/theme4/testimonial/testimonial4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Testimonial = () => {
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
          {activeTheme === "four" && <TestimonialsPage4 />}
          {activeTheme === "one" && <TestimonialsPage />}
          {activeTheme === "two" && <TestimonialsPage />}
          {activeTheme === "three" && <TestimonialsPage />}
        </div>
      )}
    </div>
  );
};

export default Testimonial;
