"use client";
import { useI18n } from "@/app/contexts/i18n";
import {
  deleteSupportTicket,
  getAllSupportTicketsByAdmin,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Table from "../../components/common/table";
import BackButton from "../../components/common/backButton";
import dayjs from 'dayjs'
import Link from "next/link";
const SupportTicket = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllSupportTicketsByAdmin);
  const [selectedLang, setSelectedLang] = useState(undefined);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const handleView = (value) => {
    setViewModalOpen(true)
    setViewData(value)
  }
  const columns = [
    {
      text: "Title",
      dataField: "title",
      formatter: (title) => (
        <Tooltip title={title?.length > 40 ? title : undefined}>
          <span className="cursor-help">
            {title?.length > 40 ? title.slice(0, 40) + "..." : title}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "User Name",
      dataField: "user",
      formatter: (title) => (
        <span className="">
          {title?.name}
        </span>
      ),
    },
    {
      text: "Reply",
      dataField: "user",
      formatter: (title) => (
        <Link href={`mailto:${title?.email}`} className="border border-[#22F55D] rounded px-4 py-2">
          {"Sent Mail"}
        </Link>
      ),
    },
    {
      text: "Subject",
      dataField: "subject",
      formatter: (title) => (
        <Tooltip title={title?.length > 40 ? title : undefined}>
          <span className="cursor-help">
            {title?.length > 40 ? title.slice(0, 40) + "..." : title}
          </span>
        </Tooltip>
      ),
    },
    {
      text: 'Priority',
      dataField: 'priority',
      formatter: (value) => (
        value === 1 ? "Urgent"
          : value === 2 ? "High"
            : value === 3 ? "Medium"
              : "Low"
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
  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded dashboardInput">
        <div className="flex justify-between px-8 pt-8 items-center">
          <h1 className="text-[#C7D1DA] xl:text-3xl lg:text-xl text-base">{i18n.t("Support Ticket")}</h1>
          <BackButton />
        </div>
        <Table
          columns={columns}
          data={data}
          loading={loading}
          onReload={getData}
          onView={handleView}
          onDelete={deleteSupportTicket}
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
              <div className="mt-8">
                <h2 className="text-[#22F55D] heading-3 text-center">{i18n.t("Support Ticket Details")}</h2>
                <table className="w-full text-left text-[#C7D1DA] mt-6">
                  <tbody>
                    {[
                      { label: "Title", value: viewData?.title },
                      { label: "Subject", value: viewData?.subject },
                      {
                        label: "Priority",
                        value: viewData?.priority === 1 ? "Urgent"
                          : viewData?.priority === 2 ? "High"
                            : viewData?.priority === 3 ? "Medium"
                              : "Low"
                      },
                      { label: "Description", value: viewData?.description },
                      { label: "Create At", value: dayjs(viewData?.createdAt).format("DD MMM YYYY"), },

                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={index < 20 ? "border border-gray-200" : ""}
                      >
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                          {item.label}
                        </td>
                        <td className="py-2 px-4 text-[#C7D1DA] capitalize">
                          {item.value || "N/A"}
                        </td>
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
  );
};

export default SupportTicket;
