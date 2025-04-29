/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import FormInput from "@/app/components/form/input";
import Banner from "@/app/components/site/common/component/Banner";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { useAction, useFetch } from "@/app/helper/hooks";
import { createContact, fetchPageContent, fetchPublicSettings } from "@/app/helper/backend";
import { columnFormatter } from "@/app/helper/utils";
import Button from "@/app/(dashboard)/components/common/button";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, getData] = useFetch(fetchPageContent, {}, false);
  const [setting] = useFetch(fetchPublicSettings);
  useEffect(() => {
    getData({ slug: "contact_us" });
  }, []);
  const handleSubmit = async (values) => {
    setLoading(true);
    await useAction(createContact, { body: values });
    form.resetFields();
    setLoading(false);
  };
  return (
    <div className="bg-[#0F172A]">
      <Banner title="Contact" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="agency-container relative xl:p-8 lg:p-7 md:p-7 sm:p-4 p-3 bg-[#171F27]">
          <div className="flex flex-col sm:flex-row xl:gap-8 lg:gap-7 md:gap-6 gap-5">
            <div className="w-full sm:w-[50%] lg:w-[60%] xl:w-[65%]">
              <Form
                className="xl:mt-12 lg:mt-10 md:mt-6 mt-5"
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:gap-8 lg:gap-6 gap-3">
                  <div>
                    <FormInput
                      className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      required={true}
                    />
                  </div>
                  <div className="">
                    <FormInput
                      className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                      label="Email"
                      name="email"
                      isEmail={true}
                      placeholder="Enter your email"
                      required={true}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <FormInput
                    className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                    label="Subject"
                    name="subject"
                    placeholder="Enter your Subject"
                    required={true}
                  />
                </div>
                <div className="mt-3">
                  <FormInput
                    textArea={true}
                    rows={3}
                    className="w-full min-h-[112px] p-2 sm:p-3 xl:p-4 glass-effect rounded text-white"
                    label="Message"
                    type="text"
                    name="message"
                    placeholder="Enter your message ..."
                    required={true}
                  />
                </div>
                <div className="">
                  <Button type="submit" className="common-btn bg-[#55E6A5]">
                   {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </Form>
            </div>
            <div className="w-full sm:w-[50%] lg:w-[40%] xl:w-[35%]">
              <div className="relative xl:mt-12 lg:mt-10 md:mt-6 mt-5 2xl:p-8 xl:p-7 lg:p-6 sm:p-5 p-4 bg-[#003049] rounded">
                <h3 className="heading-8 text-white">{data?.content?.title}</h3>
                <p
                  className="lg:mt-4 mt-3 description text-[#888AA0] font-normal"
                  dangerouslySetInnerHTML={{
                    __html: columnFormatter(data?.content?.description),
                  }}
                ></p>
                <div className="2xl:mt-[122px] xl:mt-[100px] lg:mt-20 md:mt-14 sm:mt-12 mt-8 flex flex-col gap-3">
                  <div className="flex items-center lg:gap-4 md:gap-2 gap-2">
                    <FaPhoneVolume className="text-white" size={20} />
                    <p className="description-2 text-[#888AA0] font-normal">
                      {setting?.site_phone}
                    </p>
                  </div>
                  <div className="flex items-center lg:gap-4 md:gap-2 gap-2 mt-2">
                    <MdEmail className="text-white" size={20} />
                    <p className="description-2 text-[#888AA0] font-normal">
                      {setting?.site_email}
                    </p>
                  </div>
                  <div className="flex lg:gap-4 md:gap-2 gap-2 mt-2">
                    <FaLocationDot className="text-white mt-1" size={20} />
                    <p className="description-2 text-[#888AA0] font-normal">
                      {setting?.site_address}
                    </p>
                  </div>
                </div>
                <div className="2xl:mt-[210px] xl:mt-[180px] lg:mt-36 md:mt-24 sm:mt-16 mt-10 flex items-center xl:gap-6 lg:gap-5 sm:gap-4 gap-3">
                  <Link
                    // href='/'
                    href={setting?.social_media_link[0]?.link || "/"}
                    className="group flex items-center justify-center w-8 h-8 rounded-full transform duration-300 hover:bg-white  bg-[#DD8E38]"
                  >
                    <FaFacebook
                      className="text-white transform duration-300 group-hover:text-black"
                      size={20}
                    />
                  </Link>
                  <Link
                    href={setting?.social_media_link[1]?.link || "/"}
                    className="group hover:bg-white transform duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-[#DD8E38]"
                  >
                    <FaTwitter
                      className="text-white transform duration-300 group-hover:text-black"
                      size={20}
                    />
                  </Link>
                  <Link
                    href={setting?.social_media_link[3]?.link || "/"}
                    className="group hover:bg-white transform duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-[#DD8E38]"
                  >
                    <FaLinkedin
                      className="text-white transform duration-300 group-hover:text-black"
                      size={20}
                    />
                  </Link>
                </div>
                <Image
                  className="absolute bottom-5 right-5 hidden md:block "
                  src="/inner/contact.png"
                  width={100}
                  height={100}
                  alt="design"
                />
              </div>
            </div>
          </div>
          <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
            <Image className="h-24" src="/hand.png" width={265} height={147} alt="hand" />
          </div>
          <div className="lg:block hidden absolute bottom-12 left-1/3">
            <Image className="" width={100} height={100} src="/inner/star.png" alt="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
