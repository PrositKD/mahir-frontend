"use client";
import { useI18n } from "@/app/contexts/i18n";
import { GetPublicProviders } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import React, { useState } from "react";
import CommonBanner from "../../common/commonBanner";
import SectionHeader from "../../common/sectionHeader";
import TeamCard4 from "../../site/common/card/teamCard4";
import { Empty, Pagination } from "antd";

const TeamPage4 = () => {
  const [data] = useFetch(GetPublicProviders);
  const i18n = useI18n();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="">
      <CommonBanner title="Team" textTitle="text-primary" />
      <div className="agency-container py-28">
        <SectionHeader
          align="left"
          maxWidth="max-w-[647px]"
          title="Team"
          heading="The People Behind Our Success"
          description="Meet the dedicated and talented individuals whose passion expertise and collaboration drive everything we do"
        />
        <div className="xl:mt-14 lg:mt-10 md:mt-8 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-6 md:gap-5 sm:gap-4 gap-3">
          {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => (
              <TeamCard4 data={item} key={index} />
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

export default TeamPage4;
