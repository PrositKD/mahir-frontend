/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { Form } from "antd";
import { CreateService, getAllServiceTags, GetPublicServiceCategories, singleImageUpload, UpdateService } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormSelect from "@/app/components/form/select";
import Button from "@/app/(dashboard)/components/common/button";
import { noSelected } from "@/app/helper/utils";
import { useRouter } from "next/navigation";
const ServiceForm = ({ isEdit = false, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [category] = useFetch(GetPublicServiceCategories, { limit: 100 });
  const [tags] = useFetch(getAllServiceTags, { limit: 100 });
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
            "title", "short_description", "description"
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
            isEdit ? UpdateService : CreateService,
            { body: requestData },
            () => {
              form.resetFields();
              setSubmitLoading(false);
              router.push("/admin/serviceManagement/service");
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
              label="Service Title"
              name={["title", l.code]}
              required
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Service Title")}
            />
            <FormInput
              textArea={true}
              label="Service Description"
              name={["description", l.code]}
              required
              rows={4}
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Service Description")}
            />
            <FormInput
              textArea={true}
              rows={3}
              label="Short Description"
              name={["short_description", l.code]}
              required
              className="!w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Short Description")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label={i18n.t("Service Category")}
                name="category"
                placeholder={i18n.t("Select Service Category")}
                required
                className="!w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
                options={category?.docs?.map((cat) => ({
                  label: cat?.name[l.code] ?? cat?.name["en"],
                  value: cat?._id,
                }))}
              />
              <div className="multiselect">
                <FormSelect
                  label={i18n.t("Service Tags")}
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

        <div className="mt-5">
          <FormInput
            label="Video Url"
            type={"text"}
            name='video_url'
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Video Url")}
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

export default ServiceForm