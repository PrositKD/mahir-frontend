"use client";
import { Form, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import BackButton from "../../components/common/backButton";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import { useI18n } from "@/app/contexts/i18n";
import { useAction, useFetch } from "@/app/helper/hooks";
import { deleteFAQ, fetchFAQ, postFAQ, updatedFAQ } from "@/app/helper/backend";
import { columnFormatter, noSelected } from "@/app/helper/utils";

const Faq = () => {
  const [form] = Form.useForm();
  let { languages, langCode } = useI18n();
  const [open, setOpen] = useState(false);
  const [data, getData, { loading }] = useFetch(fetchFAQ);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLang, setSelectedLang] = useState(undefined);

  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const columns = [
    {
      text: "Question",
      dataField: "question",
      formatter: (value) => (
        <span>
          <Tooltip
            title={
              columnFormatter(value)?.length > 50 ? columnFormatter(value) : ""
            }
          >
            <span className="cursor-help">
              {value[langCode]?.length > 50
                ? columnFormatter(value)?.slice(0, 50) + "..."
                : columnFormatter(value)}
            </span>
          </Tooltip>
        </span>
      ),
    },
    {
      text: "Answer",
      dataField: "answer",
      formatter: (value) => (
        <span>
          <Tooltip
            title={
              columnFormatter(value)?.length > 50 ? columnFormatter(value) : ""
            }
          >
            <span className="cursor-help">
              {value[langCode]?.length > 50
                ? columnFormatter(value)?.slice(0, 50) + "..."
                : columnFormatter(value)}
            </span>
          </Tooltip>
        </span>
      ),
    },
  ];
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">FAQ List</h1>
            <BackButton />
          </div>
          {
            data && (
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
                onDelete={deleteFAQ}
                indexed
                langCode={langCode}
              />
            )
          }
          <Modal
            className="dashboardModal xl:!w-[700px]"
            open={open}
            onCancel={() => setOpen(false)}
            title={isEdit ?
              <h2 className="text-[#22F55D] heading-3"> {i18n.t('Edit Faq')} </h2> : <h2 className="text-[#22F55D] heading-3">{i18n.t('Add Faq')}</h2>}
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
                const multiLangFields = ["question", "answer"];
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
                  isEdit ? updatedFAQ : postFAQ,
                  {
                    body: {
                      ...formattedData,
                      _id: values?._id,
                      type: values?.type,
                    }

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
                      name={["question", l.code]}
                      label={i18n?.t("Question")}
                      key={index}
                      required
                      placeholder={i18n?.t("Question")}
                      className="w-full rounded bg-transparent p-3 dashinput"
                    />
                  </div>
                  <FormInput
                    name={["answer", l.code]}
                    label={i18n?.t("Answer")}
                    key={index}
                    required
                    placeholder={i18n?.t("Answer")}
                    className="w-full rounded bg-transparent p-3 dashinput"
                  />
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

export default Faq;
