/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import {
  DeleteService,
  GetAllServices,
  UpdateService,
} from "@/app/helper/backend";
import { useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Image, Modal, Switch, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Services = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(GetAllServices);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const i18n = useI18n();

  const columns = [
    {
      text: "Image",
      dataField: "banner_image",
      formatter: (value) => (
        <>
          <TableImage url={value || "/man.png"} />
        </>
      ),
    },
    {
      text: "Title",
      dataField: "title",
      formatter: (title) => (
        <span>
          <Tooltip
            title={
              columnFormatter(title)?.length > 20
                ? columnFormatter(title)
                : undefined
            }
          >
            <span className="cursor-help">
              {title[langCode]?.length > 20
                ? columnFormatter(title)?.slice(0, 20) + "..."
                : columnFormatter(title)}
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
                UpdateService,
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
            <h1 className="text-[#C7D1DA] text-3xl">Services List</h1>
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
                  window.location.href =
                    "/admin/serviceManagement/service/addService";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/serviceManagement/service/editService?_id=${values._id}`;
            }}
            onView={handleView}
            onDelete={DeleteService}
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
                <div className="mt-6">
                  <div className="flex gap-5">
                    <div className="">
                      <p className="text-white">Card Image</p>
                      { viewData?.card_image && (
                        <Image
                          src={viewData?.card_image}
                          width={200}
                          height={100}
                          alt="image"
                        />
                      )}
                    </div>
                    <div className="">
                      <p className="text-white">Banner Image</p>
                      { viewData?.banner_image && (
                        <Image
                          src={viewData?.banner_image}
                          width={200}
                          height={100}
                          alt="image"
                        />
                      )}
                    </div>
                  </div>
                  <table className="w-full text-left text-[#C7D1DA] mt-6">
                    <tbody>
                      {[
                        {
                          label: "Service Title",
                          value: columnFormatter(viewData?.title),
                        },
                        {
                          label: "Service Description",
                          value: columnFormatter(viewData?.description),
                        },
                        {
                          label: "Short Description",
                          value: columnFormatter(viewData?.short_description),
                        },
                        {
                          label: "Service Category",
                          value: columnFormatter(viewData?.category?.name),
                        },
                        {
                          label: "Payment Type",
                          value: viewData?.payment_type,
                        },
                        {
                          label: "Tags",
                          value: viewData?.tags?.length
                            ? viewData?.tags
                                ?.map((tag) => tag?.name?.[langCode])
                                .join(", ") // Change 'en' to 'bn' if needed
                            : "N/A",
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
    </>
  );
};

export default Services;
