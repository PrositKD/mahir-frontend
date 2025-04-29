"use client";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import BackButton from "../../components/common/backButton";
import Table from "../../components/common/table";
import { useI18n } from "@/app/contexts/i18n";
import { useFetch } from "@/app/helper/hooks";
import {
    deleteContact,
  deleteFAQ,
  getAllContacts,
} from "@/app/helper/backend";
import dayjs from "dayjs";

const Contact = () => {
  let {  langCode } = useI18n();
  const [data, getData, { loading }] = useFetch(getAllContacts);
  const [selectedLang, setSelectedLang] = useState(undefined);

  const i18n = useI18n();
  useEffect(() => {
    setSelectedLang(langCode);
  }, [langCode]);

  const columns = [
    {
      text: "Name",
      dataField: "name",
    },
    {
      text: "Email",
      dataField: "email",
    },
    {
      text: "Subject",
      dataField: "subject",
      formatter: (subject) => {
        const formattedTitle = subject || ""; // Ensure it's accessible
        const shouldTruncate = formattedTitle.length > 20;

        return (
          <Tooltip title ={shouldTruncate ? formattedTitle : ""}>
            <span className="cursor-help">
              {shouldTruncate
                ? formattedTitle.slice(0, 20) + "..."
                : formattedTitle}
            </span>
          </Tooltip>
        );
      },
    },
    {
      text: "Message",
      dataField: "message",
      formatter: (value) => {
        const formattedValue = value || ""; // Ensure it's accessible
        const shouldTruncate = formattedValue.length > 30;

        return (
          <Tooltip title={shouldTruncate ? formattedValue : ""}>
            <span className="cursor-help">
              {shouldTruncate
                ? formattedValue.slice(0, 30) + "..."
                : formattedValue}
            </span>
          </Tooltip>
        );
      },
    },
    {
      text: "Contact At",
      dataField: "createdAt",
      formatter: (_, d) => (
        <span>{dayjs(d?.createdAt).format("DD MMM, YYYY")}</span>
      ),
    },
  ];
  return (
    <>
      <div className="w-full overflow-x-auto mt-7 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">Contact List</h1>
            <BackButton />
          </div>
          {data && (
            <Table
              columns={columns}
              data={data}
              loading={loading}
              onReload={getData}
              pagination
              onDelete={deleteContact}
              indexed
              langCode={langCode}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
