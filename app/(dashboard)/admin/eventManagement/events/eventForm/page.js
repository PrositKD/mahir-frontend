/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { DatePicker, Form } from "antd";
import {
  CreateEvent,
  GetAllEventCategories,
  singleImageUpload,
  UpdateEvent,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormSelect from "@/app/components/form/select";
import JodiEditor from "@/app/components/form/jodiEditor";
import Button from "@/app/(dashboard)/components/common/button";
import dayjs from "dayjs";
import { noSelected } from "@/app/helper/utils";
import { useRouter } from "next/navigation";

const EventForm = ({ isEdit = false, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [category] = useFetch(GetAllEventCategories, { limit: 100 });
  let { languages, langCode } = useI18n();
  const [paid, setPaid] = useState(null);
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
        ...setPaid(data?.payment_type),
        date: dayjs(data?.date),
        start_date: dayjs(data?.start_date),
        end_date: dayjs(data?.end_date),
        amount: Number(data?.fee?.amount),
        discount_type: data?.fee?.discount_type,
        discount_amount: Number(data?.fee?.discount_amount),
        category: data?.category?._id,
        image: data?.image
          ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data?.image,
            },
          ]
          : [],
        organizer_image: data?.organizer_image
          ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data?.organizer_image,
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
          let image = "";
          let organizer_image = "";
      
          if (values?.image?.[0]?.originFileObj) {
            const { data } = await singleImageUpload({
              image: values.image[0].originFileObj,
              image_name: "image",
            });
            image = data?.image || "";
          } else {
            image = values?.image?.[0]?.url || "";
          }
        
          if (values?.organizer_image?.[0]?.originFileObj) {
            const { data } = await singleImageUpload({
              image: values.organizer_image[0].originFileObj,
              image_name: "organizer_image",
            });
            organizer_image = data?.image || "";
          } else {
            organizer_image = values?.organizer_image?.[0]?.url || "";
          }
        
          const multiLangFields = ["title", "description"];
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
            category: values.category,
            image: image,
            organizer_image: organizer_image,
            date: values.date,
            start_date: values.start_date ? values.start_date.format("YYYY-MM-DD") : null,
            end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
          };
      
          if (values.payment_type === "paid") {
            requestData.fee = {
              amount: Number(values.amount),
              discount_type: values.discount_type,
              discount_amount: Number(values.discount_amount),
            };
          }
        
          if (values.payment_type === "paid") {
            delete requestData.amount;
            delete requestData.discount_type;
            delete requestData.discount_amount;
          }
        
          setSubmitLoading(true);
          await useAction(
            isEdit ? UpdateEvent : CreateEvent,
            { body: requestData },
            () => {
              form.resetFields();
              setSubmitLoading(false);
              router.push("/admin/eventManagement/events");
            }
          );
        }}
        
        className="mt-2"
      >
        {isEdit && <HiddenInput name="_id" />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 ">
          <MultipleImageInput label="Event Image" name="image" required />
          <MultipleImageInput
            label="Organizer Image"
            name="organizer_image"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <FormInput
                label="Title"
                name={["title", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("Title")}
              />
              <FormSelect
                label={i18n.t("Event Category")}
                name="category"
                placeholder={i18n.t("Select Event Category")}
                required
                className="!w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
                options={category?.docs?.map((cat) => ({
                  label: cat?.name[l.code] ?? cat?.name["en"],
                  value: cat?._id,
                }))}
              />
            </div>
            <JodiEditor
              name={["description", l.code]}
              label={i18n?.t("Description")}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("description") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("description", newDescription)
              }
            />
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <FormInput
            label="Organizer Name"
            name="organizer_name"
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Organizer Name")}
          />
          <FormInput
            label="Location"
            name="location"
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Location")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <FormInput
            label="Organizer Phone"
            name="organizer_phone"
            required
            type='number'
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Organizer Phone")}
          />
          <FormInput
            label="Organizer Email"
            name="organizer_email"
            required
            type={"email"}
            isEmail={true}
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Organizer Email")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <Form.Item label={i18n?.t("Event Date")} name="date">
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              dis
              className="w-full rounded bg-transparent p-3 dashinput"
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label={i18n?.t("Start Date")} name="start_date">
            <DatePicker
              format="YYYY-MM-DD"
              className="w-full rounded bg-transparent p-3 dashinput"
            />
          </Form.Item>

          <Form.Item label={i18n.t("End Date")} name="end_date">
            <DatePicker
              format="YYYY-MM-DD"
              className="w-full rounded bg-transparent p-3 dashinput"
            />
          </Form.Item>
        </div>
        <FormSelect
          label={i18n.t("Payment Type")}
          name="payment_type"
          placeholder={i18n.t("Select Payment Type")}
          required
          onChange={(value) => setPaid(value)}
          className="w-full mt-1 rounded bg-transparent py-6 px-2 dashinput !text-white"
          options={[
            { value: "paid", label: "Paid" },
            { value: "free", label: "Free" },
          ]}
        />
        {paid == "paid" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <FormInput
              label={i18n.t("Price")}
              name="amount"
              type="number"
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Input Price")}
            />
            <FormSelect
              label={i18n.t("Discount Type")}
              name="discount_type"
              placeholder={i18n.t("Select Discount Type")}
              required
              className="w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
              options={[
                { value: "percentage", label: "Percentage" },
                { value: "flat", label: "Flat" },
              ]}
            />
            <FormInput
              label={i18n.t("Discount Amount")}
              name="discount_amount"
              type="number"
              required
              className="w-full rounded bg-transparent p-3 dashinput"
              placeholder={i18n.t("Discount Amount")}
            />
          </div>
        )}
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
  );
};

export default EventForm;
