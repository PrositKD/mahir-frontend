'use client';
import React from "react";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { useI18n } from "@/app/contexts/i18n";
import BlogForm from "../blogForm/page";

const AddProject = () => {
  const i18n = useI18n();
  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded dashboardInput xl:p-[30px] lg:p-6 md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <h2 className="pt-3 pb-2 text-xl text-primary heading-3">{i18n.t('Add New Blog')}</h2>
          <BackButton />
        </div>
        <div>
          <BlogForm isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddProject;
