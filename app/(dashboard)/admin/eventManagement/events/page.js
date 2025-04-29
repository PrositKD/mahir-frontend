/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import { useCurrency } from "@/app/contexts/site";
import {
  DeleteEvent,
  getAllEventBooking,
  GetAllEvents,
  UpdateEvent,
} from "@/app/helper/backend";
import { useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Empty, Modal, Switch, Tooltip } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Events = () => {
  let { languages, langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(GetAllEvents);
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewParticipantModalOpen, setViewParticipantModalOpen] = useState(false)
  const [viewData, setViewData] = useState(null)
  const [participateData, setParticipateData] = useState(null)


  const i18n = useI18n();
  const { currency_symbol } = useCurrency();

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
      text: "Title",
      dataField: "title",
      formatter: (title) => (
        <span>
          <Tooltip
            title={
              columnFormatter(title)?.length > 40 ? columnFormatter(title) : undefined
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
      text: "Event Date",
      dataField: "date",
      formatter: (_, d) => (
        <span>{dayjs(d?.date).format("DD MMM YYYY")}</span>
      ),
    },
    {
      text: "View Participant",
      dataField: "_id",
      formatter: (d) => (
        <button onClick={() => handleParticipant(d)} className="px-4 py-2 border border-primary/50">{"View"}</button>
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

  const [bookingData, getBookingData] = useFetch(getAllEventBooking, {}, false);
  const handleParticipant = (value) => {
    getBookingData({ event: value });
    setViewParticipantModalOpen(true)
    setParticipateData(bookingData)
  }
  useEffect(() => {
    if (viewParticipantModalOpen) {
      setParticipateData(bookingData);
    }
  }, [bookingData, viewParticipantModalOpen]);
  const handleView = (value) => {
    setViewModalOpen(true)
    setViewData(value)
  }
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded dashboardInput">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">{i18n.t("Event List")}</h1>
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
                  window.location.href = "/admin/eventManagement/events/addEvent";
                }}
              >
                {"Add New"}
              </Button>
            }
            onEdit={(values) => {
              window.location.href = `/admin/eventManagement/events/editEvent?_id=${values._id}`;
            }}
            onView={handleView}
            onDelete={DeleteEvent}
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
                  <h3 className="heading-3 text-center text-primary">{i18n.t("Event Details")}</h3>
                  <table className="w-full text-left mt-6 text-[#C7D1DA]">
                    <tbody>
                      {[
                        { label: "Event Title", value: columnFormatter(viewData?.title) },
                        { label: "Event Description", value: columnFormatter(viewData?.description) },
                        { label: "Organizer Name", value: viewData?.organizer_name },
                        { label: "Location", value: viewData?.location },
                        {
                          label: "Event Date",
                          value: dayjs(viewData?.date).format("DD-MMM-YYYY"),
                        },
                        {
                          label: "Start Date",
                          value: dayjs(viewData?.start_date).format("DD-MMM-YYYY"),
                        },
                        {
                          label: "End Date",
                          value: dayjs(viewData?.end_date).format("DD-MMM-YYYY"),
                        },
                        { label: "Event Category", value: columnFormatter(viewData?.category?.name) },
                        { label: "Payment Type", value: viewData?.payment_type },

                        viewData?.payment_type === 'paid' && [
                          { label: "Price", value: ` ${currency_symbol} ${viewData?.fee?.amount}` },
                          { label: "Discount Type", value: viewData?.fee?.discount_type },
                          viewData?.fee?.discount_type === 'percentage' ? {
                            label: "Discount Amount",
                            value: `${viewData?.fee?.discount_amount}%`,
                          } : {
                            label: "Discount Amount",
                            value: `${currency_symbol} ${viewData?.fee?.discount_amount}`,
                          }
                        ],
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
          {/* view participant modal */}
          <Modal
            className="dashboardModal"
            open={viewParticipantModalOpen}
            onCancel={() => { setViewParticipantModalOpen(false), setParticipateData(null) }}
            footer={null}
            destroyOnClose
            width={350}
            centered
          >
            {participateData && (
              <div className="modal-wrapper p-6 rounded-lg shadow-lg">
              <div className="mt-3">
                <h3 className="text-xl heading-3 font-semibold text-center text-primary">
                  {i18n.t("Booking Participants")}
                </h3>
                {participateData?.docs?.length > 0 ? (
                  <div className="w-full mt-6 space-y-2">
                    {participateData.docs.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center border border-primary/20 py-3 px-4 rounded-lg`}
                      >
                        <span className="text-textBody font-medium">{index + 1}</span>
                        <span className="text-gray-400 font-semibold">{item?.user?.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center mt-6">
                    <Empty description="No Participants Found" />
                  </div>
                )}
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
