"use client";
import React, { useState } from "react";
import {
  MdContactMail,
  MdContactPage,
  MdOutlineContactEmergency,
  MdPrivacyTip,
} from "react-icons/md";
import LandingPage from "./landingPage/page";
import AboutUs from "./aboutUs/page";
import ContactUs from "./contactUs/page";
import PrivacyPolicy from "./privacyPolicy/page";
import TermsCondition from "./termsCondition/page";
import { useI18n } from "@/app/contexts/i18n";
import { IoDocumentTextSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import BackButton from "@/app/(dashboard)/components/common/backButton";
const PageSettings = () => {
  const [tab, setTab] = useState(0);

  const i18n = useI18n();

  const methods = [
    {
      label: "Landing Page",
      icon: <MdOutlineContactEmergency />,
      form: <LandingPage slug={"landing-page"} />,
    },
    {
      label: "About Us",
      icon: <MdContactPage />,
      form: <AboutUs slug={"about-us"} />,
    },
    {
      label: "Contact Us",
      icon: <MdContactMail />,
      form: <ContactUs slug={"contact-us"} />,
    },
    {
      label: "Privacy & Policy",
      icon: <MdPrivacyTip />,
      form: <PrivacyPolicy slug={"privacy-policy"} />,
    },
    {
      label: "Terms & Condition",
      icon: <IoDocumentTextSharp />,
      form: <TermsCondition slug={"terms-condition"} />,
    },
  ];

  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded">
        <div className="flex justify-between px-8 pt-8 items-center">
          <h1 className="text-[#C7D1DA] text-3xl">Page Settings</h1>
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8 px-6">
          <div className="basis-3/12 rounded-lg">
            <div className="flex flex-col rounded-lg gap-y-2">
              {methods.map((method, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  className={`flex gap-x-4 items-center justify-start py-3 px-4 cursor-pointer rounded-lg hover:shadow-md border border-primary border-opacity-20 ${
                    tab === index
                      ? "bg-primary text-white shadow-md"
                      : " text-primary"
                  }`}
                  onClick={() => setTab(index)}
                >
                  <div>{method.icon}</div>
                  <div>{i18n?.t(method.label)}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="basis-9/12">{methods[tab].form}</div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
