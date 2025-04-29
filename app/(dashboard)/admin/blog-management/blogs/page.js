/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import {
  blogDelete,
  blogGet,
  blogUpdate,
} from "@/app/helper/backend";
import { useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Form, Image, Modal, Switch, Tooltip } from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Blogs = () => {
  const { langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(blogGet);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLang, setSelectedLang] = useState(undefined);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const columns = [
    {
      text: "Image",
      dataField: "card_image",
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
              columnFormatter(title)?.length > 20 ? columnFormatter(title) : undefined
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
      text: "Short Description",
      dataField: "short_description",
      formatter: (value) => (
        <span>
          <Tooltip
            title={
              columnFormatter(value)?.length > 30 ? columnFormatter(value) : ""
            } 
          >
            <span className="cursor-help">
              {value[langCode]?.length > 30
                ? columnFormatter(value)?.slice(0, 30) + "..."
                : columnFormatter(value)}
            </span>
          </Tooltip>
        </span>
      ),
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
            checked={d?.is_active}
            onChange={() => {
              const newStatus = !d?.is_active;
              useActionConfirm(
                blogUpdate,
                {
                  body: {
                    _id: d?._id,
                    is_active: newStatus,
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
      text: i18n.t("Latest"),
      dataField: "is_latest",
      formatter: (_, d) => {
        return (
          <Switch
            checked={d?.is_latest}
            onChange={() => {
              const newStatus = !d?.is_latest;
              useActionConfirm(
                blogUpdate,
                {
                  body: {
                    _id: d?._id,
                    is_latest: newStatus,
                  },
                },
                getData
              );
            }}
            checkedChildren={
              <span className="text-white">{i18n.t("Latest")}</span>
            }
            unCheckedChildren={
              <span className="text-white">{i18n.t("Not Latest")}</span>
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
            <h1 className="text-[#C7D1DA] xl:text-3xl lg:text-xl text-base">{i18n.t("Blogs List")}</h1>
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
                  window.location.href = "/admin/blog-management/blogs/addBlog";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/blog-management/blogs/editBlog?_id=${values._id}`;
            }}
            onView={handleView}
            onDelete={blogDelete}
            indexed
            langCode={langCode}
            pagination
          />

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
                  <h3 className="heading-3 text-center text-primary">{i18n.t("Blog Details")}</h3>
                  <div className="flex gap-5 items-center mt-6">
                    {viewData?.card_image && 
                    (
                    <Image src={viewData?.card_image} width={200} height={200} alt={viewData?.name} />
                  )}
                  
                    { viewData?.banner_image && (
                      <Image src={viewData?.banner_image} width={200} height={200} alt={viewData?.name} />
                    ) }
                    

                  </div>
                  <table className="w-full mt-6 text-left text-[#C7D1DA]">
                    <tbody>
                      {[
                        { label: "Title", value: columnFormatter(viewData?.title) },
                        { label: "Event Description", value: columnFormatter(viewData?.description) },
                        { label: "Category", value: columnFormatter(viewData?.category?.name) },

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

export default Blogs;
