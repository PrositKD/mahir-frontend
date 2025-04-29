"use client";
import {
  getPublicProjects,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import CommonBanner from "../../common/commonBanner";
import SectionHeader from "../../common/sectionHeader";
import ProductCard4 from "../../site/common/card/productCard4";
import { Empty, Pagination } from "antd";
import { useI18n } from "@/app/contexts/i18n";
import { useState } from "react";

const ProjectPage4 = () => {
  const [data] = useFetch(getPublicProjects, { limit: 1000 });
  const i18n = useI18n();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="">
      <CommonBanner title="Product" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <SectionHeader
          align="right"
          maxWidth="max-w-[647px]"
          title="Product"
          heading="Exceptional Products for Every Need"
          description="We deliver high quality, reliable products designed to meet your needs and drive your success. Your satisfaction is our priority."
        />

        {/* Product Grid */}
        <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
          {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => (
              <ProductCard4 key={index} data={item} />
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
  );
};

export default ProjectPage4;
