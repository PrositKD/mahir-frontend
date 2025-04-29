/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { Form, Modal, Switch } from "antd";
import { useRouter } from "next/navigation";
import { PiTranslate } from "react-icons/pi";
import { useI18n } from "@/app/contexts/i18n";
import { useAction, useActionConfirm, useFetch } from "@/app/helper/hooks";
import {
  delLanguage,
  fetchAdminLanguages,
  postLanguage,
  putLanguage,
} from "@/app/helper/backend";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import BackButton from "../../components/common/backButton";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import FormSelect from "@/app/components/form/select";

const Languages = () => {
  const i18n = useI18n();
  const { push } = useRouter();
  const [languages, getLanguages, { loading }] = useFetch(
    fetchAdminLanguages,
    {},
    false
  );
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getLanguages();
  }, []);

  const columns = [
    { text: "Name", dataField: "name" },
    { text: "Flag", dataField: "flag" },
    { text: "Code", dataField: "code" },
    {
      text: "Default",
      dataField: "default",
      formatter: (_, d) => (
        <Switch
          checkedChildren={"Active"}
          unCheckedChildren={"Inactive"}
          checked={d?.default}
          onChange={async (e) => {
            await useActionConfirm(
              putLanguage,
              {
                body: {
                  _id: d._id,
                  default: e,
                },
              },
              getLanguages,
              "Are you sure you want to change default language?",
              "Yes, Change"
            );
          }}
          className="bg-gray-500"
        />
      ),
    },
    {
      text: "Status",
      dataField: "active",
      formatter: (_, d) => (
        <Switch
          checkedChildren={"Active"}
          unCheckedChildren={"Inactive"}
          checked={d?.active}
          onChange={async (e) => {
            await useActionConfirm(
              putLanguage,
              {
                body: {
                  _id: d._id,
                  active: e,
                },
              },
              getLanguages,
              "Are you sure you want to change status?",
              "Yes, Change"
            );
          }}
          className="bg-gray-500"
        />
      ),
    },
    {
      text: "RTL",
      dataField: "rtl",
      formatter: (_, d) => <span>{d?.rtl ? "Yes" : "No"}</span>,
    },
  ];

  let actions = ({ _id }) => (
    <button
      className="border border-primary text-primary p-2 rounded"
      title="Edit"
      onClick={() => {
        push("/admin/languages/translations/" + _id);
      }}
    >
      <PiTranslate size={12} />
    </button>
  );

  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded dashboardInput">
        <div className="flex justify-between px-8 pt-8 items-center">
          <h1 className="text-[#C7D1DA] text-3xl">Language List</h1>
          <BackButton />
        </div>
        {i18n && (
          <Table
            columns={columns}
            data={languages}
            title=" "
            onReload={getLanguages}
            loading={loading}
            indexed
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
            onEdit={(values) => {
              form.resetFields();
              form.setFieldsValue({
                ...values,
              });
              setOpen(true);
              setIsEdit(true);
            }}
            onDelete={delLanguage}
            actions={actions}
          />
        )}

        <Modal
          className="dashboardModal xl:!w-[700px]"
          open={open}
          onCancel={() => setOpen(false)}
          title={
            <h2 className="text-[#22F55D] heading-3">
              {i18n.t(isEdit ? "Edit Language" : "Add Language")}
            </h2>
          }
          footer={null}
          destroyOnClose
        >
          {/* Language Switcher */}

          <Form
            form={form}
            layout="vertical"
            onFinish={async (values) => {
              const requestData = {
                ...values,
              };
              await useAction(
                isEdit ? putLanguage : postLanguage,
                { body: requestData },
                () => {
                  setOpen(false);
                  getLanguages();
                }
              );
            }}
            className="mt-2"
          >
            {isEdit && <HiddenInput name="_id" />}
            <FormInput
              name="name"
              label={"Name"}
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Name")}
              required
            />
            <FormInput
              name="code"
              label={"Code"}
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Code")}
            />
            <FormInput
              name="flag"
              label={"Flag"}
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Flag")}
            />
            <FormSelect
              className="w-full rounded bg-transparent px-3 py-[22px] dashinput"
              placeholder={i18n.t("Select Type")}
              name="rtl"
              label={"Rtl Support"}
              required
              options={[
                { label: i18n?.t("Yes"), value: true },
                { label: i18n?.t("No"), value: false },
              ]}
            />

            <Button type="submit">Submit</Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Languages;
