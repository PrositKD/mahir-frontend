"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import { useCurrency } from "@/app/contexts/site";
import { deleteJob, getAllJobs, updateJob } from "@/app/helper/backend";
import { useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Modal, Switch, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Events = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllJobs);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const i18n = useI18n();
  const { currency_symbol } = useCurrency();
  const columns = [
    {
      text: "Title",
      dataField: "title",
      formatter: (title) => (
        <span>
          <Tooltip
            title={
              columnFormatter(title)?.length > 40
                ? columnFormatter(title)
                : undefined
            }
          >
            <span className="cursor-help">
              {title[langCode]?.length > 40
                ? columnFormatter(title)?.slice(0, 40) + "..."
                : columnFormatter(title)}
            </span>
          </Tooltip>
        </span>
      ),
    },
    {
      text: "Job Position",
      dataField: "job_position",
      formatter: (title) => (
        <span>
          <Tooltip title={title?.length > 40 ? title : undefined}>
            <span className="cursor-help">
              {title[langCode]?.length > 40
                ? title?.slice(0, 40) + "..."
                : title}
            </span>
          </Tooltip>
        </span>
      ),
    },
    {
      text: "Category",
      dataField: "category",
      formatter: (value) => (
        <p className="capitalize">{columnFormatter(value?.name)}</p>
      ),
    },

    {
      text: i18n.t("Status"),
      dataField: "is_active",
      formatter: (_, d) => {
        return (
          <Switch
            checked={d?.status}
            onChange={() => {
              const newStatus = !d?.status;
              useActionConfirm(
                updateJob,
                {
                  body: {
                    _id: d?._id,
                    status: newStatus,
                  },
                },
                getData
              );
            }}
            checkedChildren={
              <span className="text-white">{i18n.t("Active")}</span>
            }
            unCheckedChildren={
              <span className="text-white">{i18n.t("Inactive")}</span>
            }
          />
        );
      },
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
    setViewModalOpen(true);
    setViewData(value);
  };
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded dashboardInput">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">{i18n.t("Job List")}</h1>
            <BackButton />
          </div>
          <Table
            columns={columns}
            data={data}
            loading={loading}
            onReload={getData}
            action={
              <Button
                onClick={() => {
                  window.location.href = "/admin/jobManagement/jobs/addJob";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/jobManagement/jobs/editJob?_id=${values._id}`;
            }}
            onView={handleView}
            onDelete={deleteJob}
            indexed
            langCode={langCode}
            pagination
          />

          {/* view modal  */}
          <Modal
            className="dashboardModal"
            open={viewModalOpen}
            onCancel={() => {
              setViewModalOpen(false), setViewData(null);
            }}
            footer={null}
            destroyOnClose
            width={800}
            centered
          >
            {viewData && (
              <div className="modal-wrapper">
                <div className="mt-3">
                  <h3 className="heading-3 text-center text-primary">
                    {i18n.t("Job Details")}
                  </h3>
                  <table className="w-full mt-6 text-left text-[#C7D1DA]">
                    <tbody>
                      {[
                        {
                          label: "Event Title",
                          value: columnFormatter(viewData?.title),
                        },
                        { label: "Job Type", value: viewData?.job_type },
                        {
                          label: "Company Name",
                          value: viewData?.company_name,
                        },
                        { label: "Author Name", value: viewData?.author_name },
                        {
                          label: "Job Position",
                          value: viewData?.job_position,
                        },
                        {
                          label: "Salary",
                          value: `${currency_symbol} ${viewData?.salary}`,
                        },
                        { label: "Vacancy", value: viewData?.vacancy },
                        { label: "Location", value: viewData?.job_location },
                        {
                          label: "Deadline",
                          value: dayjs(viewData?.deadline).format(
                            "DD-MMM-YYYY"
                          ),
                        },
                        {
                          label: "Job Context",
                          value: columnFormatter(viewData?.job_context),
                        },
                        {
                          label: "Job Responsibility",
                          value: columnFormatter(viewData?.job_responsibility),
                        },
                        {
                          label: "Educational Requirement",
                          value: columnFormatter(
                            viewData?.educational_requirement
                          ),
                        },
                        {
                          label: "Experience Requirement",
                          value: columnFormatter(
                            viewData?.experience_requirement
                          ),
                        },
                        {
                          label: "Additional Requirement",
                          value: columnFormatter(
                            viewData?.additional_requirements
                          ),
                        },
                        {
                          label: "Create At",
                          value: dayjs(viewData?.createdAt).format(
                            "DD MMM YYYY"
                          ),
                        },
                      ]
                        .flat()
                        .filter(Boolean)
                        .map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index < 20 ? "border border-gray-200" : ""
                            }
                          >
                            <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                              {item.label}
                            </td>
                            {item.label == "Event Description" ||
                            item.label == "Educational Requirement" ||
                            item.label == "Experience Requirement" ||
                            item.label == "Additional Requirement" ||
                            item.label == "Job Responsibility" ? (
                              <td
                                dangerouslySetInnerHTML={{ __html: item.value }}
                                className="py-2 px-4 text-[#C7D1DA] capitalize"
                              />
                            ) : (
                              <td className="py-2 px-4 text-[#C7D1DA] capitalize">
                                {item.value || "N/A"}
                              </td>
                            )}
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

export default Events;
