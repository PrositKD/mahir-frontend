/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ForgetPasswordPage from "@/app/components/theme4/forgetPassword/forgetPassword";
import ForgetPasswordPage4 from "@/app/components/theme4/forgetPassword/forgetPassword4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const ForgetPassword = () => {
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
          {activeTheme === "four" && <ForgetPasswordPage4 />}
          {activeTheme === "one" &&  <ForgetPasswordPage />}
          {activeTheme === "two" &&  <ForgetPasswordPage />}
          {activeTheme === "three" &&  <ForgetPasswordPage />}
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
