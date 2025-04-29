/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { useAction, useFetch } from "@/app/helper/hooks";
import { getPublicJobs } from "@/app/helper/backend";
import CommonBanner from "../../common/commonBanner";
import CareerCard4 from "../../site/common/card/careerCard4";
import { Empty, Form, Pagination } from "antd";
import FormInput from "../../form/input";
import { useI18n } from "@/app/contexts/i18n";

const CareersPage4 = () => {
  const i18n = useI18n();
  const [data] = useFetch(getPublicJobs);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [loading, setLoading] = useState(false);
  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
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
    <div className="">
      <CommonBanner title="Careers" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="flex flex-col md:flex-row xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-3">
          <div className="!mx-auto w-full sm:w-2/3">
            <div className=" grid grid-cols-1 md:grid-cols-2  xl:gap-6 lg:gap-5 md:gap-4 gap-3">
              {paginatedData?.length > 0 ? (
                paginatedData.map((item, index) => (
                  <CareerCard4 data={item} key={index} />
                ))
              ) : (
                <div className="flex justify-center mt-10 col-span-full">
                  <Empty description="No Projects Found" />
                </div>
              )}
            </div>
          </div>
          <div className="w-full  md:w-1/3">
            <div className="bg-[#ECFDF4] xl:px-7 xl:py-8 lg:px-6 lg:py-7 sm:px-5 sm:py-6 p-4 lg:rounded-[20px] rounded-[10px] ">
              <h2 className="heading-8 !font-lexend text-[#333333]">{i18n.t("Have Query")} ?</h2>
              <Form
                className="mt-6 theme5"
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
              >
                <div>
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 theme4  rounded text-[#333] focus:outline-primary"
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required={true}
                  />
                </div>
                <div className="">
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary"
                    label="Subject"
                    type="text"
                    name="subject"
                    placeholder="Enter Your Subject"
                    required={true}
                  />
                </div>
                <div className="">
                  <FormInput
                    className="w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary"
                    label="Email"
                    type="email"
                    isEmail={true}
                    name="email"
                    placeholder="Enter your email"
                    required={true}
                  />
                </div>
                <div className="">
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
                <div className="text-center -mt-5">
                  <button
                    type="submit"
                    className="w-full common-btn mt-6 bg-primary text-white rounded-[10px]"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        {data?.docs?.length > pageSize && (
          <div className="flex justify-center mt-10 theme4Ant">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.docs.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              className="text-primary"
              itemRender={(page, type, originalElement) => {
                if (type === "page") {
                  return (
                    <a className="!text-primary hover:!text-primary font-medium">
                      {page}
                    </a>
                  );
                }
                return originalElement;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage4;
