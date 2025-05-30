/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import FormInput from "@/app/components/form/input";
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import { sentMessage } from "@/app/helper/backend";
import { useAction } from "@/app/helper/hooks";
import { Form } from "antd";
import Image from "next/image";
import React, { useState } from "react";
const QuotePage = () => {
  const i18n = useI18n();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    useAction(
      sentMessage,
      {
        body: {
          name: value.name,
          email: value.email,
          subject: value.subject,
          message: value.text,
        },
      },
      () => {
        setLoading(false);
        form.resetFields();
      }
    );
  };
  return (
    <section className=" bg-[#0F172A] ">
      <Banner title="Quote" />
      <div className="agency-container py-12 sm:py-[70px] md:py-[90px] lg:py-[100px]">
        <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#122130] py-12 md:py-[90px] lg:py-[110px] xl:py-[130px] 2xl:py-[150px]">
          <div className="px-10 sm:px-[150px] md:px-[200px] lg:px-[254px]">
            <h1 className="heading-6 text-white text-center">
              Request A Quote
            </h1>
            <Form
              className="2xl:mt-[60px] xl:mt-14 lg:mt-12 md:mt-10 sm:mt-8 mt-6"
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ name: "", email: "" }}
              autoComplete="off"
              form={form}
            >
              <div>
                <FormInput
                  className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                  type={"text"}
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  required={true}
                />
              </div>
              <div>
                <FormInput
                  className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                  type={"text"}
                  label="Subject"
                  name="subject"
                  placeholder="Enter your Subject"
                  required={true}
                />
              </div>
              <div className="sm:!mt-2">
                <FormInput
                  className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                  type="email"
                  label="Email"
                  isEmail={true}
                  name="email"
                  placeholder="Enter your email"
                  required={true}
                />
              </div>
              <div className="sm:!mt-2">
                {/* <FormInput textArea={true} rows={3} className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Message' name='text' placeholder='Enter Your Text' required={true} /> */}
                <FormInput
                  textArea={true}
                  rows={3}
                  className="w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-white focus:outline-primary"
                  label="Message"
                  type="text"
                  name="text"
                  placeholder="Enter your message ..."
                  required={true}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full  mt-6 common-btn bg-primary"
                >
                  {loading ? i18n.t("Sending...") : i18n.t("Submit")}
                </button>
              </div>
            </Form>
            <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
              <Image
                className="h-24"
                width={264}
                height={147}
                src="/hand.png"
                alt="hand"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotePage;
