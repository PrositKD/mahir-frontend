"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import {
  DeleteProvider,
  GetAllProviders,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter, } from "@/app/helper/utils";
import { Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Providers = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(GetAllProviders);
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewData, setViewData] = useState(null)
  const i18n = useI18n();

  const columns = [
    {
      text: "Image",
      dataField: "image",
      formatter: (value) => (
        <>
          <TableImage url={value || "/man.png"} />
        </>
      ),
    },
    {
      text: "Name",
      dataField: "name",
      formatter: (title) => (
        <span>
          <Tooltip
            title={
              title?.length > 30 ? title : undefined
            }
          >
            <span className="cursor-help">
              {title?.length > 30
                ? title?.slice(0, 30) + "..."
                : title}
            </span>
          </Tooltip>
        </span>
      )
    },
    {
      text: "Email",
      dataField: "email",
      formatter: (email) => (
        <p className="">{email}</p>
      ),
    },
    {
      text: "Phone",
      dataField: "phone",
      formatter: (phone) => (
        <p className="">{phone}</p>
      ),
    },
    {
      text: "Expertise",
      dataField: "expert",
      formatter: (expert) => (
        <p className="capitalize">{columnFormatter(expert?.name)}</p>
      ),
    },
    {
      text: "Created At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
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
            <h1 className="text-[#C7D1DA] text-3xl">Providers List</h1>
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
                  window.location.href = "/admin/provider/addProvider";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/provider/editProvider?_id=${values._id}`;
            }}
            onDelete={DeleteProvider}
            onView={handleView}
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
                <div className="mt-3">
                <h3 className="heading-3 text-center text-primary">{i18n.t("Provider Details")}</h3>
                  <table className="w-full text-left mt-6 text-[#C7D1DA]">
                    <tbody>
                      {[
                        { label: "Provider Name", value: viewData?.name },
                        { label: "About", value: columnFormatter(viewData?.about) },
                        { label: "Title", value: columnFormatter(viewData?.title) },
                        { label: "Expert", value: columnFormatter(viewData?.expert?.name) },
                        { label: "Email", value: viewData?.email },
                        { label: "Phone", value: viewData?.phone },
                        { label: "Professional Information", value: columnFormatter(viewData?.professional_info) },
                        { label: "Guidelines", value: columnFormatter(viewData?.guidelines) },
                        { label: "Linkedin Url", value: viewData?.linkedin_url },
                        { label: "Instagram Url", value: viewData?.instagram_url },
                        { label: "Twitter Url", value: viewData?.x_url },
                        { label: "Create At", value: dayjs(viewData?.createdAt).format("DD MMM YYYY"), },
                      ].map((item, index) => (
                        <tr
                          key={index}
                          className={index < 20 ? "border border-gray-200" : ""}
                        >
                          <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                            {item.label}
                          </td>
                          {item.label == "Event Description" ? (
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
      </div >
    </>
  );
};

export default Providers;
