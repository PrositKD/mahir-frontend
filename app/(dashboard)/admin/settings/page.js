/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  fetchSettings,
  postSettings,
  singleImageUpload,
} from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form } from "antd";
import { Loader } from "../../components/common/loader";
import BackButton from "../../components/common/backButton";
import FormInput from "@/app/components/form/input";
import MultipleImageInput from "@/app/components/form/multiImage";
import Button from "../../components/common/button";
import { use, useEffect } from "react";
import FormSelect from "@/app/components/form/select";
import { useI18n } from "@/app/contexts/i18n";
export default function Setting() {
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [data, getData, { loading }] = useFetch(fetchSettings);
  useEffect(() => {
    if (data) {
      getData();
    }
  }, []);
  const handleSubmit = async (values) => {
    if (!values?.site_logo[0]?.url) {
      const { data } = await singleImageUpload({
        image: values?.site_logo[0]?.originFileObj,
      });

      values.site_logo = data?.image || "";
    } else {
      values.site_logo = values?.site_logo[0]?.url || "";
    }
    let partnerImages = [];

    if (values?.partner?.length > 0) {
      const uploadPromises = values.partner.map(async (file) => {
        if (!file.url) {
          const { data } = await singleImageUpload({
            image: file.originFileObj,
          });
          return data?.image || "";
        }
        return file.url;
      });

      partnerImages = await Promise.all(uploadPromises);
    }


    const socialMediaLinks = [
      { name: "facebook", link: values?.facebook },
      { name: "twitter", link: values?.twitter },
      { name: "instagram", link: values?.instagram },
      { name: "linkedin", link: values?.linkedin },
      { name: "youtube", link: values?.youtube },
    ].filter((item) => item.link);

    const requestBody = {
      body: {
        site_name: values?.site_name,
        site_email: values?.site_email,
        site_phone: values?.site_phone,
        site_address: values?.site_address,
        site_description: values?.site_description,
        site_logo: values?.site_logo,
        currency_code: values?.currency_code,
        currency_symbol: values?.currency_symbol,
        file_upload_type: values?.file_upload_type,
        otp_verification_type: values?.otp_verification_type,
        client_side_url: values?.client_side_url,
        server_side_url: values?.server_side_url,
        social_media_link: socialMediaLinks,
        partner: partnerImages,
      },
    };

    await useAction(postSettings, requestBody, () => {
      getData();
    });
  };

  useEffect(() => {
    if (data) {
      const socialMediaValues = {};
      data?.social_media_link?.forEach((item) => {
        socialMediaValues[item.name] = item.link;
      });

      form.setFieldsValue({
        ...data,
        ...socialMediaValues,
        site_logo:
          data?.site_logo?.length > 0
            ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: data?.site_logo,
              },
            ]
            : [],
        partner:
          data?.partner?.length > 0
            ? data.partner.map((url, index) => ({
              uid: `${index}`,
              name: `partner-image-${index}.png`,
              status: "done",
              url,
            }))
            : [],
      });
    }
  }, [data, form]);

  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">Site Settings</h1>
            <BackButton />
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full login-form1 mt-6 shadow-md p-7 rounded-lg">
              <Form
                className="w-full"
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
              >
                <MultipleImageInput
                  name="site_logo"
                  label="Upload Logo"
                  required
                />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                  <FormInput
                    name="site_name"
                    placeholder="Name"
                    label="Name"
                    type="text"
                    className="w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="site_description"
                    placeholder="Description"
                    label="Description"
                    type="text"
                    className="w-full rounded bg-transparent p-3 dashinput"
                    required
                  />

                  <FormInput
                    name="site_email"
                    placeholder="Email"
                    isEmail
                    type="email"
                    label="Email"
                    className="w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="site_phone"
                    placeholder="Phone Number"
                    label="Phone Number"
                    type="tel"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />

                  <FormInput
                    name="site_address"
                    placeholder="Address"
                    label="Address"
                    type="text"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormSelect
                    label={i18n.t("File Upload Type")}
                    name="file_upload_type"
                    placeholder={i18n.t("Select Upload Type")}
                    required
                    className="w-full rounded bg-transparent px-2 py-[23px] dashinput"
                    options={[
                      { label: "Local", value: "local" },
                      { label: "Amazon S3", value: "s3" },
                    ]}
                  />
                  <FormSelect
                    label={i18n.t("Otp Verification Type")}
                    name="otp_verification_type"
                    placeholder={i18n.t("Select Otp Type")}
                    required
                    className="w-full rounded bg-transparent px-2 py-[23px] dashinput"
                    options={[
                      { label: "Email", value: "email" },
                      { label: "Phone Number", value: "phone" },
                    ]}
                  />
                  <FormInput
                    name="client_side_url"
                    placeholder="Enter Client Side URL"
                    label="Client Side URL"
                    type="url"
                    className="w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="server_side_url"
                    placeholder="Enter Server Side URL"
                    label="Server Side URL"
                    type="url"
                    className="w-full rounded bg-transparent p-3 dashinput"
                    required
                  />

                  <FormInput
                    name="facebook"
                    placeholder="Facebook"
                    label="Facebook Link"
                    type="url"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="twitter"
                    placeholder="Twitter Link"
                    label="Twitter Link"
                    type="url"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="instagram"
                    placeholder="Instagram Link"
                    label="Instagram Link"
                    type="url"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="linkedin"
                    placeholder="Linkedin Link"
                    label="Linkedin Link"
                    type="url"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="youtube"
                    placeholder="Youtube Link"
                    label="Youtube Link"
                    type="url"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="currency_code"
                    placeholder="Enter Currency Code"
                    label="Currency Code"
                    type="text"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                  <FormInput
                    name="currency_symbol"
                    placeholder="Currency Symbol"
                    label="Currency Symbol"
                    type="text"
                    className=" w-full rounded bg-transparent p-3 dashinput"
                    required
                  />
                </div>
                <MultipleImageInput
                  name="partner"
                  label="Partnership"
                  required
                  max={12}
                />
                <Button className="mt-10" children="submit" type="submit" />
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
