'use client';
import { useFetch } from "@/app/helper/hooks";
import CaseStudyCard from "../site/common/card/caseStudyCard";
import { getPublicCaseStudies } from "@/app/helper/backend";
import { useI18n } from "@/app/contexts/i18n";
import Link from "next/link";
import Button from "@/app/(dashboard)/components/common/button";
import { SiBookstack } from "react-icons/si";
const CaseStudy = ({ theme }) => {
  const [data, getData] = useFetch(getPublicCaseStudies, {limit: 100});
  const i18n = useI18n();

 
  const displayedItems = data?.docs?.slice(0, 4) || [];

  return (
    <section className="agency-container mx-auto px-6 py-12">
        <div className={`flex justify-center items-center section-heading ${
          theme === "theme3" ? "text-white" : "text-[#02050A]"
        }  gap-3 text-center mx-auto`}>  <SiBookstack className="text-[28px]" /><p> {i18n.t("Case Study")} </p> </div>
      <p
        className={`mt-2 max-w-[700px] mx-auto ${
          theme === "theme3" ? "text-[#ffffff]" : "text-[#02050A]"
        } heading-2 font-medium text-center`}
      >
        {i18n.t("Explore how we've helped businesses achieve their goals")}
      </p>

      <div className='xl:mt-14 lg:mt-10 md:mt-8 sm:mt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 gap-3'>
        {displayedItems.map((item, index) => (
          <div key={index} className="w-full">
            <CaseStudyCard data={item} />
          </div>
        ))}
      </div>
      {data?.docs?.length > 4 && (
        <div className="text-center mt-10">
          <Link href="/events">
            <Button className="description-2 common-btn">
              {i18n.t("Explore More")}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CaseStudy;

  