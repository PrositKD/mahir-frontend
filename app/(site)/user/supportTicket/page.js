/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/app/(dashboard)/components/common/button";
import UserTable from "@/app/(dashboard)/components/common/userTable";
import FormInput from "@/app/components/form/input";
import FormSelect from "@/app/components/form/select";
import { useI18n } from "@/app/contexts/i18n";
import {
  createSupportTicketByUser,
  deleteSupportTicket,
  getAllSupportTicketsByUser,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";

const SupportTicket = () => {
  const [form] = Form.useForm();
  let { languages, langCode } = useI18n();
  const [open, setOpen] = useState(false);
  const [data, getData, { loading }] = useFetch(getAllSupportTicketsByUser);
  const [isEdit, setIsEdit] = useState(false);
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
        <Tooltip title={title?.length > 20 ? title : undefined}>
          <span className="cursor-help">
            {title?.length > 20 ? title.slice(0, 20) + "..." : title}
          </span>
        </Tooltip>
      ),
    },
    {
      text: "Subject",
      dataField: "subject",
      formatter: (title) => (
        <Tooltip title={title?.length > 20 ? title : undefined}>
          <span className="cursor-help">
            {title?.length > 20 ? title.slice(0, 20) + "..." : title}
          </span>
        </Tooltip>
      ),
    },
    {
      text: 'Priority',
      dataField: 'priority',
      formatter: (value) => (
        value == 1 ? "Urgent"
          : value == 2 ? "High"
            : value == 3 ? "Medium"
              : "Low"
      )
    },

  ];
  return (
    <div className="w-full overflow-x-auto dashboardModal">
      <div className="dashboardInput">
        <h4 className='description-1 font-bold text-white pb-5'>{i18n.t("All Support Ticket")}</h4>
        <UserTable
          columns={columns}
          data={data}
          loading={loading}
          onReload={getData}
          action={
            <Button
              onClick={() => {
                form.resetFields();
                setOpen(true);
                setIsEdit(false);
              }}
            >
              {"Add New"}
            </Button>
          }
          onView={handleView}
          onDelete={deleteSupportTicket}
          indexed
          langCode={langCode}
          pagination
        />
        {/* Add Modal */}
        <Modal
          className="dashboardModal xl:!w-[700px]"
          open={open}
          onCancel={() => setOpen(false)}
          title={
            <h2 className="text-[#22F55D] heading-3">
              {i18n.t('Add New Support Ticket')}
            </h2>
          }
          footer={null}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={async (values) => {
              await useAction(
                createSupportTicketByUser,
                { body: values },
                () => {
                  setOpen(false);
                  getData();
                }
              );
            }}
            className="mt-2"
          >
            <FormInput
              label="Title"
              name='title'
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Title")}
            />
            <FormInput
              label="Subject"
              name='subject'
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Subject")}
            />
            <FormSelect
              label="Priority"
              name="priority"
              required
              options={[
                { label: "Argent", value: 1 },
                { label: "High", value: 2 },
                { label: "Medium", value: 3 },
                { label: "Low", value: 4 },
              ]}
              className="w-full mt-1 rounded bg-transparent py-6 px-2 dashinput !text-white"
              placeholder={i18n.t("Select Priority")}
            />
            <FormInput
              textArea={true}
              rows={4}
              label="Description"
              name='description'
              required
              className="w-full rounded bg-transparent p-3 dashinput"
            />
            <Button
              type="submit"
              className="mt-2.5"
            >
              {"Submit"}
            </Button>
          </Form>
        </Modal>

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

                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={index < 20 ? "border border-gray-200" : ""}
                      >
                        <td className="py-2 px-4 font-semibold text-[#C7D1DA] whitespace-pre">
                          {i18n.t(item.label)}
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
