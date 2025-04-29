"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Table from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import {
  deleteApplyJobByAdmin,
  getAllApplyJobsByAdmin,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const AppliedJobs = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllApplyJobsByAdmin);
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewData, setViewData] = useState(null)
  const i18n = useI18n();

  const columns = [
    {
      text: "Applicant Name",
      dataField: "full_name",
    },
    {
      text: "Applicant Phone",
      dataField: "phone",
    },
    {
      text: "Job Title",
      dataField: "job",
      formatter: (value) => (
        <Tooltip title={columnFormatter(value?.title) > 30 ? columnFormatter(value?.title) : undefined}>
          <span className="cursor-help">
            {columnFormatter(value?.title) > 30 ? columnFormatter(value?.title)?.slice(0, 30) + "..." : columnFormatter(value?.title)}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "Resume",
      dataField: "resume",
      formatter: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <button className="bg-primary/60 text-white common-btn">Resume</button>
        </a>
      )
    },
    {
      text: "Cover Letter",
      dataField: "cover_latter",
      formatter: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <button className="bg-primary/30 text-white common-btn">Cover Letter</button>
        </a>
      )
    },
    {
      text: "Created At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM YYYY")}</span>
      ),
    },
  ];

  const handleView = (value) => {
    setViewModalOpen(true)
    setViewData(value)
  }
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded dashboardInput">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">{i18n.t("Applied Jobs")}</h1>
            <BackButton />
          </div>
          <Table
            columns={columns}
            data={data}
            loading={loading}
            onReload={getData}
            onView={handleView}
            onDelete={deleteApplyJobByAdmin}
            indexed
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
                <h3 className="heading-3 text-center text-primary">{i18n.t("Job Details")}</h3>
                <div className="mt-4">
                  <table className="w-full text-left text-[#C7D1DA] border-collapse">
                    <tbody>
                      <tr>
                        <th colSpan={2} className="py-2 px-4 description-2 text-[#C7D1DA] text-left">
                          {i18n.t("Personal Information")}
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
                        <th colSpan={2} className="py-2 px-4  description-2 text-[#C7D1DA] text-left">
                          {i18n.t("Job Information")}
                        </th>
                      </tr>
                      {[
                        { label: "Company Name", value: viewData?.job?.company_name },
                        { label: "Job Position", value: viewData?.job?.job_position },
                        { label: "Job Title", value: columnFormatter(viewData?.job?.title) },
                      ].map((item, index) => (
                        <tr key={index} className="border border-gray-200">
                          <td className="py-2 px-4 font-semibold text-[#C7D1DA]">{item.label}</td>
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
      </div>
    </>
  );
};

export default AppliedJobs;
