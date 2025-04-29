/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import { useI18n } from "@/app/contexts/i18n";
import { getAllOrders, updateOrderStatus } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Image, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { columnFormatter, getStatusClass } from "@/app/helper/utils";
import { useCurrency } from "@/app/contexts/site";
const AdminProductOrders = ({ limit, title = "Product Orders" }) => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(
    getAllOrders,
    limit ? { limit: limit } : {}
  );
  const [selectedLang, setSelectedLang] = useState(undefined);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const { currency_symbol } = useCurrency();
  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const handleView = (value) => {
    setViewModalOpen(true);
    setViewData(value);
  };
  const handleStatusChange = async (newStatus, id) => {
    await useAction(updateOrderStatus, {
      body: {
        status: newStatus,
        _id: id,
      },
    });
    getData();
  };
  const columns = [
    {
      text: "Order ID",
      dataField: "orderId",
    },
    {
      text: "Product Name",
      dataField: "product",
      formatter: (value) => (
        <Tooltip title={value?.name?.length > 20 ? value?.name : undefined}>
          <span className="cursor-help">
            {value?.name?.length > 20
              ? value?.name?.slice(0, 20) + "..."
              : value?.name}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "Product Image",
      dataField: "product",
      formatter: (value) => <TableImage url={value?.thumb_image} />,
    },
    {
      text: "User Name",
      dataField: "user",
      formatter: (value) => (
        <Tooltip title={value?.name?.length > 20 ? value?.name : undefined}>
          <span className="cursor-help">
            {value?.name?.length > 20
              ? value?.name?.slice(0, 20) + "..."
              : value?.name}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "Payment Method",
      dataField: "payment",
      formatter: (value) => <span className="capitalize">{value?.method}</span>,
    },
    {
      text: i18n.t("Order Status"),
      dataField: "status",
      formatter: (_, d) => (
        <div className="dashboardSelect">
          <Select
            value={d?.status || "pending"}
            onChange={(newStatus) => {
              handleStatusChange(newStatus, d?._id);
            }}
            className="w-28 "
            options={[
              {
                label: i18n.t("Pending"),
                value: "pending",
              },
              {
                label: i18n.t("Cancelled"),
                value: "cancelled",
              },
              {
                label: i18n.t("Accepted"),
                value: "accepted",
              },
            ]}
          />
        </div>
      ),
    },
    {
      text: "Payment Status",
      dataField: "payment",
      formatter: (value) => (
        <span className={getStatusClass(value?.status)}>
          {value?.status ? value?.status : "N/A"}
        </span>
      ),
    },
    {
      text: "Amount",
      dataField: "amount",
      formatter: (value) => (
        <p>
          {" "}
          {currency_symbol} {value}
        </p>
      ),
    },
  ];
  let action = (
    <div className="flex gap-2">
      <div className="dashboardSelect">
        <Select
          allowClear
          placeholder={i18n?.t("Filter Status")}
          style={{ minWidth: 150 }}
          onClear={() => getData({ status: undefined })}
          onChange={(value) => getData({ status: value })}
        >
          <Select.Option value={undefined}>{i18n?.t("All")}</Select.Option>
          <Select.Option value={"accepted"}>
            {i18n?.t("Accepted")}
          </Select.Option>
          <Select.Option value={"pending"}>{i18n?.t("Pending")}</Select.Option>
          <Select.Option value={"cancelled"}>
            {i18n?.t("Cancelled")}
          </Select.Option>
        </Select>
      </div>
    </div>
  );
  return (
    <div
      className={`${
        limit ? "" : "w-full overflow-x-auto mt-7 dashboardModal"
      } `}
    >
      <div
        className={`${
          limit
            ? "border-none"
            : "border-2 border-[#1C2C52] rounded dashboardInput"
        } `}
      >
        <div
          className={`${
            limit ? "" : "pt-8"
          } flex justify-between px-8 items-center`}
        >
          <h1 className="text-[#C7D1DA] xl:text-3xl lg:text-xl text-base">
            {!limit && i18n.t(title)}
          </h1>
          {!limit && <BackButton />}
        </div>
        <div className={`${limit ? " !-mt-6" : ""} `}>
          <Table
            title={limit && title}
            columns={columns}
            data={data}
            loading={loading}
            onReload={getData}
            onView={handleView}
            indexed
            langCode={langCode}
            pagination
            action={!limit && action}
          />
        </div>
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
              <div className="mt-8">
                <h2 className="text-[#22F55D] heading-3 text-center">
                  { i18n.t("Order Details")}
                </h2>
                <div className="flex gap-5">
                  <div className="">
                    <p className="text-white">Product Image:</p>
                    { viewData?.product?.thumb_image && (
                      <Image
                        src={viewData?.product?.thumb_image}
                        width={200}
                        height={100}
                        alt="image"
                      />
                    )}
                  </div>
                  <div className="">
                    <p className="text-white">User Image:</p>
                    { viewData?.user?.image && (
                      <Image
                        src={viewData?.user?.image}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    )}
                  </div>
                </div>
                <table className="w-full text-left text-[#C7D1DA] mt-6">
                  <tbody>
                    {[
                      { label: "Order Id", value: viewData?.orderId },
                      { label: "Product name", value: viewData?.name },
                      {
                        label: "Product category",
                        value: columnFormatter(
                          viewData?.product?.category?.name
                        ),
                      },
                      {
                        label: "Product Price",
                        value: `${currency_symbol} ${viewData?.amount}`,
                      },
                      { label: "Order Status", value: viewData?.status },
                      { label: "User Name", value: viewData?.user?.name },
                      {
                        label: "Payment Method",
                        value: viewData?.payment?.method,
                      },
                      {
                        label: "Payment Status",
                        value: viewData?.payment?.status,
                      },
                      {
                        label: "Order Date",
                        value: dayjs(viewData?.createdAt).format("DD MMM YYYY"),
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={index < 20 ? "border border-gray-200" : ""}
                      >
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                          {item.label}
                        </td>
                        <td className={`py-2 px-4 text-[#C7D1DA] capitalize`}>
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

export default AdminProductOrders;
