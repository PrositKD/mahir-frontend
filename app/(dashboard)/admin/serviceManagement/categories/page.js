/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import { useI18n } from "@/app/contexts/i18n";
import {
  CreateServiceCategory,
  DeleteServiceCategory,
  GetAllServiceCategories,
  singleImageUpload,
  UpdateServiceCategory,
} from "@/app/helper/backend";
import { useAction, useActionConfirm, useFetch } from "@/app/helper/hooks";
import { columnFormatter1, noSelected } from "@/app/helper/utils";
import { Form, Modal, Switch } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ServiceCategories = () => {
  const [form] = Form.useForm();
  let { languages, langCode } = useI18n();
  const [open, setOpen] = useState(false);
  const [data, getData, { loading }] = useFetch(GetAllServiceCategories);
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
      formatter: (value) => columnFormatter1(value),
    },
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
      text: "Created At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
      ),
    },
    {
      text: i18n.t("Status"),
      dataField: "status",
      formatter: (_, d) => {
        return (
          <Switch
            checked={d?.status}
            onChange={() => {
              const newStatus = !d?.status;
              useActionConfirm(
                UpdateServiceCategory,
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
  ];
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">Service Category List</h1>
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
                image: values?.image
                  ? [
                    {
                      uid: "-1",
                      name: "image.png",
                      status: "done",
                      url: values?.image,
                    },
                  ]
                  : [],
              });
              setOpen(true);
              setIsEdit(true);
            }}
            onDelete={DeleteServiceCategory}
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
                  {i18n.t("Edit Service Category")}
                </h2>
              ) : (
                <h2 className="text-[#22F55D] heading-3">
                  {i18n.t("Add New Service Category")}
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
              onFinish={async (values) => {
                let image;
                if (!values?.image?.[0]?.url) {
                  const { message, data } =
                    await singleImageUpload({
                      image: values?.image?.[0]
                        ?.originFileObj,
                    });
                  if (data) {
                    image = data?.image;
                  } else {
                    console.error(
                      'Image upload failed:',
                      message,
                    );
                  }
                } else {
                  image = values?.image?.[0]?.url;
                }
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
                  isEdit ? UpdateServiceCategory : CreateServiceCategory,
                  {
                    body: {
                      ...formattedData,
                      ...values,
                      image: image,
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
              <MultipleImageInput
                max={1}
                name="image"
                label={i18n?.t("Image")}
                required
                placeholder={i18n?.t("Image")}
                className="w-full rounded bg-transparent p-3 dashinput"
              />
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

export default ServiceCategories;
