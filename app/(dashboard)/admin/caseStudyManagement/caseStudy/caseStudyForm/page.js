/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { Form } from "antd";
import { createCaseStudy, getAllCaseStudyTags, getAllCaseStudyCategories, singleImageUpload, updateCaseStudy } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormSelect from "@/app/components/form/select";
import Button from "@/app/(dashboard)/components/common/button";
import { noSelected } from "@/app/helper/utils";
import { useRouter } from "next/navigation";
const CaseStudyForm = ({ isEdit = false, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [category] = useFetch(getAllCaseStudyCategories, { limit:100 });
  const [tags] = useFetch(getAllCaseStudyTags, {limit:100});
  let { languages, langCode } = useI18n();
  const [selectedLang, setSelectedLang] = useState(langCode);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);
  useEffect(() => {
    if (isEdit && data) {
      form.resetFields();
      form.setFieldsValue({
        ...data,
        category: data?.category?._id,
        tags: data?.tags?.map((tag) => tag?._id),
        banner_image: data?.banner_image
          ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data?.banner_image,
            },
          ]
          : [],
        card_image: data?.card_image
          ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data?.card_image,
            },
          ]
          : [],
      });
    }
  }, [data, form, isEdit]);
  return (
    <div className="">
      <div className="flex justify-start flex-wrap gap-3 mt-4">
        {languages?.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelectedLang(l.code)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${l.code === selectedLang
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {l.name}
          </button>
        ))}
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          let banner_image = "";
          let card_image = "";
          if (values?.banner_image?.[0]?.originFileObj) {
            const { data } = await singleImageUpload({
              image: values.banner_image[0].originFileObj,
              image_name: "image",
            });
            banner_image = data?.image || "";
          } else {
            banner_image = values?.banner_image?.[0]?.url || "";
          }

          if (values?.card_image?.[0]?.originFileObj) {
            const { data } = await singleImageUpload({
              image: values.card_image[0].originFileObj,
              image_name: "image",
            });
            card_image = data?.image || "";
          } else {
            card_image = values?.card_image?.[0]?.url || "";
          }
          const multiLangFields = [
            "title", "description", 'result', 'challenge','problem','solution',
          ];
          const formattedData = multiLangFields.reduce((acc, field) => {
            acc[field] = {};
            languages?.forEach((lang) => {
              acc[field][lang?.code] = values[field]?.[lang?.code] || "";
            });
            return acc;
          }, {});
          const requestData = {
            ...values,
            ...formattedData,
            _id: isEdit ? values._id : undefined,
            banner_image: banner_image,
            card_image: card_image
          };
          setSubmitLoading(true);
          await useAction(
            isEdit ? updateCaseStudy : createCaseStudy,
            { body: requestData },
            () => {
              form.resetFields();
              setSubmitLoading(false);
              router.push("/admin/caseStudyManagement/caseStudy");
            }
          );
        }}
        className="mt-2"
      >
        {isEdit && <HiddenInput name="_id" />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <MultipleImageInput
            label="Banner Image"
            name="banner_image"
            required
          />
          <MultipleImageInput
            label="Card Image"
            name="card_image"
            required
          />
        </div>
        {languages?.map((l) => (
          <div
            key={l.code}
            style={{
              display: l.code === selectedLang ? "block" : "none",
            }}
          >
            <FormInput
              rows={2}
              label="Case Study Title"
              name={["title", l.code]}
              required
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Title")}
            />
            <FormInput
              textArea={true}
              label="Case Study Result"
              name={["result", l.code]}
              required
              rows={3}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Result")}
            />
            <FormInput
              textArea={true}
              label="Case Study Description"
              name={["description", l.code]}
              required
              rows={4}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Description")}
            />
            <FormInput
              textArea={true}
              label="Case Study Challenge"
              name={["challenge", l.code]}
              required
              rows={4}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Challenge")}
            />
            <FormInput
              textArea={true}
              label="Case Study Problem"
              name={["problem", l.code]}
              required
              rows={4}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Problem")}
            />
            <FormInput
              textArea={true}
              label="Case Study Solution"
              name={["solution", l.code]}
              required
              rows={4}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Case Study Solution")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label={i18n.t("Case Study Category")}
                name="category"
                placeholder={i18n.t("Select Case Study Category")}
                required
                className="!w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
                options={category?.docs?.map((cat) => ({
                  label: cat?.name[l.code] ?? cat?.name["en"],
                  value: cat?._id,
                }))}
              />
              <div className="multiselect">
                <FormSelect
                  label={i18n.t("Case Study Tags")}
                  name="tags"
                  placeholder={i18n.t("Select Blog Tags")}
                  required
                  multi
                  className="w-full rounded bg-transparent p-2 dashinput !text-white"
                  options={tags?.docs?.map((tag) => ({
                    label: tag?.name[l.code] ?? tag?.name["en"],
                    value: tag?._id,
                  }))}
                />
              </div>
            </div>
          </div>
        ))}
        <FormInput
          label="Case Study client"
          type='text'
          name='client'
          required={true}
          className="!w-full rounded bg-transparent p-3 dashinput"
          placeholder={i18n.t("Case Study client")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Case Study Duration"
            type='number'
            name='duration'
            required={true}
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Case Study Duration")}
          />
          <FormInput
            label="Case Study Budget"
            type='number'
            name='budget'
            required={true}
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Case Study Budget")}
          />
        </div>

        <Button
          type="submit"
          onClick={() => noSelected({ form, setSelectedLang })}
          className="mt-6"
          loading={submitLoading}
        >
          {i18n.t("Submit")}
        </Button>
      </Form>
    </div>
  )
}

export default CaseStudyForm