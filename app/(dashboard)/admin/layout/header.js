"use client";
import { Dropdown, Form, Modal, Select, Space, message } from "antd";
import { FaBars } from "react-icons/fa";
import { FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/app/contexts/i18n";
import { useUser } from "@/app/contexts/user";
import FormPassword from "@/app/components/form/password";
import { updatePassword } from "@/app/helper/backend";
import Image from "next/image";
const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, getCurrentUser } = useUser();
  useEffect(() => {
    getCurrentUser();
  }, []);
  const router = useRouter();
  const i18n = useI18n();
  const [arrow, setArrow] = useState('Hide');
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
  }, [arrow]);
  const defaultLang = i18n?.languages?.find((lang) => lang?.default)?.name;

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
    message.success(i18n?.t('Logged out successfully'))
    getCurrentUser();
  }
  const items = [
    {
      label: i18n?.t('Profile'),
      icon: <FiUser />,
      key: '1',
      onClick: () => router.push('/admin/profile'),
    },
    {
      label: i18n?.t('Change Password'),
      icon: <FiLock />,
      key: '2',
      onClick: () => { setOpen(true) },
    },
    {
      label: i18n?.t('Logout'),
      icon: <FiLogOut />,
      key: '3',
      onClick: handleLogout,
    }
  ];


  const langFromLocalStorage = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;

  const [form] = Form.useForm();
  const handleSubmit = async (value) => {
    if (!!value?.oldPassword && !!value?.password && !!value?.confirm_password) {
      const data = await updatePassword({
        body: {
          "old_password": value.oldPassword,
          "password": value.password,
          "confirm_password": value.confirm_password
        }
      });
      if (data.success) {
        message.success(data.message);  
        localStorage.removeItem("token");
        router.push('/login');
        getCurrentUser();
        setOpen(false);
        form.resetFields();
      } else {
        message.error(data.errorMessage);
      }
    }
  }

  return (
    <div className="z-30 header  border-[#1c2c52] border-[1px] shadow-lg backdrop-blur-[25px] drop-shadow-[0px_4px_25px_rgba(0,0,0,0.20)]">
      <div className="flex justify-between items-center p-4 text-white">
        <div className="">
          <FaBars
            className="md:hidden"
            role="button"
            onClick={() => {
              window.document.querySelector('.sidebar').classList.toggle('open')
              window.document.querySelector('.sidebar-overlay').classList.toggle('open')
            }}
          />
        </div>

        <div className="flex items-center gap-x-6 language_select1">
          {defaultLang === undefined ? (
            <p>Select Language</p>
          ) : (
            <div className="flex items-center gap-x-6">
              <div className="!text-white border border-primary/40 languageSelect">
                <Select
                  value={
                    langFromLocalStorage
                      ? i18n?.languages?.find(
                        (lang) => lang?._id === langFromLocalStorage
                      )?.name
                      : i18n?.languages?.find((lang) => lang?.default)?.name
                  }
                  style={{ width: 100, color: "white" }}
                  variant="borderless"
                  onChange={(value) => {
                    i18n?.changeLanguage(value);
                  }}
                  options={i18n?.languages?.map((lang) => ({
                    value: lang?._id,
                    label: lang?.name,
                  }))}
                  className="inline-flex items-center justify-center !text-white capitalize"
                />
              </div>
            </div>
          )}
          <Dropdown
            menu={{
              items,
            }}
          >
            <div className="cursor-pointer flex items-center">
              <Space className="cursor-pointer">
                {
                  user?.image ? (
                    <Image
                      src={user?.image}
                      alt="user"
                      width={40}
                      height={40}
                      className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px] rounded-full"
                    />
                  ) : (
                    <BiUser className="text-lg sm:text-xl" />
                  )
                }
              </Space>
              <p className="text-lg ml-6 capitalize">{user?.role}</p>
            </div>
          </Dropdown>
        </div>
      </div>

      <Modal
        className="dashboardModal xl:!w-[700px]"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <Form className='' layout='vertical' onFinish={handleSubmit} form={form}>
            <h4 className='description-1 font-bold text-white pb-5 border-b !border-primary/20'>Update Password</h4>
            <div className='auth grid grid-cols-1 gap-3 mt-5 '>
              <div>
                <FormPassword className='w-full rounded bg-transparent p-3 dashinput' label='Old Password' name='oldPassword' placeholder='Enter your Old Password' required={true} />
              </div>
              <div className=''>
                <FormPassword className='w-full rounded bg-transparent p-3 dashinput' label='Password' name='password' placeholder='Enter your password' required={true} />
              </div>
              <div className=''>
                <FormPassword className='w-full rounded bg-transparent p-3 dashinput' confirm label='Re-type Password' name='confirm_password' placeholder='Confirm your password' required={true} />
              </div>
            </div>
            <button className=' md:mt-6 sm:mt-5 mt-4 common-btn bg-primary text-[#02050A] !rounded'>Save Changes</button>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Header

