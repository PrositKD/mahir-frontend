/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useI18n } from "@/app/contexts/i18n";
import {
  fetchPublicSettings,
  postNewsletterList,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Divider, Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const i18n = useI18n();
  const [form] = Form.useForm();
  const [setting] = useFetch(fetchPublicSettings);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentYear(new Date().getFullYear());
    }
  }, []);

  const handleSubmit = async (values) => {
    await useAction(postNewsletterList, values, null, true);
    form.resetFields();
  };

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/service" },
    { name: "Team", link: "/team" },
    { name: "Condition", link: "/termsCondition" },
    { name: "Privacy", link: "/privacyPolicy" },
  ];

  const navIcons = [
    {
      icon: FaLinkedinIn,
      link: `${setting?.social_media_link?.[3]?.link || "/"}`,
    },
    {
      icon: FaInstagram,
      link: `${setting?.social_media_link?.[2]?.link || "/"}`,
    },
    {
      icon: FaFacebookF,
      link: `${setting?.social_media_link?.[0]?.link || "/"}`,
    },
    {
      icon: FaTwitter,
      link: `${setting?.social_media_link?.[1]?.link || "/"}`,
    },
  ];

  return (
    <div
      className="bg-[#0A1019] text-white text-center bg-cover bg-center "
      style={{ backgroundImage: "url('/footer/footer.png')" }}
    >
      <div className="relative text-2xl font-bold pt-16 sm:pt-[100px] lg:pt-[120px] xl:pt-[150px]">
        <Image
          className="hidden 2xl:block absolute top-0 right-0"
          src="/footer/circle.png"
          alt="Circle"
          width={149}
          height={127}
        />
        <Image
          className="hidden 2xl:block absolute bottom-0 left-0"
          src="/footer/circle.png"
          alt="Circle"
          width={146}
          height={123}
        />
        <div className="max-w-[821px] mx-auto px-4">
          <div className="mx-auto mt-5 w-full">
            <form
              form={form}
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                handleSubmit({ body: { email } });
                e.target.reset();
              }}
            >

              <input
                type="email"
                name="email"
                placeholder={i18n?.t("Your Email")}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    i18n?.t("Please enter a valid email address")
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                className="w-full border-b border-white/30 focus:outline-none focus:ring-0 focus:border-t-transparent bg-transparent description-1 px-1 py-2 sm:py-3 lg:py-4"
              />

              <button className="bg-primary text-[#02050A] common-btn lg:mt-6 md:mt-5 sm:mt-4 mt-3 cursor-pointer">
                {i18n?.t("Subscribe")}
              </button>
            </form>
          </div>
          <div className="grid grid-cols-5 xl:gap-[120px] lg:gap-[100px] sm:gap-12 gap-4 xl:mt-20 lg:mt-16 sm:mt-12 mt-8 xl:px-9 lg:px-8 sm:px-6 px-4">
            {navLinks.map((link, index) => (
              <div key={index} className=" text-[#888AA0] description-1">
                <Link href={link.link} rel="noopener noreferrer">
                  {i18n?.t(link.name)}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Divider className="bg-white" />
        <div className="-mt-6 xl:py-10 lg:py-8 sm:py-6 py-5 max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between">
          <Image
            className=""
            src={setting?.site_logo || "/logo.png"}
            alt="logo"
            width={168}
            height={44}
          />
          <div className="flex gap-2 sm:gap-[13px] justify-center mt-3 sm:mt-0">
            {navIcons.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent className="text-[#888AA0] text-[12px] sm:text-xl lg:text-2xl hover:text-primary transition-all duration-300" />
                </Link>
              );
            })}
          </div>
          <p className="text-[#888AA0] description-2 mt-3 sm:mt-0">
            Copyright © {currentYear || new Date().getFullYear()} All rights
            reserved | Developed By <Link href="www.zaman-it.com">ZAMAN IT</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
