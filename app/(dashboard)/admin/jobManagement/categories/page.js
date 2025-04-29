/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import { useI18n } from "@/app/contexts/i18n";
import {
  createJobCategory,
  deleteJobCategory,
  getAllJobCategories,
  updateJobCategory,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { columnFormatter1, noSelected } from "@/app/helper/utils";
import { Form, Modal } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const EventCategories = () => {
  const [form] = Form.useForm();
  let { languages, langCode } = useI18n();
  const [open, setOpen] = useState(false);
  const [data, getData, { loading }] = useFetch(getAllJobCategories);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLang, setSelectedLang] = useState(undefined);

  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
    getData();
  }, [langCode]);

  const columns = [
    {
      text: "Name",
      dataField: "name",
      formatter: (value) => <p className="capitalize">{columnFormatter1(value)}</p>,
    },
    {
      text: "Created At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
      ),
    },
  ];
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">Job Category List</h1>
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
            onDelete={deleteJobCategory}
            indexed
            langCode={langCode}
            pagination
          />

          <Modal
            className="dashboardModal xl:!w-[700px]"
            open={open}
            onCancel={() => setOpen(false)}
            title={
              isEdit ? (
                <h2 className="text-[#22F55D] heading-3">
                  {i18n.t("Edit Job Category")}
                </h2>
              ) : (
                <h2 className="text-[#22F55D] heading-3">
                  {i18n.t("Add New Job Category")}
                </h2>
              )
            }
            footer={null}
            destroyOnClose={true}
          >
            <div className="flex justify-start flex-wrap gap-3 mt-4">
              {languages?.map((l, index) => (
                <button
                  onClick={() => setSelectedLang(l.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${l.code === selectedLang
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  key={index}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                const multiLangFields = ["name"];
                const formattedData = multiLangFields.reduce((acc, field) => {
                  acc[field] = {};
                  languages?.forEach((lang) => {
                    if (values[field] && values[field][lang.code]) {
                      acc[field][lang.code] = values[field][lang.code];
                    }
                  });
                  return acc;
                }, {});
                return useAction(
                  isEdit ? updateJobCategory : createJobCategory,
                  {
                    body: {
                      ...formattedData,
                      _id: values?._id,
                    },
                  },
                  () => {
                    setOpen(false);
                    getData();
                  }
                );
              }}
              className="mt-2"
            >
              {isEdit && <HiddenInput name="_id" />}

              {languages?.map((l, index) => (
                <div
                  key={index}
                  style={{
                    display: l.code === selectedLang ? "block" : "none",
                  }}
                >
                  <div className="mt-3">
                    <FormInput
                      name={["name", l.code]}
                      label={i18n?.t("Name")}
                      key={index}
                      required
                      placeholder={i18n?.t("Name")}
                      className="w-full rounded bg-transparent p-3 dashinput"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="submit"
                onClick={() => noSelected({ form, setSelectedLang })}
                className="mt-2.5"
              >
                {"Submit"}
              </Button>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EventCategories;
