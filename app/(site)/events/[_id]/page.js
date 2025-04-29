/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import EventDetailsPage from "@/app/components/theme4/event/eventDetails";
import EventDetailsPage4 from "@/app/components/theme4/event/eventDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const EventDetails = () => {
  const [dataTheme, getDataTheme, { loading }] = useFetch(
    fetchPageContentTheme1,
    {
      status: true,
    }
  );
  useEffect(() => {
    if (dataTheme) getDataTheme();
  }, []);
  const activeTheme = dataTheme?.theme;
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        <div>
          {activeTheme === "four" && <EventDetailsPage4 />}
          {activeTheme === "one" && <EventDetailsPage />}
          {activeTheme === "two" && <EventDetailsPage />}
          {activeTheme === "three" && <EventDetailsPage />}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
