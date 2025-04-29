/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import { useCurrency } from "@/app/contexts/site";
import {
  deleteProject,
  getAllProjects,
  UpdateEvent,
} from "@/app/helper/backend";
import { useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Image, Modal, Switch, Tooltip, } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Projects = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllProjects);
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewData, setViewData] = useState(null)
  const i18n = useI18n();
  const { currency_symbol } = useCurrency();

  const columns = [
    {
      text: "Image",
      dataField: "thumb_image",
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
              title?.length > 40 ? title : undefined
            }
          >
            <span className="cursor-help">
              {title?.length > 40
                ? title?.slice(0, 40) + "..."
                : title}
            </span>
          </Tooltip>
        </span>
      )
    },
    {
      text: "Quantity",
      dataField: "quantity",
      formatter: (value) => value,
    },
    {
      text: "Price",
      dataField: "price",
      formatter: (value) => <p>{currency_symbol} {value?.amount}</p>,
    },
    {
      text: "Category",
      dataField: "category",
      formatter: (value) => columnFormatter(value?.name),
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
                UpdateEvent,
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
    setViewModalOpen(true)
    setViewData(value)
  }
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded dashboardInput">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">{i18n.t("Product List")}</h1>
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
                  window.location.href = "/admin/projectManagement/projects/addProject";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/projectManagement/projects/editProject?_id=${values._id}`;
            }}
            onView={handleView}
            onDelete={deleteProject}
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
                  <h3 className="heading-3 text-center text-primary">{i18n.t("Product Details")}</h3>
                  <div className="flex gap-5 items-center mt-6">
                    { viewData?.thumb_image && 
                    ( 
                    <Image src={viewData?.thumb_image} width={200} height={200} alt={viewData?.name} />
                    )}
                    {
                      viewData?.images?.[0] && (
                        <Image src={viewData?.images?.[0]} width={200} height={200} alt={viewData?.name} />
                      )}
                  {
                    viewData?.images?.[1] && (
                      <Image src={viewData?.images?.[1]} width={200} height={200} alt={viewData?.name} />
                    )
                  }
                  </div>
                  <table className="w-full mt-6 text-left text-[#C7D1DA]">
                    <tbody>
                      {[
                        { label: "Name", value: viewData?.name },
                        { label: "Event Description", value: columnFormatter(viewData?.description) },
                        { label: "Category", value: columnFormatter(viewData?.category?.name) },
                        { label: "Quantity", value: viewData?.quantity },
                        { label: "Price", value: `${currency_symbol} ${viewData?.price?.amount}` },
                        { label: "Discount Type", value: viewData?.price?.discount_type },
                        // { label: "Discount", value: viewData?.price?.discount },
                        { 
                          label: "Discount", 
                          value: viewData?.price?.discount_type === "flat" 
                             ? `${currency_symbol} ${viewData?.price?.discount}` 
                             : `${viewData?.price?.discount} %` 
                       },
                        { label: "Create At", value: dayjs(viewData?.createdAt).format("DD MMM YYYY"), },
                      ].flat().filter(Boolean).map((item, index) => (
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
      </div>
    </>
  );
};

export default Projects;
