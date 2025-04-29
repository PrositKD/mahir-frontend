'use client';
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { getAllCaseStudies } from "@/app/helper/backend";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
import { useI18n } from "@/app/contexts/i18n";
import CaseStudyForm from "../caseStudyForm/page";

const EditCaseStudy = () => {
  const i18n = useI18n();
  const searchParams = useSearchParams();
  const id = searchParams.get("_id");
  const [data, getData] = useFetch(getAllCaseStudies, {}, false);
  useEffect(() => {
    getData({ _id: id });
  }, [id]);
  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded dashboardInput xl:p-[30px] lg:p-6 md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <h2 className="pt-3 pb-2 text-xl text-primary heading-3">{i18n.t("Edit Case Study")}</h2>
          <BackButton />
        </div>
        <div>
          <CaseStudyForm data={data} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default EditCaseStudy;
