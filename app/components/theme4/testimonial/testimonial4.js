"use client";
import { getAllPublicReviews } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { Empty, Pagination } from "antd";
import React, { useState } from "react";
import CommonBanner from "../../common/commonBanner";
import SectionHeader from "../../common/sectionHeader";
import ReviewCard4 from "../../site/common/card/reviewCard4";

const TestimonialsPage4 = () => {
  const [data] = useFetch(getAllPublicReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="">
      <CommonBanner title="Testimonials" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="agency-container w-full">
          <SectionHeader
            align="left"
            maxWidth="max-w-[560px]"
            title="Testimonials"
            heading="Some Good Words From Our Clients"
            description="Hear from our happy clients and discover how our work has positively impacted their businesses and experiences with us"
          />

          <div className="xl:mt-14 lg:mt-10 md:mt-8 sm:mt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <ReviewCard4 data={item} key={index} />
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

export default TestimonialsPage4;
