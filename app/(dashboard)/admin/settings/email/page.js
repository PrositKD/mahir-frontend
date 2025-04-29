"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { Loader } from "@/app/(dashboard)/components/common/loader";
import GmailEmailProvider from "@/app/(dashboard)/components/gmail";
import SendGridManageEmail from "@/app/(dashboard)/components/sendGridManageEmail";
import { useI18n } from "@/app/contexts/i18n";
import { fetchEmailSettings } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { Tabs, Form } from "antd";
import React, { useEffect, useState } from "react";

const EmailSettings = () => {
  const [form] = Form.useForm();
  const i18n = useI18n();
  const [settings, getSettings, { loading }] = useFetch(fetchEmailSettings);
  
  const [checkedValue, setCheckedValue] = useState(false);

  useEffect(() => {
    if (settings?._id) {
      form.resetFields();
    }
  }, [settings]);

  const tabItems = [
    {
      label: i18n?.t("SendGrid SMTP") || "SendGrid SMTP",
      key: "1",
      children: (
        <SendGridManageEmail
          settings={settings}
          getSettings={getSettings}
          loading={loading}
          checkedValue={checkedValue}
          setCheckedValue={setCheckedValue}
        />
      ),
    },
    {
      label: i18n?.t("Gmail Provider") || "Gmail Provider",
      key: "2",
      children: (
        <GmailEmailProvider
          settings={settings}
          getSettings={getSettings}
          loading={loading}
          checkedValue={checkedValue}
          setCheckedValue={setCheckedValue}
        />
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full overflow-x-auto mt-7 dashboardModal">
          <div className="border-2 border-[#1c2c52] rounded">
            <div className="flex justify-between px-8 pt-8 items-center">
              <h1 className="text-[#C7D1DA] text-3xl">Email Settings</h1>
              <BackButton />
            </div>
            <div className="p-4 rounded emailTab !text-[#C7D1DA]">
              <Tabs defaultActiveKey="1" centered type="card" items={tabItems} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailSettings;
