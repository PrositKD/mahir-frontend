"use client";
import UserTable from "@/app/(dashboard)/components/common/userTable";
import { useI18n } from "@/app/contexts/i18n";
import {
  getAllOrders,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter, getStatusClass } from "@/app/helper/utils";
import { Empty, Image, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { useCurrency } from "@/app/contexts/site";
const ProductOrder = ({ limit, title = "Product Orders" }) => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllOrders, limit ? { limit: limit } : {});
  const [selectedLang, setSelectedLang] = useState(undefined);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const i18n = useI18n();
  const { currency_symbol } = useCurrency();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const handleView = (value) => {
    setViewModalOpen(true)
    setViewData(value)
  }
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
            {value?.name?.length > 20 ? value?.name?.slice(0, 20) + "..." : value?.name}
          </span>
        </Tooltip>
      ),
    },
    {
      text: 'Amount',
      dataField: 'amount',
      formatter: (value) => (
        <p> {currency_symbol} {value}</p>
      )
    },
    {
      text: "Payment Method",
      dataField: "payment",
      formatter: (value) => (
        <span className="capitalize">{value?.method}</span>
      )
    },
    {
      text: "Order Status",
      dataField: "status",
      formatter: (value) => (
        <span className={getStatusClass(value)}>
          {value ? value : 'N/A'}
        </span>
      )
    },

  ];
  return (
    <div className="w-full overflow-x-auto dashboardModal">
      <div className="dashboardInput">
        <h4 className={`description-1 font-bold text-white ${limit ? 'pb-0' : 'pb-5'}`}>{i18n.t(title)}</h4>
        {
          data?.docs?.length > 0 ? (
            <UserTable
              title={limit && " "}
              columns={columns}
              data={data}
              loading={loading}
              onReload={getData}
              onView={handleView}
              indexed
              langCode={langCode}
              pagination
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={i18n.t("No product orders found")} />
          )
        }
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
                <h2 className="text-[#22F55D] heading-3 text-center">{i18n.t("Order Details")}</h2>
                <div className="flex gap-5">
                  <div className="">
                    <p className="text-white">{i18n.t("Product Image")}:</p>
                    <Image src={viewData?.product?.thumb_image} width={200} height={100} alt="image" />
                  </div>
                </div>
                <table className="w-full text-left text-[#C7D1DA] mt-6">
                  <tbody>
                    {[
                      { label: "Order Id", value: viewData?.orderId },
                      { label: "Product name", value: viewData?.name },
                      { label: "Product category", value: columnFormatter(viewData?.product?.category?.name) },
                      { label: "Product Price", value: `${currency_symbol} ${viewData?.amount}` },
                      { label: "Order Status", value: viewData?.status },
                      { label: "Payment Method", value: viewData?.payment?.method },
                      { label: "Payment Status", value: viewData?.payment?.status },
                      { label: "Order Date", value: dayjs(viewData?.createdAt).format("DD MMM YYYY"), },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={index < 20 ? "border border-gray-200" : ""}
                      >
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                          {i18n.t(item.label)}
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

export default ProductOrder;
