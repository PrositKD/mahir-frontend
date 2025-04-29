/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from "antd";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { useSearchParams } from "next/navigation";
import { AssignPermissions, GetAllPermission, GetAllRoles } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { useI18n } from "@/app/contexts/i18n";
import { useUser } from "@/app/contexts/user";

export const loader = () => {
  return {
    API_URL: process.env.API_URL || "",
  };
};

const Role = () => {
  const [role, getRole, { loading }] = useFetch(GetAllRoles, {}, false);
  
  const searchParams = useSearchParams();
  const permissionId = searchParams.get("_id");
  const [data] = useFetch(GetAllPermission);
  const [permissions, setPermissions] = useState([]);
  const { user, getCurrentUser } = useUser();
  useEffect(() => {
    getCurrentUser();
  }, []);
  const admin = user?.role === "admin";
  const i18n = useI18n();

  useEffect(() => {
    if (permissionId) {
      getRole({ _id: permissionId });
    }
  }, [permissionId]);
  
  useEffect(() => {
    if (role?._id) {
      setPermissions(role?.permissions || []);
    }
  }, [role]);

  const isChecked = (permissionKey) =>
    permissions.includes(permissionKey);

  const handleChange = (
    e,
    permissionKey,
    isMain = false
  ) => {
    const checked = e.target.checked;
    if (isMain) {
      const relatedPermissions = [
        `${permissionKey}_create`,
        `${permissionKey}_edit`,
        `${permissionKey}_delete`,
        `${permissionKey}_view`,
      ];

      if (checked) {
        setPermissions((prev) => [...new Set([...prev, permissionKey, ...relatedPermissions])]);
      } else {
        setPermissions((prev) => prev.filter((perm) => ![permissionKey, ...relatedPermissions].includes(perm)));
      }
    } else {
      if (checked) {
        setPermissions((prev) => [...prev, permissionKey]);
      } else {
        setPermissions((prev) => prev.filter((perm) => perm !== permissionKey));
      }
    }
  };


  const renderCheckbox = (key, isMain = false) => (
    <Checkbox
      checked={isChecked(key)}
      onChange={(e) => handleChange(e, key, isMain)}
    />
  );

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      width: "40px",
      render: (_, record) => renderCheckbox(record.permission, true),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "200px",
    },
    {
      title: "Create",
      dataIndex: "create",
      width: "200px",
      render: (_, record) =>
        renderCheckbox(`${record.permission}_create`),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      width: "200px",
      render: (_, record) =>
        renderCheckbox(`${record.permission}_edit`),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "200px",
      render: (_, record) =>
        renderCheckbox(`${record.permission}_delete`),
    },
    {
      title: "View",
      dataIndex: "view",
      width: "200px",
      render: (_, record) =>
        renderCheckbox(`${record.permission}_view`),
    },
  ];

  const handleSave = async () => {
    try {
      await useAction(AssignPermissions, {
        body: {
          role: permissionId, permissions
        }
      },);
      window.location.href = '/admin/rolePermission';
    } catch (error) {
      console.error("Error saving permissions:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded dashboardInput xl:p-[30px] lg:p-6 md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <h2 className="pt-3 pb-2 text-xl text-primary font-medium">Roles Permission: {role?.name}</h2>
          </div>
          <BackButton />
        </div>
        <div className="overflow-x-auto mt-6">
          <div className="">
            {data && (
              <Table
                className="custom-table12"
                pagination={false}
                columns={columns}
                dataSource={data?.map((item, index) => ({
                  ...item,
                  key: index,
                }))}
                bordered
              />
            )}
            <button
              className="px-4 py-2 bg-primary text-white rounded mt-4"
              onClick={handleSave}
            >
              {i18n.t("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
