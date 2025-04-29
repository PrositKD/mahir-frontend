/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import TeamDetailsPage from "@/app/components/theme4/team/teamDetails";
import TeamDetailsPage4 from "@/app/components/theme4/team/teamDetails4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const TeamDetails = () => {
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
          {activeTheme === "four" && <TeamDetailsPage4 />}
          {activeTheme === "one" && <TeamDetailsPage />}
          {activeTheme === "two" && <TeamDetailsPage />}
          {activeTheme === "three" && <TeamDetailsPage />}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
