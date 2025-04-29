/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { CreateRoles, DeleteARole, GetAllRoles, UpdateRole, UpdateRoles } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import { FiPlus } from "react-icons/fi";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import { useI18n } from "@/app/contexts/i18n";

const Role = () => {
  const [roleData, getRoleData, { loading }] = useFetch(GetAllRoles);
  const i18n = useI18n();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      text: i18n?.t("Registered At") || "Registered At",
      dataField: "createdAt",
      formatter: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      text: i18n?.t("Name") || "Name",
      dataField: "name",
    },
  ];

  const handleResetPassword = async (values) => {
    values._id = employeId;
    const submitData = {
      ...values,
    };
    return useAction(
      postChangePassword,
      submitData,
      () => {
        setIsReset(false);
        getRoleData();
        form.resetFields();
      },
      i18n.t("Password Changed Successfully")
    );
  };


  return (
    <div className="w-full overflow-x-auto mt-7 dashboardModal">
      <div className="border-2 border-[#1C2C52] rounded dashboardInput">
        {
          i18n &&
          <Table
            columns={columns}
            loading={loading}
            data={roleData}
            onReload={getRoleData}
            onDelete={DeleteARole}
            onEdit={(data) => {
              form.setFieldsValue(data);
              setOpenModal(true);
            }}
            indexed
            action={
              <Button
                onClick={() => {
                  form.resetFields();
                  setOpenModal(true);
                }}
              >
                {i18n.t("Add Role")}
              </Button>
            }
            actions={(data) => {
              return (
                <button
                  className="btn btn-outline-success btn-sm rounded border border-blue-700 p-2 text-blue-700 hover:bg-blue-700 hover:text-white focus:shadow-none"
                  title={i18n.t("add")}
                  onClick={() => {
                    window.location.href = `/admin/rolePermission/permission?_id=${data._id}`;
                  }}
                >
                  <FiPlus />
                </button>
              );
            }}
          />
          
        }
      </div>
      <Modal
        className="dashboardModal"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={(values) => {

          const editData = {
            ...values,
            _id: values._id,
          };
          if (values._id) {
            useAction(UpdateRoles, {
              body: {
                ...editData,
              },
            }, () => {
              setOpenModal(false);
              getRoleData();
            });
          }
          else {
            useAction(CreateRoles, {
              body: {
                name: values?.name,
              },
            }, () => {
              setOpenModal(false);
              getRoleData();
            });
          }

        }}
        >
          <HiddenInput name="_id" />
          {
            form.getFieldValue("_id") ? (<p className="text-primary description-1">Edit Role</p>) : (<p className="text-primary description-1">Add Role</p>)
          }
          <div className="mt-6">
            <FormInput
              className='w-full rounded bg-transparent p-3 dashinput'
              name="name"
              label={i18n.t("Role Name")}
              required
              placeholder="Enter role name"
            />
          </div>
          <Button className="mt-6" type="submit">
            {i18n.t("Submit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Role;
