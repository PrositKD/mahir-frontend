/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import TeamPage from "@/app/components/theme4/team/team";
import TeamPage4 from "@/app/components/theme4/team/team4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const Team = () => {
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
          {activeTheme === "four" && <TeamPage4 />}
          {activeTheme === "one" && <TeamPage />}
          {activeTheme === "two" && <TeamPage />}
          {activeTheme === "three" && <TeamPage />}
        </div>
      )}
    </div>
  );
};

export default Team;
