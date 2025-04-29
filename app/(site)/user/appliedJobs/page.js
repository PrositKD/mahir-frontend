"use client";
import Button from "@/app/(dashboard)/components/common/button";
import UserTable from "@/app/(dashboard)/components/common/userTable";
import { useI18n } from "@/app/contexts/i18n";
import {
  getApplyJobByUser,
  deleteApplyJobByAdmin
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter, columnFormatter1 } from "@/app/helper/utils";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AppliedJobs = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getApplyJobByUser);
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewData, setViewData] = useState(null)
  const i18n = useI18n();
  const router = useRouter();
  const columns = [
    {
      text: "Job Title",
      dataField: "job",
      formatter: (value) => <p>{columnFormatter1(value?.title)}</p>,
    },
    {
      text: "Company Name",
      dataField: "job",
      formatter: (value) => <p>{value?.company_name}</p>,
    },
    {
      text: "Resume",
      dataField: "resume",
      formatter: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <button className="bg-primary/60 text-white common-btn">{i18n.t("Resume")}</button>
        </a>
      )
    },
    {
      text: "Cover Letter",
      dataField: "cover_latter",
      formatter: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <button className="bg-primary/30 text-white common-btn">{i18n.t("Cover Letter")}</button>
        </a>
      )
    },
  ];

  const handleView = (value) => {
    setViewModalOpen(true)
    setViewData(value)
  }
  return (
    <>
      <div className="w-full overflow-x-auto dashboardModal">
        <h4 className="description-1 font-bold text-white mb-5">{i18n.t("Applied Jobs")}</h4>
        <UserTable
          columns={columns}
          data={data}
          loading={loading}
          onReload={getData}
          onView={handleView}
          onDelete={deleteApplyJobByAdmin}
          indexed
          action={
            <Button onClick={() => router.push("/careers")}>
              <span className="description-2">{i18n.t("Apply New Job")}</span>
            </Button>
          }
          langCode={langCode}
          pagination
        />

        {/* view modal  */}
        <Modal
          className="dashboardModal"
          open={viewModalOpen}
          onCancel={() => { setViewModalOpen(false), setViewData(null) }}
          footer={null}
          destroyOnClose
          width={800}
          centered
        >
          {viewData && (
            <div className="modal-wrapper">
              <h3 className="flex justify-center text-[#C7D1DA] description-1">
                {i18n.t("Details Information")}
              </h3>
              <div className="mt-4">
                <table className="w-full text-left text-[#C7D1DA] border-collapse">
                  <tbody>
                    <tr>
                      <th colSpan={2} className="py-2 px-4 bg-gray-700 description-2 text-[#C7D1DA] text-left">
                        {i18n.t("Applicant Information")}
                      </th>
                    </tr>
                    {[
                      { label: "Name", value: viewData?.full_name },
                      { label: "Email", value: viewData?.email },
                      { label: "Phone", value: viewData?.phone },
                      { label: "Address", value: viewData?.address },
                      { label: "Latest Education", value: viewData?.education },
                      {
                        label: "Job Experience",
                        value: viewData?.experience ? `${viewData.experience} years` : "N/A"
                      },
                      { label: "University", value: viewData?.university },
                    ].map((item, index) => (
                      <tr key={index} className="border border-gray-200">
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA]">{item.label}</td>
                        <td className="py-2 px-4 text-[#C7D1DA] capitalize">{item.value || "N/A"}</td>
                      </tr>
                    ))}
                    <tr>
                      <th colSpan={2} className="py-2 px-4 bg-gray-700 description-2 text-[#C7D1DA] text-left">
                        {i18n.t("Job Information")}
                      </th>
                    </tr>
                    {[
                      { label: "Company Name", value: viewData?.job?.company_name },
                      { label: "Job Position", value: viewData?.job?.job_position },
                      { label: "Job Title", value: columnFormatter(viewData?.job?.title) },
                    ].map((item, index) => (
                      <tr key={index} className="border border-gray-200">
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA]">{i18n.t(item.label)}</td>
                        <td className="py-2 px-4 text-[#C7D1DA] capitalize">{item.value || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default AppliedJobs;
