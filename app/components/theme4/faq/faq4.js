import React, { useEffect, useState } from "react";
import { Collapse, Empty } from "antd";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import CommonBanner from "../../common/commonBanner";
import { fetchFAQ } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import SectionHeader from "../../common/sectionHeader";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
const FAQPage4 = () => {
  const [data, getData, { loading }] = useFetch(fetchFAQ);
  const i18n = useI18n();
  const [activeKey, setActiveKey] = useState(null);

  const handlePanelChange = (key) => {
    if (key === activeKey) {
      setActiveKey(null);
    } else {
      setActiveKey(key);
    }
  };

  return (
    <section>
      <CommonBanner title="FAQ" textTitle="text-primary" />
      <div className="sm:py-16 py-12">
        <div className="agency-container">
          <SectionHeader
            align="left"
            maxWidth="max-w-[770px]"
            title="FAQ"
            heading="Frequently Asked Questions"
            description="Our Frequently Asked Questions section is designed to provide quick and helpful answers to the most common inquiries about our services, features, and support, making it easier for you to find the information you need without any hassle."
          />

          <div className="w-full max-w-[1320px] mt-8 md:mt-10 lg:mt-12 home1Faq">
            {data?.length > 0 ? (
              <Collapse
                accordion
                activeKey={activeKey}
                onChange={handlePanelChange}
                expandIconPosition="end"
                className="!bg-transparent"
              >
                {data.map((item, index) => (
                  <Collapse.Panel
                    key={item.key}
                    header={
                      <div className="flex items-center pl-3 justify-between">
                        <span className="heading-5 text-primary mr-4">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <p
                          className={`heading-5 flex-1 ${
                            activeKey === item.key
                              ? "text-[#fff]"
                              : "text-[#2B2B2B]"
                          }`}
                        >
                          {columnFormatter(item?.question)}
                        </p>
                        {activeKey === item.key ? (
                          <IoMdArrowDropupCircle className="text-4xl text-primary transition-transform duration-300" />
                        ) : (
                          <IoMdArrowDropdownCircle className="text-4xl text-primary transition-transform duration-300" />
                        )}
                      </div>
                    }
                    className="mb-6"
                  >
                    <p className="px-2 description-1 text-[#44433F]">
                      {columnFormatter(item?.answer)}
                    </p>
                  </Collapse.Panel>
                ))}
              </Collapse>
            ) : (
              <Empty
                className="description"
                description={i18n.t("No Faq Found")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage4;
