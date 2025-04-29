"use client";
import UserTable from "@/app/(dashboard)/components/common/userTable";
import { useI18n } from "@/app/contexts/i18n";
import {
  getAllEventBooking,
  getAllOrders,
} from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter, getStatusClass } from "@/app/helper/utils";
import { Empty, Image, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { useCurrency } from "@/app/contexts/site";
const EventBooking = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllEventBooking,);
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
      text: "Ticket",
      dataField: "ticket",
    },
    {
      text: "Event Name",
      dataField: "event",
      formatter: (value) => (
        <Tooltip title={columnFormatter(value?.title)?.length > 20 ? columnFormatter(value?.title) : undefined}>
          <span className="cursor-help">
            {columnFormatter(value?.title)?.length > 20 ? columnFormatter(value?.title)?.slice(0, 20) + "..." : columnFormatter(value?.title)}
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
      text: "Booking Status",
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
        <h4 className={`description-1 font-bold text-white pb-5`}>{i18n.t("Event Booking")}</h4>
        {
          data?.docs?.length > 0 ? (
            <UserTable
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
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={i18n.t("No event booking found")} />
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
                <h2 className="text-[#22F55D] heading-3 text-center">{i18n.t("Booking Details")}</h2>
                <div className="flex gap-5">
                  <div className="">
                    <p className="text-white">{i18n.t("Event Image")}:</p>
                    { viewData?.event?.image && (
                      <Image src={viewData?.event?.image} width={200} height={100} alt="image" />
                      ) }
                    
                  </div>
                </div>
                <table className="w-full text-left text-[#C7D1DA] mt-6">
                  <tbody>
                    {[
                      { label: "Ticket", value: viewData?.ticket },
                      { label: "Event name", value: columnFormatter(viewData?.event?.title) },
                      { label: "Event Location", value: viewData?.event?.location },
                      { label: "Booking Status", value: viewData?.status },
                      { label: "Booking Price", value: `${currency_symbol} ${viewData?.amount}` },
                      { label: "Payment Method", value: viewData?.payment?.method },
                      { label: "Payment Status", value: viewData?.payment?.status },
                      {
                        label: "Event Date",
                        value: dayjs(viewData?.event?.date).format("DD-MMM-YYYY"),
                      },
                      {
                        label: "Start Date",
                        value: dayjs(viewData?.event?.start_date).format("DD-MMM-YYYY"),
                      },
                      {
                        label: "End Date",
                        value: dayjs(viewData?.event?.end_date).format("DD-MMM-YYYY"),
                      },
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

export default EventBooking;
