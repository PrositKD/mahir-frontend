"use client";
import Banner from "@/app/components/site/common/component/Banner";
import React, { useState } from "react";
import { SearchInput1 } from "@/app/components/form/search";
import EventCard from "@/app/components/site/common/card/eventCard";
import { useFetch } from "@/app/helper/hooks";
import {
  GetAllPublicEvents,
  GetPublicEventCategories,
} from "@/app/helper/backend";
import { columnFormatter } from "@/app/helper/utils";
import { Empty } from "antd";

const EventsPage = () => {
  const [data, getData] = useFetch(GetAllPublicEvents);
  const [eventCategory] = useFetch(GetPublicEventCategories);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="bg-[#0F172A]">
      <Banner title="Events" />
      <div className="lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container">
        <div className="flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          <div className="w-full sm:w-[60%] xl:w-[70%]">
            {
              data?.docs?.length > 0 ? (
                data?.docs?.map((item) => (
                  <EventCard slug={"blog"} key={item?._id} data={item} />
                ))
              ) : (
                <div className="flex items-center justify-center w-full">
                  <Empty description="No Events Found" />
                </div>
              )
            }
          </div>
          <div className="mt-5 sm:mt-0 w-full sm:w-[40%] xl:w-[30%] ">
            <div className="flex flex-col 2xl:gap-[60px] xl:gap-12 lg:gap-10 md:gap-8 sm:gap-6 gap-5">
              <div className="common-bg lg:px-5 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4">
                <SearchInput1
                  onChange={(e) => getData({ search: e.target.value })}
                  className="w-full !py-2 !md:py-3  lg:!py-4 bg-[#55E6A5] bg-opacity-10 text-white"
                  placeholder="Search"
                />
              </div>

              <div className="common-bg lg:px-6 lg:py-7 md:px-4 md:py-5 sm:px-3 sm:py-2 p-4">
                <h3 className="heading-3 text-white">Event Categories</h3>
                <div className="xl:mt-7 lg:mt-6 md:mt-5 mt-4 flex flex-col lg:gap-3 gap-2">
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      getData({ category: undefined });
                    }}
                    className={`group flex items-center justify-between lg:gap-3 gap-2 px-4 py-2 rounded-md duration-300
                                        ${activeCategory === "All"
                        ? "text-primary bg-white/10"
                        : "text-[#888AA0]"
                      }
                                      hover:text-primary hover:bg-white/10`}
                  >
                    <p className="description-2 font-normal">All</p>
                    <p className="description-2 font-normal">
                      {eventCategory?.docs?.some((item) => item?.count > 0)
                        ? eventCategory?.docs?.reduce(
                          (acc, item) => acc + item?.count,
                          0
                        )
                        : 0}
                    </p>
                  </button>
                  {eventCategory?.docs.map((item) => (
                    <button
                      key={item?.category?._id}
                      onClick={() => {
                        setActiveCategory(item?.category?._id);
                        getData({ category: item?.category?._id });
                      }}
                      className={`group flex items-center justify-between lg:gap-3 gap-2 px-4 py-2 rounded-md duration-300
                                        ${activeCategory === item?.category?._id
                          ? "text-primary bg-white/10"
                          : "text-[#888AA0]"
                        }
                                      hover:text-primary hover:bg-white/10`}
                    >
                      <p className="description-2 font-normal">
                        {columnFormatter(item?.category?.name)}
                      </p>
                      <p className="description-2 font-normal">{item?.count}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
