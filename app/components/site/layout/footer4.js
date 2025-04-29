/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useI18n } from "@/app/contexts/i18n";
import { fetchPublicSettings, postNewsletterList } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer4 = () => {
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
   const navLinks1 = [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Contact", link: "/contact" },
      { name: "Services", link: "/service" },
      { name: "Event", link: "/events" },
      { name: "Product", link: "/project" },
   ]
   const navLinks2 = [
      { name: "Case Study", link: "/caseStudy" },
      { name: "Blog", link: "/blog" },
      { name: "Career ", link: "/careers" },
      { name: "Team", link: "/team" },
      { name: "FAQ", link: "/faq" },
      { name: "Testimonial", link: "/testimonials" },
   ]
   const navLinks3 = [
      { name: "Privacy Policy", link: "/privacyPolicy" },
      { name: "Terms & Conditions", link: "/termsCondition" },
      { name: "Quote", link: "/quote" },
      { name: "Job ", link: "/careers" },
      { name: "Gallery", link: "/imageGallery" },
      { name: "Video", link: "/videoGallery" },
   ]
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
      <div className="bg-[#ECFDF4] w-full xl:pt-10 lg:pt-9 md:pt-7 pt-5 pb-1">
         <div className="agency-container">
            <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-0">
               <div className="w-full sm:w-[45%]">
                  <Image
                     className=""
                     src={setting?.site_logo || "/logo.png"}
                     alt="logo"
                     width={168}
                     height={44}
                  />
                  {/* <p className="description-2 !font-normal mt-4 text-[#525F7A] md:max-w-[302px]">{setting?.site_description}</p> */}
                  <p className="description-2 !font-normal mt-4 text-[#525F7A] md:max-w-[302px]">Cras at luctus nisl. Donec euismtirus tortor eu justo gravida finibus lectus.</p>
                  <div className="xl:mt-7 lg:mt-6 md:mt-5 mt-4">
                     <form
                        className="w-full md:max-w-[302px]"
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
                           className="w-full border border[#DDE0EB] p-3 rounded-md focus:outline-none focus:ring-0 bg-transparent description-2"
                        />

                        <button className="bg-primary w-full text-[#FFFFFF] common-btn md:mt-4 mt-3 cursor-pointer">
                           {i18n?.t("Subscribe")}
                        </button>
                     </form>
                  </div>
               </div>
               <div className="w-full sm:w-[55%] mt-5 sm:mt-0">
                  <div className="flex justify-between ">
                     {/* first part */}
                     <div>
                        <h3 className="heading-5 text-[#333] !font-medium">Pages</h3>
                        <ul className="xl:mt-8 lg:mt-7 md:mt-6 mt-5">
                           {navLinks1?.map((item, index) => (
                              <li key={index} className="first:mt-0 xl:mt-7 lg:mt-6 md:mt-5 mt-4 description-2 !font-normal text-[#888AA0] transform duration-300 hover:text-[#55E6A5] cursor-pointer">
                                 <Link className="" href={item?.link}>{item?.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     {/* second part */}
                     <div>
                        <ul className="xl:mt-[60px] lg:mt-12 md:mt-10 mt-8">
                           {navLinks2?.map((item, index) => (
                              <li key={index} className="first:mt-0 xl:mt-7 lg:mt-6 md:mt-5 mt-4 description-2 !font-normal text-[#888AA0] transform duration-300 hover:text-[#55E6A5] cursor-pointer">
                                 <Link className="" href={item?.link}>{item?.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     {/* third part */}
                     <div>
                        <h3 className="heading-5 text-[#333] !font-medium">Quick Links</h3>
                        <ul className="xl:mt-8 lg:mt-7 md:mt-6 mt-5">
                           {navLinks3?.map((item, index) => (
                              <li key={index} className="first:mt-0 xl:mt-7 lg:mt-6 md:mt-5 mt-4 description-2 !font-normal text-[#888AA0] transform duration-300 hover:text-[#55E6A5] cursor-pointer">
                                 <Link className="" href={item?.link}>{item?.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <div className="xl:mt-14 lg:mt-12 md:mt-10 mt-5 bg-[#D8D8D8] w-full h-[1px]"> </div>
            <div className="xl:my-7 lg:my-6 md:my-5 my-4 flex flex-col sm:flex-row items-center justify-between ">
               <p className="text-[#888AA0] description-2 mt-3 sm:mt-0">
                  Copyright © {currentYear || new Date().getFullYear()} All rights
                  reserved <Link className="text-primary" href="/">Agencistick</Link>
               </p>
               <div className="flex gap-2 sm:gap-[13px] justify-center mt-3 sm:mt-0">
                  {navIcons.map((item, index) => {
                     const IconComponent = item.icon;
                     return (
                        <Link
                           className="bg-primary/80 hover:bg-primary transition-all duration-300 w-6 h-6 flex items-center justify-center rounded-md"
                           key={index}
                           href={item.link}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <IconComponent className="text-white p-[3px] text-xl" />
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};
export default Footer4;
