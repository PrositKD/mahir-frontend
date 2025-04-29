'use client'
import { useEffect, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { Form } from "antd";
import { CreateProvider, GetPublicServiceCategories, singleImageUpload, UpdateProvider } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormSelect from "@/app/components/form/select";
import Button from "@/app/(dashboard)/components/common/button";
import { columnFormatter, noSelected } from "@/app/helper/utils";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";
const ProviderForm = ({ isEdit = false, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [category] = useFetch(GetPublicServiceCategories, { limit: 100 });
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
        expert: data?.expert?._id,
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
          if (values?.image?.[0]?.originFileObj) {
            const { data } = await singleImageUpload({
              image: values.image[0].originFileObj,
              image_name: "image",
            });
            image = data?.image || "";
          } else {
            image = values?.image?.[0]?.url || "";
          }
          const multiLangFields = [
            "title", "about", "professional_info", "guidelines"
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
            image: image,
          };
          setSubmitLoading(true);
          await useAction(
            isEdit ? UpdateProvider : CreateProvider,
            { body: requestData },
            () => {
              form.resetFields();
              setSubmitLoading(false);
              router.push("/admin/provider");
            }
          );
        }}
        className="mt-2"
      >
        {isEdit && <HiddenInput name="_id" />}

        <div className="mt-5">
          <MultipleImageInput
            label="Provider Image"
            name="image"
            required
          />
        </div>
        <FormInput
          label="Provider Name"
          name='name'
          required
          className="w-full rounded bg-transparent p-3 dashinput"
          placeholder={i18n.t(" Provider Name")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <FormInput
            label="Provider Phone"
            name='phone'
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Provider Phone")}
          />
          <FormInput
            label="Provider Email"
            name='email'
            required
            type={"email"}
            isEmail={true}
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Provider Email")}
          />
        </div>
        {languages?.map((l) => (
          <div
            key={l.code}
            style={{
              display: l.code === selectedLang ? "block" : "none",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                textArea={true}
                label="Title"
                name={["title", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("Title")}
              />
              <FormInput
                textArea={true}
                label="About"
                name={["about", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("About")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                textArea={true}
                label="Professional Information"
                name={["professional_info", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("Professional Information")}
              />
              <FormInput
                textArea={true}
                label="Guidelines"
                name={["guidelines", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("Guidelines")}
              />
            </div>
            <FormSelect
              label={i18n.t("Experts")}
              name="expert"
              initialValue={columnFormatter(data?.expert?.name)}
              placeholder={i18n.t("Select Expert Category")}
              required
              className="!w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
              options={category?.docs?.map((cat) => ({
                label: cat?.name[l.code] ?? cat?.name["en"],
                value: cat?._id,
              }))}
            />
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <FormInput
            label="Facebook Url"
            name='facebook_url'
            required
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Facebook Url")}
          />
          <FormInput
            label="Instagram Url"
            name='instagram_url'
            required
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("instagram_url")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Twitter Url"
            name='x_url'
            required
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Twitter Url")}
          />
          <FormInput
            label="Linkedin Url"
            name='linkedin_url'
            required
            className="!w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Linkedin Url")}
          />
        </div>
        <Form.List
          name="dynamic_records"
        >
          {(fields, { add, remove }) => (
            <div className="mt-6">
              {fields.map(
                ({ key: fieldKey, name: fieldName }) => (
                  <div
                    key={fieldKey}
                    className=""
                  >
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {i18n.t("Add Skills Now")} 
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <FormInput
                        name={[fieldName, 'key']}
                        placeholder="Enter Skill Name"
                        type={"text"}
                        required
                        className='!w-full rounded bg-transparent p-3 dashinput'
                        label="Skill Name"
                      />
                      <FormInput
                        getValueFromEvent={(e) => Number(e.target.value) || 0}
                        name={[fieldName, 'value',]}
                        placeholder={`ex: 60, 70, 80, 90`}
                        type='number'
                        required
                        className='!w-full rounded bg-transparent p-3 dashinput'
                        label={`Enter skill parentage`}
                      />
                    </div>
                    <div className="text-right mt-3">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-primary"
                          onClick={() =>
                            remove(fieldName)
                          }
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  add({
                    key: '',
                    value: 0,
                  })
                }
                className="bg-primary text-white px-4 py-2 rounded-md "
              >
                Add New Skill
              </button>
            </div>
          )}
        </Form.List>
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

export default ProviderForm