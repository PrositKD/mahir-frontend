"use client";
import { getPublicCaseStudies } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import CommonBanner from "../../common/commonBanner";
import SectionHeader from "../../common/sectionHeader";
import CaseStudyCard4 from "../../site/common/card/caseStudyCard4";
import { Empty, Pagination } from "antd";
import { useState } from "react";

const CaseStudyPage4 = () => {
  const [data, getData] = useFetch(getPublicCaseStudies);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="">
      <CommonBanner title="Case Study" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="agency-container w-full">
          <SectionHeader
            align="left"
            maxWidth="max-w-[730px]"
            title="Case Study"
            heading="See how we help businesses succeed"
            description="Our case studies highlight reliable solutions tailored to client needs delivering impactful results and lasting success"
          />

          <div className="xl:mt-14 lg:mt-10 md:mt-8 sm:mt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
            { 
            paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <CaseStudyCard4 data={item} key={index} />
              ))
            ) : (
              <div className="flex justify-center mt-10 col-span-full">
                <Empty description="No Projects Found" />
              </div>
            )}
          </div>
          {/* Pagination */}
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
    </div>
  );
};

export default CaseStudyPage4;
