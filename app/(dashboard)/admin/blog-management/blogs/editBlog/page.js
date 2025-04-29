/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { blogGet, getAllProjects } from "@/app/helper/backend";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
import { useI18n } from "@/app/contexts/i18n";
import BlogForm from "../blogForm/page";


const EditBlog = () => {
  const i18n = useI18n();
  const searchParams = useSearchParams();
  const id = searchParams.get("_id");
  const [data, getData] = useFetch(blogGet, {}, false);
  useEffect(() => {
    getData({ _id: id });
  }, [id]);
  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded dashboardInput xl:p-[30px] lg:p-6 md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <h2 className="pt-3 pb-2 text-xl text-primary heading-3">{i18n.t('Edit Blog')}</h2>
          <BackButton />
        </div>
        <div>
          <BlogForm data={data} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
