/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MainLoader from "@/app/(dashboard)/components/common/loader";
import LoginPage from "@/app/components/theme4/login/login";
import LoginPage4 from "@/app/components/theme4/login/login4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";

const Login = () => {
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
          {activeTheme === "four" && <LoginPage4 />}
          {activeTheme === "one" && <LoginPage />}
          {activeTheme === "two" && <LoginPage />}
          {activeTheme === "three" && <LoginPage />}
         
        </div>
      )}
    </div>
  );
};

export default Login;
