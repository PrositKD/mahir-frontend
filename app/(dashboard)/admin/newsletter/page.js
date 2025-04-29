"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useAction, useFetch } from "@/app/helper/hooks";
import Table from "../../components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import {
  deleteNewsletter,
  fetchNewsletterList,
  postNewsletterMessage,
} from "@/app/helper/backend";
import { Form, Modal } from "antd";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import Button from "../../components/common/button";
import JodiEditor from "@/app/components/form/jodiEditor";
import BackButton from "../../components/common/backButton";
import { Loader } from "../../components/common/loader";

const NewsLetterList = () => {
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [data, getData, { loading }] = useFetch(fetchNewsletterList);
  const [isReset, setIsReset] = useState(false);
  const [isSendAll, setIsSendAll] = useState(false);
  const [employeId, setEmployeId] = useState("");
  const [mailLoading, setMailLoading] = useState(false);

  const columns = [
    {
      text: "Email",
      dataField: "email",
      formatter: (d) => (d ? <span>{d}</span> : "N/A"),
    },
    {
      text: "Subscribed At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
      ),
    },
    {
      text: i18n.t("Send Mail"),
      dataField: "mailSent",
      formatter: (_, d) => (
        <Button
          className="rounded bg-primary !duration-500 text-[#C7D1DA] hover:text-primary !py-2 !px-4 !text-sm"
          onClick={() => {
            setIsReset(true);
            setEmployeId(d?._id);
            setIsSendAll(false);
          }}
        >
          {i18n.t("Send Mail")}
        </Button>
      ),
    },
  ];

  const handleSendMail = async (values) => {
    setMailLoading(true); // Start loading when "Save" is clicked

    if (!isSendAll) {
      values._id = employeId;
    }

    const submitData = {
      body: { ...values },
    };

    await useAction(
      postNewsletterMessage,
      submitData,
      () => {
        setIsReset(false);
        getData();
        form.resetFields();
        setMailLoading(false); // Stop loading on success
      },
      i18n.t("Mail Sent Successfully")
    ).catch(() => setMailLoading(false)); // Stop loading on error
  };

  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded">
        <div className="flex justify-between px-8 pt-8 items-center">
          <h1 className="text-[#C7D1DA] text-3xl">Newsletter List</h1>
          <BackButton />
        </div>

        <Table
          columns={columns}
          data={data}
          loading={loading}
          onReload={getData}
          onDelete={deleteNewsletter}
          indexed
          pagination
          permission={"user_list"}
          action={
            <Button
              onClick={() => {
                setIsReset(true);
                setIsSendAll(true);
                setEmployeId("");
              }}
            >
              {i18n?.t("Send Mail All")}
            </Button>
          }
        />
      </div>

      <Modal
        className="dashboardModal xl:!w-[700px]"
        open={isReset}
        onCancel={() => {
          setIsReset(false);
          form.resetFields();
        }}
        footer={null}
        title={
          <h2 className="text-[#22F55D] heading-3">
            {i18n?.t(
              isSendAll
                ? "Send Mail To All Newsletter Subscribers"
                : "Send Mail To Newsletter Subscriber"
            )}
          </h2>
        }
      >
        {mailLoading ? (
         
          <div className="h-96 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Form
            form={form}
            onFinish={handleSendMail}
            layout="vertical"
            className="space-y-4"
          >
            {!isSendAll && <HiddenInput name="_id" />}

            <FormInput
              name="subject"
              label={i18n.t("Subject")}
              required
              placeholder={i18n.t("Enter Subject")}
              className="w-full rounded bg-transparent p-3 dashinput"
            />

            <JodiEditor
              name="message"
              label={"Message"}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("message") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("message", newDescription)
              }
            />

            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setIsReset(false)}
                className="bg-[#22F55DCC]/80 text-[#2b2b2b] px-4 py-2 rounded"
              >
                {i18n?.t("Close")}
              </Button>

              <Button
                type="submit"
                loading={mailLoading}
                className="bg-[#22F55DCC]/80 text-[#2b2b2b] px-4 py-2 !rounded"
              >
                {i18n?.t("Send")}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default NewsLetterList;
