/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useI18n } from "@/app/contexts/i18n";
import {
  getAllEventBooking,
  updateEventBookingStatus,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Image, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { columnFormatter, getStatusClass } from "@/app/helper/utils";
import { useCurrency } from "@/app/contexts/site";

const AdminEventBooking = ({ limit, title = "Product Orders" }) => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllEventBooking);
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
  const { currency_symbol } = useCurrency();
  const handleStatusChange = async (newStatus, id) => {
    await useAction(updateEventBookingStatus, {
      body: {
        status: newStatus,
        _id: id
      }
    });
    getData();
  };
  const columns = [
    {
      text: "Ticket",
      dataField: "ticket",
    },
    {
      text: "Event Name",
      dataField: "event",
      formatter: (value) => (
        <Tooltip title={columnFormatter(value?.title)?.length > 25 ? columnFormatter(value?.title) : undefined}>
          <span className="cursor-help">
            {columnFormatter(value?.title)?.length > 25 ? columnFormatter(value?.title)?.slice(0, 25) + "..." : columnFormatter(value?.title)}
          </span>
        </Tooltip>
      ),
    },
    {
      text: 'Event Image',
      dataField: 'event',
      formatter: (value) => (
        <TableImage url={value?.image} />
      ),
    },
    {
      text: "User Name",
      dataField: "user",
      formatter: (value) => (
        <Tooltip title={value?.name?.length > 20 ? value?.name : undefined}>
          <span className="cursor-help">
            {value?.name?.length > 20 ? value?.name?.slice(0, 20) + "..." : value?.name}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "Payment Method",
      dataField: "payment",
      formatter: (value) => (
        <span className="capitalize">{value?.method}</span>
      )
    },
    {
      text: i18n.t('Booking Status'),
      dataField: 'status',
      formatter: (_, d) => (
        <div className="dashboardSelect">
          <Select
            value={d?.status || 'pending'}
            onChange={(newStatus) => {
              handleStatusChange(newStatus, d?._id);
            }}
            className="w-28"
            options={
              [
                {
                  label: i18n.t('Pending'),
                  value: 'pending',
                },
                {
                  label: i18n.t('Cancelled'),
                  value: 'cancelled',
                },
                {
                  label: i18n.t('Accepted'),
                  value: 'accepted',
                },
              ]
            }
          />
        </div>
      ),
    },
    {
      text: "Payment Status",
      dataField: "payment",
      formatter: (value) => (
        <span className={getStatusClass(value?.status)}>
          {value?.status ? value?.status : 'N/A'}
        </span>
      )
    },
    {
      text: 'Amount',
      dataField: 'amount',
      formatter: (value) => (
        <p> {currency_symbol} {value}</p>
      )
    },
  ];
  let action = (
    <div className="flex gap-2">
      <div className="dashboardSelect">
        <Select
          allowClear
          placeholder={i18n?.t('Filter Status')}
          style={{ minWidth: 150 }}
          onClear={() => getData({ status: undefined })}
          onChange={(value) => getData({ status: value })}
        >
          <Select.Option value={undefined}>
            {i18n?.t('All')}
          </Select.Option>
          <Select.Option value={'accepted'}>
            {i18n?.t('Accepted')}
          </Select.Option>
          <Select.Option value={'pending'}>
            {i18n?.t('Pending')}
          </Select.Option>
          <Select.Option value={'cancelled'}>
            {i18n?.t('Cancelled')}
          </Select.Option>
        </Select>
      </div>
    </div>
  );

  return (
    <div className={`${limit ? "" : "w-full overflow-x-auto mt-7 dashboardModal"} `}>
      <div className={`${limit ? 'border-none' : 'border-2 border-[#1C2C52] rounded dashboardInput'} `}>
        <div className={`${limit ? "" : "pt-8"} flex justify-between px-8 items-center`}>
          <h1 className="text-[#C7D1DA] xl:text-3xl lg:text-xl text-base">{i18n.t("Event Booking")}</h1>
          <BackButton />
        </div>
        <Table
          columns={columns}
          data={data}
          loading={loading}
          onReload={getData}
          onView={handleView}
          indexed
          action={action}
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
                <h2 className="text-[#22F55D] heading-3 text-center">{i18n.t("Event Booking Details")}</h2>
                <div className="flex gap-5 mt-3">
                  <div className="">
                    <p className="text-white">Event Image:</p>
                    <Image src={viewData?.event?.image} width={200} height={100} alt="image" />
                  </div>
                  <div className="">
                    <p className="text-white">User Image:</p>
                    <Image src={viewData?.user?.image} width={100} height={100} alt="image" />
                  </div>
                </div>
                <table className="w-full text-left text-[#C7D1DA] mt-6">
                  <tbody>
                    {[
                      { label: "Ticket", value: viewData?.ticket },
                      { label: "Event name", value: columnFormatter(viewData?.event?.title) },
                      { label: "Event Price", value: `${currency_symbol} ${viewData?.amount}` },
                      { label: "Order Status", value: viewData?.status },
                      { label: "User Name", value: viewData?.user?.name },
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

export default AdminEventBooking;
