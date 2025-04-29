/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import Footer from "../components/site/layout/footer";
import Navbar from "../components/site/layout/navbar";
import I18nProvider from "../contexts/i18n";
import Providers from "../provider/userProvider";
import { fetchPageContentTheme1, fetchPublicSettings } from "../helper/backend";
import { useEffect, useState } from "react";
import { useFetch } from "../helper/hooks";
import axios from "axios";
import Footer4 from "../components/site/layout/footer4";
import { LayoutLoader } from "../(dashboard)/components/common/loader";
const Layout = ({ children }) => {
  const [setting, getSetting] = useFetch(fetchPublicSettings);
  const [data] = useFetch(fetchPageContentTheme1, { status: true });
  useEffect(() => {
    getSetting();
  }, []);

  const [dataTheme, getDataTheme] = useFetch(fetchPageContentTheme1, {
    status: true,
  });
  useEffect(() => {
    getDataTheme();
  }, [])
  const themeActive = dataTheme?.theme;
  //for env
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEnvFile = async () => {
      const { data } = await axios.get(
        process.env.backend_url + "api/v1/settings/env-checks"
      );
      if (data?.data?.status === true && data?.data?.env === false) {
        return router.push("/setting");
      }
    };
    checkEnvFile();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const theme = data?.theme || "one";
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isSetting = pathname === "/setting";

  // List of paths that require textMain color
  const textMainPaths = [
    "/payment/booking/stripe/success",
    "/payment/booking/paypal/success",
    "/payment/booking/razorpay/success",
    "/payment/product/stripe/success",
    "/payment/product/paypal/success",
    "/payment/product/razorpay/success",
    "/payment/failed",
  ];

  const isTextMain = isSetting || textMainPaths.includes(pathname);

  let bgColor = "bg-transparent";
  if (isHomepage && theme === "one") {
    bgColor = "bg-[#FFFFFF]";
  }
  if (isHomepage && theme === "two") {
    bgColor = "bg-[#070713]";
  }

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <LayoutLoader />
        </div>
      );
    }

  return (
    <div >
      <I18nProvider>
        <Providers>
          <Navbar
            bgColor={bgColor}
            textColor={
              isTextMain ||
                (isHomepage && (theme === "one" || theme === "four"))
                ? "text-textMain"
                : "text-[#ffffff]"
            }
            bgImage={setting?.site_logo || "/logo.png"}
            isHomepage={isHomepage}
          />
          {children}
          {themeActive === "four" && (<Footer4 />)}
          {themeActive === ("one" || "two" || "three") && (<Footer />)}
  
        </Providers>
      </I18nProvider>
    </div>
  );
};

export default Layout;
