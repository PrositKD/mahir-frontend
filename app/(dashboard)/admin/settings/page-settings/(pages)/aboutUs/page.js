/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { Form, Spin } from "antd";
import { useI18n } from "@/app/contexts/i18n";
import { useAction, useFetch } from "@/app/helper/hooks";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormInput from "@/app/components/form/input";
import Button from "@/app/(dashboard)/components/common/button";
import {
  fetchPageContent,
  singleImageUpload,
  updatePageContent,
} from "@/app/helper/backend";
import JodiEditor from "@/app/components/form/jodiEditor";
import { noSelected } from "@/app/helper/utils";

const AboutUs = () => {
  const i18n = useI18n();
  const { languages, langCode } = i18n;
  const [form] = Form.useForm();
  const [lang, setLang] = useState(langCode);
  const [data, getData, { loading }] = useFetch(fetchPageContent, {}, false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imgLoading, setImgLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState(langCode);

  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  useEffect(() => {
    if (lang) {
      getData({ langCode: lang, slug: "about" });
    }
  }, [lang]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.content?.title || "",
        description: data?.content?.description || {},
        coverImage: data?.content?.image ? [{ url: data.content.image }] : [],
        image1: data?.content?.image1 ? [{ url: data.content.image1 }] : [],
        image2: data?.content?.image2 ? [{ url: data.content.image2 }] : [],
        project: {
          iconImg1: data?.content?.project?.iconImg1
            ? [{ url: data.content.project.iconImg1 }]
            : [],
          num_projects: data?.content?.project?.num_projects || "",
        },
        experience: {
          iconImg2: data?.content?.experience?.iconImg2
            ? [{ url: data.content.experience?.iconImg2 }]
            : [],
          year_experiences: data?.content?.experience?.year_experiences || "",
        },
      });
    }
  }, [data]);

  return (
    <div className="w-full overflow-x-auto mb-6 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded">
        <div className="flex justify-between px-6 py-4 items-center">
          <h1 className="text-[#C7D1DA] text-3xl">{i18n?.t("About Us")}</h1>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            let iconUrl1 = values?.project?.iconImg1?.[0]?.url || "";
            let iconUrl2 = values?.experience?.iconImg2?.[0]?.url || "";
            let imageUrl = values?.coverImage?.[0]?.url || "";
            let imageUrl1 = values?.image1?.[0]?.url || "";
            let imageUrl2 = values?.image2?.[0]?.url || "";

            // Upload Cover Image
            if (values?.coverImage?.[0]?.originFileObj) {
              const { data } = await singleImageUpload({
                image: values.coverImage[0].originFileObj,
                image_name: "Cover Image",
              });
              imageUrl = data?.image || "";
            }
            // extra image

            if (values?.image1?.[0]?.originFileObj) {
              const { data } = await singleImageUpload({
                image: values.image1[0].originFileObj,
                image_name: "Image1",
              });
              imageUrl1 = data?.image || "";
            }

            if (values?.image2?.[0]?.originFileObj) {
              const { data } = await singleImageUpload({
                image: values.image2[0].originFileObj,
                image_name: "Image2",
              });
              imageUrl2 = data?.image || "";
            }

            // Upload Project Icon
            if (values?.project?.iconImg1?.[0]?.originFileObj) {
              const { data } = await singleImageUpload({
                image: values.project.iconImg1[0].originFileObj,
                image_name: "Project Icon",
              });
              iconUrl1 = data?.image || "";
            }

            // Upload Experience Icon
            if (values?.experience?.iconImg2?.[0]?.originFileObj) {
              const { data } = await singleImageUpload({
                image: values.experience.iconImg2[0].originFileObj,
                image_name: "Experience Icon",
              });
              iconUrl2 = data?.image || "";
            }

            const payload = {
              body: {
                _id: data?._id,
                slug: "about",
                lang: lang,
                content: {
                  image: imageUrl,
                  image1: imageUrl1,
                  image2: imageUrl2,
                  title: values.title,
                  description: values.description,
                  project: {
                    iconImg1: iconUrl1,
                    num_projects: values?.project?.num_projects,
                  },
                  experience: {
                    iconImg2: iconUrl2,
                    year_experiences: values?.experience?.year_experiences,
                  },
                },
              },
            };

            setSubmitLoading(true);
            return useAction(
              updatePageContent,
              { ...payload },
              () => {
                getData();
                setSubmitLoading(false);
              },
              setSubmitLoading
            );
          }}
        >
          <div className=" p-3 rounded mb-4 pb-5">
            <div className="mb-4 mt-4 flex flex-wrap justify-start gap-3">
              {i18n?.languages?.map((l, index) => (
                <span
                  onClick={() => {
                    setSelectedLang(l?.code);
                  }}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                    l?.code === selectedLang
                      ? "cursor-pointer bg-primary text-white"
                      : "cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  key={index}
                >
                  {l?.name}
                </span>
              ))}
            </div>
            <div>
              <div className="space-y-5 my-2">
                <div className=" rounded-md">
                  <div className="p-3">
                    <MultipleImageInput
                      name={"coverImage"}
                      label={"Cover Image"}
                      required
                    />
                    {imgLoading && <Spin fullscreen />}
                    <div className="flex gap-6">
                    <MultipleImageInput
                      name={"image1"}
                      label={"Side Image 1"}
                      required
                    />
                    <MultipleImageInput
                      name={"image2"}
                      label={"Side Image 2"}
                      required
                    />
                    </div>
                    <FormInput
                      name={"title"}
                      label={"Title"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />
                    {languages?.map((l) => (
                      <div
                        key={l.code}
                        style={{
                          display: l.code === selectedLang ? "block" : "none",
                        }}
                      >
                        <JodiEditor
                          name={["description", l.code]}
                          label={i18n?.t("Description")}
                          className="w-full rounded bg-transparent p-3 dashinput"
                          required
                          value={
                            form.getFieldValue(["description", l.code]) || ""
                          }
                          onChange={(newContent) =>
                            form.setFieldValue(
                              ["description", l.code],
                              newContent
                            )
                          }
                        />
                      </div>
                    ))}

                    <MultipleImageInput
                      name={["project", "iconImg1"]}
                      label="Project Icon"
                      required
                    />
                    <FormInput
                      name={["project", "num_projects"]}
                      label={"Number of Projects"}
                      placeholder={"Ex - 100"}
                      type={"number"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />

                    <MultipleImageInput
                      name={["experience", "iconImg2"]}
                      label={"Experience Icon"}
                      required
                    />

                    <FormInput
                      name={["experience", "year_experiences"]}
                      label={"Experiences"}
                      placeholder={"Ex - 3"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      type={"number"}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                onClick={() => noSelected({ form, setSelectedLang })}
                className="mt-2.5"
                loading={submitLoading}
              >
                {i18n.t("Submit")}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AboutUs;
