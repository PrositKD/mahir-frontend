/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import FormInput from "@/app/components/form/input";
import Banner from "@/app/components/site/common/component/Banner";
import { getAllPublicServices, sentMessage } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Form } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ServiceDetailsPage = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const { _id } = params;
  const [data, getData] = useFetch(getAllPublicServices, {}, false);
  useEffect(() => {
    getData({ _id: _id });
  }, [_id]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    useAction(sentMessage, {
      body: {
        name: value.name,
        email: value.email,
        subject: value.subject,
        message: value.text
      },
    },
      () => {
        setLoading(false);
        form.resetFields();
      }
    )
  }

  return (
    <div className="bg-[#0F172A]">
      <Banner title="Service Details" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          <div className="w-full sm:w-[50%] lg:w-[60%] xl:w-[70%]">
            {
              data?.banner_image && (
                <Image
                  className="w-full xl:h-[420px] lg:h-[320px] md:h-[250px] sm:h-[220px] h-[200px] object-fill"
                  src={data?.banner_image}
                  width={1000}
                  height={1000}
                  alt="image"
                />
              )
            }
            <h2 className="xl:mt-8 lg:mt-7 md:mt-5 mt-4 heading-2 text-white">
              {columnFormatter(data?.title)}
            </h2>
            <p className="lg:mt-6 md:mt-5 mt-4 description-2 text-[#888AA0] font-normal leading-6">
              {columnFormatter(data?.description)}
            </p>
          </div>
          <div className="mt-5 sm:mt-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[30%] ">
            <div className=" mr-6 common-bg xl:px-7 xl:py-8 lg:px-6 lg:py-7 sm:px-5 sm:py-6 p-4">
              <h2 className="heading-3 text-white">Have Query ?</h2>
              <Form
                className="mt-6"
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
              >
                <div>
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white"
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required={true}
                  />
                </div>
                <div className="sm:!mt-2">
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white"
                    label="Subject"
                    type="text"
                    name="subject"
                    placeholder="Enter Your Subject"
                    required={true}
                  />
                </div>
                <div className="sm:!mt-2">
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white"
                    label="Email"
                    type="email"
                    isEmail={true}
                    name="email"
                    placeholder="Enter your email"
                    required={true}
                  />
                </div>
                <div className="sm:!mt-2">
                  <FormInput
                    textArea={true}
                    rows={3}
                    className="w-full p-2 sm:p-3 xl:p-4 glass-effect rounded text-white"
                    label="Message"
                    type="text"
                    name="text"
                    placeholder="Enter your message ..."
                    required={true}
                  />
                </div>
                <div className="text-center -mt-5">
                  <button
                    type="submit"
                    className="w-[70%] common-btn mt-6 !rounded-[1px] bg-primary"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
