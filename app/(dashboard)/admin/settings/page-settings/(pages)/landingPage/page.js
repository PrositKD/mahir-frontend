/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { Form, Spin, theme } from "antd";
import { useI18n } from "@/app/contexts/i18n";
import { useAction, useFetch } from "@/app/helper/hooks";
import MultipleImageInput from "@/app/components/form/multiImage";
import FormInput from "@/app/components/form/input";
import Button from "@/app/(dashboard)/components/common/button";
import {
  fetchPageContentTheme1,
  singleImageUpload,
  updatePageContent,
} from "@/app/helper/backend";
import JodiEditor from "@/app/components/form/jodiEditor";
import { noSelected } from "@/app/helper/utils";
import FormSelect from "@/app/components/form/select";
import { get } from "http";

const LandingPage = () => {
  const i18n = useI18n();
  const { languages, langCode } = i18n;
  const [form] = Form.useForm();
  const [data, getData] = useFetch(fetchPageContentTheme1, {}, false);
  const [data2, getData2] = useFetch(fetchPageContentTheme1, {}, false);
  const [data3, getData3] = useFetch(fetchPageContentTheme1, {}, false);
  const [data4, getData4] = useFetch(fetchPageContentTheme1, {}, false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState(langCode);
  const [selectedTheme, setSelectedTheme] = useState("one");
  const [imgLoading, setImgLoading] = useState(false);
  const selectedId =
    selectedTheme === "one"
      ? data?._id
      : selectedTheme === "two"
      ? data2?._id 
      :selectedTheme === "three" 
      ? data3?._id 
      : data4?._id;
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  useEffect(() => {
    getData({ theme: "one" });
    getData2({ theme: "two" });
    getData3({ theme: "three" });
    getData4({ theme: "four" });
  }, []);

  useEffect(() => {
    if (!data && !data2 && !data3 && !data4) return;

    let selectedData = null;

    if (selectedTheme === "one") {
      selectedData = data;
    } else if (selectedTheme === "two") {
      selectedData = data2;
    } else if (selectedTheme === "three") {
      selectedData = data3;
    } else if (selectedTheme === "four") {
      selectedData = data4;
    }

    if (!selectedData) return;

    let formValues = { theme: selectedTheme, status: selectedData?.status };

    const heroData = selectedData?.content?.hero;

    if (heroData) {
      formValues.hero = {
        image1: heroData?.image1 ? [{ url: heroData.image1 }] : [],
        image2: heroData?.image2 ? [{ url: heroData.image2 }] : [],
        image3: heroData?.image3 ? [{ url: heroData.image3 }] : [],
        // image4: heroData?.image4 ? [{ url: heroData.image4 }] : [],
      };

      formValues.heading = heroData?.heading || "";
      formValues.description = heroData?.description || "";
      formValues.short_description = heroData?.short_description || "";
      formValues.video = heroData?.video || "";
    }

    if (selectedTheme === "one") {
      formValues.about_heading =
        selectedData?.content?.about?.about_heading || "";
      formValues.about_description =
        selectedData?.content?.about?.about_description || "";
      formValues.image = selectedData?.content?.about?.image
        ? [{ url: selectedData.content.about.image }]
        : [];
    } else if (selectedTheme === "two") {
      formValues.hero.image1 = selectedData?.content?.hero?.image1
        ? [{ url: selectedData.content.hero.image1 }]
        : [];
      formValues.hero.image2 = selectedData?.content?.hero?.image2
        ? [{ url: selectedData.content.hero.image2 }]
        : [];
      formValues.hero.image3 = selectedData?.content?.hero?.image3
        ? [{ url: selectedData.content.hero.image3 }]
        : [];
    } else if (selectedTheme === "three") {
      delete formValues.short_description;
      delete formValues.video;

    } 
    else if (selectedTheme === "four") {
      formValues.heading = heroData?.heading || "";
      formValues.short_description = heroData?.short_description || "";
      formValues.hero.image4 = selectedData?.content?.hero?.image4
        ? [{ url: selectedData.content.hero.image4 }]
        : [];
      formValues.video = heroData?.video || "";
    }

    const currentValues = form.getFieldsValue();
    const isValuesChanged =
      JSON.stringify(currentValues) !== JSON.stringify(formValues);

    if (isValuesChanged) {
      form.setFieldsValue(formValues);
    }
  }, [data, data2, data3, data4, selectedTheme]);
  return (
    <div className="w-full overflow-x-auto mb-6 dashboardModal">
      <div className="border-2 border-[#1c2c52] rounded">
        <div className="flex justify-between px-6 py-4 items-center">
          <h1 className="text-[#C7D1DA] text-3xl">
            {i18n?.t("Home Page Settings")}
          </h1>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            let selectedTheme = "";
            if (data?._id === selectedId) {
              selectedTheme = data.theme;
            } else if (data2?._id === selectedId) {
              selectedTheme = data2.theme;
            } else if (data3?._id === selectedId) {
              selectedTheme = data3.theme;
            } else if (data4?._id === selectedId) {
              selectedTheme = data4.theme;
            } 
            else {
              console.error("⚠️ No theme found for selectedId:", selectedId);
            }

            let image = values?.image?.[0]?.url || "";
            let image1 = values?.hero?.image1?.[0]?.url || "";
            let image2 = values?.hero?.image2?.[0]?.url || "";
            let image3 = values?.hero?.image3?.[0]?.url || "";
            let image4 = values?.hero?.image4?.[0]?.url || "";

            // Set loading state to true as soon as we start processing
            setSubmitLoading(true);

            try {
              // Upload image if selected
              if (selectedTheme === "one") {
                // For Theme One: Upload hero and about images
                if (values?.image?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.image[0].originFileObj,
                    image_name: "About Image",
                  });
                  image = data?.image || "";
                }

                if (values?.hero?.image1?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image1[0].originFileObj,
                    image_name: "Hero Image 1",
                  });
                  image1 = data?.image || "";
                }

                if (values?.hero?.image2?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image2[0].originFileObj,
                    image_name: "Hero Image 2",
                  });
                  image2 = data?.image || "";
                }

                if (values?.hero?.image3?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image3[0].originFileObj,
                    image_name: "Hero Image 3",
                  });
                  image3 = data?.image || "";
                }
              } else if (selectedTheme === "two" || selectedTheme === "three") {
                if (values?.hero?.image1?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image1[0].originFileObj,
                    image_name: "Hero Image 1",
                  });
                  image1 = data?.image || "";
                }

                if (values?.hero?.image2?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image2[0].originFileObj,
                    image_name: "Hero Image 2",
                  });
                  image2 = data?.image || "";
                }

                if (values?.hero?.image3?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image3[0].originFileObj,
                    image_name: "Hero Image 3",
                  });
                  image3 = data?.image || "";
                }

              } else if (selectedTheme === "four") {
                if (values?.hero?.image4?.[0]?.originFileObj) {
                  const { data } = await singleImageUpload({
                    image: values.hero.image4[0].originFileObj,
                    image_name: "Hero Image 1",
                  });
                  image4 = data?.image || "";
                }
              }


              const payload = {
                body: {
                  _id: selectedId,
                  slug: "home_page",
                  theme: selectedTheme,
                  status: values.status,
                  content: {}, // Ensure content is set properly
                },
              };

              if (selectedTheme === "one") {
                payload.body.content = {
                  hero: {
                    heading: values.heading,
                    description: values.description,
                    short_description: values.short_description,
                    image1,
                    image2,
                    image3,
                    video: values.video,
                  },
                  about: {
                    about_heading: values.about_heading,
                    about_description: values.about_description,
                    image,
                  },
                };
              } else if (selectedTheme === "two") {
                payload.body.content = {
                  hero: {
                    heading: values.heading,
                    description: values.description,
                    short_description: values.short_description,
                    image1,
                    image2,
                    image3,
                    video: values.video,
                  },
                };
              } else if (selectedTheme === "three") {
                payload.body.content = {
                  hero: {
                    heading: values.heading,
                    description: values.description,
                    image1,
                    image2,
                    image3,
                  },
                };
              } else if (selectedTheme === "four") {
                payload.body.content = {
                  hero: {
                    heading: values.heading,
                    short_description: values.short_description,
                    image4,
                    video: values.video,
                  },
                };
              }

              // Call the action to update the page content
              return useAction(
                updatePageContent,
                { ...payload },
                () => {
                  getData();
                  getData2();
                  getData3();
                  getData4(); // Refresh the data
                  setSubmitLoading(false); // Stop the loading spinner
                  // form.resetFields(); // Reset the form
                },
                setSubmitLoading(true) // Set the submit loading state back to false when the action completes
              );
            } catch (error) {
              console.error("Image upload failed:", error);
              setSubmitLoading(false); // Ensure we stop loading even in case of failure
            }
          }}
        >
          <div className="p-3 rounded mb-4 pb-5">
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
            {/* Theme Selection */}
            <FormSelect
              label={i18n.t("Theme")}
              name="theme"
              placeholder={i18n.t("Select Theme")}
              required
              className="w-full mt-1 rounded bg-transparent py-6 px-2 dashinput !text-white"
              options={[
                { label: "One", value: "one" },
                { label: "Two", value: "two" },
                { label: "Three", value: "three" },
                { label: "Four", value: "four" },
              ]}
              onChange={(value) => setSelectedTheme(value)}
            />

            {/* Status Selection */}
            <FormSelect
              label={i18n.t("Status")}
              name="status"
              placeholder={i18n.t("Select Status")}
              required
              className="w-full mt-1 rounded bg-transparent py-6 px-2 dashinput !text-white"
              options={[
                { label: "Active", value: true },
                { label: "Inactive", value: false },
              ]}
              // onChange={(value) => form.setFieldsValue({ status: value === true })}
            />

            {/* Conditionally Render Fields Based on Theme */}
            {selectedTheme === "one" && (
              <div>
                {languages?.map((l) => (
                  <div
                    key={l.code}
                    style={{
                      display: l.code === selectedLang ? "block" : "none",
                    }}
                  >
                    <FormInput
                      name={["heading", l.code]}
                      label={"Heading"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />
                    <FormInput
                      name={["short_description", l.code]}
                      label={"Short Description"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />

                    <JodiEditor
                      name={["description", l.code]}
                      label={i18n?.t("Description")}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                      value={form.getFieldValue(["description", l.code]) || ""}
                      onChange={(newContent) =>
                        form.setFieldValue(["description", l.code], newContent)
                      }
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <MultipleImageInput
                    name={["hero", "image1"]}
                    label={"Cover Image"}
                    required
                  />
                  {imgLoading && <Spin fullscreen />}

                  <MultipleImageInput
                    name={["hero", "image2"]}
                    label="Image 1"
                    required
                  />
                  <MultipleImageInput
                    name={["hero", "image3"]}
                    label="Image 2"
                    required
                  />
                </div>

                <FormInput
                  name={"video"}
                  label={"Video Link"}
                  placeholder={"Ex - 3"}
                  className="w-full rounded bg-transparent p-3 dashinput"
                  type={"url"}
                  required
                />

                <div>
                  {languages?.map((l) => (
                    <div
                      key={l.code}
                      style={{
                        display: l.code === selectedLang ? "block" : "none",
                      }}
                    >
                      <FormInput
                        name={["about_heading", l.code]}
                        label={"About Heading"}
                        placeholder={"Ex: Our Journey: From Vision to Reality"}
                        className="w-full rounded bg-transparent p-3 dashinput"
                        required
                      />

                      <JodiEditor
                        name={["about_description", l.code]}
                        label={i18n?.t("About Description")}
                        className="w-full rounded bg-transparent p-3 dashinput"
                        required
                        value={
                          form.getFieldValue(["about_description", l.code]) ||
                          ""
                        }
                        onChange={(newContent) =>
                          form.setFieldValue(
                            ["about_description", l.code],
                            newContent
                          )
                        }
                      />
                    </div>
                  ))}
                  <MultipleImageInput
                    name={"image"}
                    label="About Image"
                    required
                  />
                </div>
              </div>
            )}

            {selectedTheme === "two" && (
              <div>
                {languages?.map((l) => (
                  <div
                    key={l.code}
                    style={{
                      display: l.code === selectedLang ? "block" : "none",
                    }}
                  >
                    <FormInput
                      name={["heading", l.code]}
                      label={"Heading"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />
                    <FormInput
                      name={["short_description", l.code]}
                      label={"Short Description"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />

                    <JodiEditor
                      name={["description", l.code]}
                      label={i18n?.t("Description")}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                      value={form.getFieldValue(["description", l.code]) || ""}
                      onChange={(newContent) =>
                        form.setFieldValue(["description", l.code], newContent)
                      }
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <MultipleImageInput
                    name={["hero", "image1"]}
                    label={"Cover Image"}
                    required
                  />
                  {imgLoading && <Spin fullscreen />}

                  <MultipleImageInput
                    name={["hero", "image2"]}
                    label="Image 1"
                    required
                  />
                  <MultipleImageInput
                    name={["hero", "image3"]}
                    label="Image 2"
                    required
                  />
                </div>

                <FormInput
                  name={"video"}
                  label={"Video Link"}
                  placeholder={"Ex - 3"}
                  className="w-full rounded bg-transparent p-3 dashinput"
                  type={"url"}
                  required
                />
              </div>
            )}

            {selectedTheme === "three" && (
              <div>
                <div>
                  {languages?.map((l) => (
                    <div
                      key={l.code}
                      style={{
                        display: l.code === selectedLang ? "block" : "none",
                      }}
                    >
                      <FormInput
                        name={["heading", l.code]}
                        label={"Heading"}
                        placeholder={"Ex: Our Journey: From Vision to Reality"}
                        className="w-full rounded bg-transparent p-3 dashinput"
                        required
                      />
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <MultipleImageInput
                      name={["hero", "image1"]}
                      label={"Cover Image"}
                      required
                    />
                    {imgLoading && <Spin fullscreen />}

                    <MultipleImageInput
                      name={["hero", "image2"]}
                      label="Image 1"
                      required
                    />
                    <MultipleImageInput
                      name={["hero", "image3"]}
                      label="Image 2"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {/* start theme 4 */}
            {selectedTheme === "four" && (
              <div>
                {languages?.map((l) => (
                  <div
                    key={l.code}
                    style={{
                      display: l.code === selectedLang ? "block" : "none",
                    }}
                  >
                    <FormInput
                      name={["heading", l.code]}
                      label={"Heading"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />
                    <FormInput
                      name={["short_description", l.code]}
                      label={"Short Description"}
                      placeholder={"Ex: Our Journey: From Vision to Reality"}
                      className="w-full rounded bg-transparent p-3 dashinput"
                      required
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <MultipleImageInput
                    name={["hero", "image4"]}
                    label={"Cover Image"}
                    required
                  />
                  {imgLoading && <Spin fullscreen />}
                </div>

                <FormInput
                  name={"video"}
                  label={"Video Link"}
                  placeholder={"Ex - 3"}
                  className="w-full rounded bg-transparent p-3 dashinput"
                  type={"url"}
                  required
                />
              </div>
            )}
            {/* end theme4 */}

            {/* Submit Button */}
            <Button
              type="submit"
              onClick={() => noSelected({ form, setSelectedLang })}
              className="mt-2.5"
              loading={submitLoading}
            >
              {i18n.t("Submit")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;
