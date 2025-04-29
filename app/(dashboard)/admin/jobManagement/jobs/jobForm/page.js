'use client'
import { useEffect, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { Form } from "antd";
import { createJob, getAllJobCategories, updateJob } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import FormSelect from "@/app/components/form/select";
import JodiEditor from "@/app/components/form/jodiEditor";
import FormDatePicker from "@/app/components/form/date_picker";
import Button from "@/app/(dashboard)/components/common/button";
import dayjs from "dayjs";
import { noSelected } from "@/app/helper/utils";
import { useRouter } from "next/navigation";

const JobForm = ({ isEdit = false, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [category] = useFetch(getAllJobCategories, { limit: 100 });
  let { languages, langCode } = useI18n();
  const [date, setDate] = useState(null);
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
        ...setDate(data?.deadline),
        category: data?.category?._id,
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

          const multiLangFields = [
            "title", "job_context", "job_responsibility", "educational_requirement", "experience_requirement", "additional_requirements",
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
            category: values.category,
            deadline: date,
          };
          setSubmitLoading(true);
          await useAction(
            isEdit ? updateJob : createJob,
            { body: requestData },
            () => {
              form.resetFields();
              setSubmitLoading(false);
              router.push("/admin/jobManagement/jobs");
            }
          );
        }}
        className="mt-2"
      >
        {isEdit && <HiddenInput name="_id" />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <FormInput
            label="Company Name"
            name='company_name'
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Company Name")}
          />
          <FormInput
            label="Job position"
            name='job_position'
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Job position")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <FormInput
            label="Job Location"
            name='job_location'
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Job Location")}
          />
          <FormInput
            label="Author Name"
            name='author_name'
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Author Name")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <FormDatePicker
            onChange={(date) => setDate(dayjs(date).format("YYYY-MM-DD"))}
            label="Deadline"
            initialValue={date}
            required
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder="Select Start date"
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
          <FormSelect
            label={i18n.t("Job Type")}
            name="job_type"
            placeholder={i18n.t("Select Job Type")}
            required
            className="w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
            options={[
              { value: "partTime", label: "Part Time" },
              { value: "fullTime", label: "Full Time" },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Vacancy"
            name='vacancy'
            required
            getValueFromEvent={(e) => Number(e.target.value)}
            className="w-full rounded bg-transparent p-3 dashinput"
            placeholder={i18n.t("Vacancy")}
          />
          <FormInput
            label="Salary"
            name='salary'
            required
            type="number"
            className="w-full rounded bg-transparent p-3 dashinput"
            getValueFromEvent={(e) => Number(e.target.value)}
            placeholder={i18n.t("Salary")}
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
                label="Job Title"
                name={["title", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("Title")}
              />
              <FormSelect
                label={i18n.t("Job Category")}
                name="category"
                placeholder={i18n.t("Select Job Category")}
                required
                className="!w-full rounded bg-transparent py-6 px-2 dashinput !text-white"
                options={category?.docs?.map((cat) => ({
                  label: cat?.name[l.code] ?? cat?.name["en"],
                  value: cat?._id,
                }))}
              />
            </div>
            <div>
              <FormInput
                textArea={true}
                rows={3}
                label="Job Context"
                name={["job_context", l.code]}
                required
                className="!w-full rounded bg-transparent p-3 dashinput"
                placeholder={i18n.t("job Context")}
              />
            </div>

            <JodiEditor
              name={["job_responsibility", l.code]}
              label={i18n?.t("Job Responsibility")}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("job_responsibility") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("job_responsibility", newDescription)
              }
            />
            <JodiEditor
              name={["educational_requirement", l.code]}
              label={i18n?.t("Educational Requirement")}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("educational_requirement") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("educational_requirement", newDescription)
              }
            />
            <JodiEditor
              name={["experience_requirement", l.code]}
              label={i18n?.t("Experience Requirement")}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("experience_requirement") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("experience_requirement", newDescription)
              }
            />
            <JodiEditor
              name={["additional_requirements", l.code]}
              label={i18n?.t("Additional Requirements")}
              className="w-full rounded bg-transparent p-3 dashinput"
              required
              value={form.getFieldValue("additional_requirements") || ""}
              onChange={(newDescription) =>
                form.setFieldValue("additional_requirements", newDescription)
              }
            />
          </div>
        ))}

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

export default JobForm