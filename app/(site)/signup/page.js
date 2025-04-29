/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import SignUpPage from "@/app/components/theme4/signup/signup";
import SignUpPage4 from "@/app/components/theme4/signup/signup4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const SignUp = () => {
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
          {activeTheme === "four" && <SignUpPage4 />}
          {activeTheme === "one" && <SignUpPage />}
          {activeTheme === "two" && <SignUpPage />}
          {activeTheme === "three" && <SignUpPage />}
        </div>
      )}
    </div>
  );
};

export default SignUp;
