"use client";
import {
  getAllPublicServices,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { Empty, Pagination } from "antd";
import React, { useState } from "react";
import ServiceCard4 from "../../site/common/card/serviceCard4";
import CommonBanner from "../../common/commonBanner";
import SectionHeader from "../../common/sectionHeader";
import { useI18n } from "@/app/contexts/i18n";

const ServicePage4 = () => {
  const [data] = useFetch(getAllPublicServices, { limit: 1000 });
  const i18n = useI18n();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Slice data for current page
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mb-32">
      <CommonBanner title="Service" textTitle="text-primary" />
      <div className="agency-container xl:mt-24 lg:mt-20 md:mt-16 sm:mt-12 mt-10">
        <SectionHeader
          align="left"
          maxWidth="max-w-[710px]"
          title="Services"
          heading="We provide best service"
          description="We deliver high quality reliable services that meet your needs and drive your success and your satisfaction is our priority"
        />

        {/* Services Grid */}
        <div className="xl:mt-10 lg:mt-8 md:mt-6 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
          {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => (
              <ServiceCard4 key={index} data={item} />
            ))
          ) : (
            <div className="col-span-full flex justify-center mt-24">
              <Empty description="No Service Found" />
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
  );
};

export default ServicePage4;
