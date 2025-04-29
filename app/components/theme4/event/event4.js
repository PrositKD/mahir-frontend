"use client";
import { useFetch } from "@/app/helper/hooks";
import { GetAllPublicEvents } from "@/app/helper/backend";
import { Divider, Empty, Pagination } from "antd";
import CommonBanner from "../../common/commonBanner";
import EventCard4 from "../../site/common/card/eventCard4";
import { useState } from "react";

const EventsPage4 = () => {
  const [data, getData] = useFetch(GetAllPublicEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  // Get paginated data
  const paginatedData = data?.docs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="">
      <CommonBanner title="Events" textTitle="text-primary" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          <div className="w-full grids grid-cols-1">
            {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => (
              <EventCard4 data={item} key={index} />
            ))
          ) : (
            <div className="flex justify-center mt-10 col-span-full">
              <Empty description="No Projects Found" />
            </div>
          )}
          </div>
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

export default EventsPage4;
