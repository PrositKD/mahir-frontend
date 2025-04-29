'use client'
import FormPassword from "@/app/components/form/password";
import { useI18n } from "@/app/contexts/i18n";
import { useUser } from "@/app/contexts/user";
import { updatePassword } from "@/app/helper/backend";
import { Form, message } from 'antd';
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const i18n = useI18n();
  const router = useRouter();
  const { user, getCurrentUser } = useUser();
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
        router.push("/login");
        getCurrentUser();
        form.resetFields();
      } else {
        message.error(data.errorMessage);
      }
    }
  }
  return (
    <div>
      <Form className='' layout='vertical' onFinish={handleSubmit} form={form}>
        <h4 className='description-1 font-bold text-white pb-5 border-b !border-primary/20'>{i18n.t("Change Password")}</h4>
        <div className='auth grid grid-cols-1 gap-3 mt-5'>
          <div>
            <FormPassword className='w-full p-3 sm:p-4 xl:p-5 glass-effect-job rounded text-white' label='Old Password' name='oldPassword' placeholder='Enter your Old Password' required={true} />
          </div>
          <div className=''>
            <FormPassword className='w-full p-3 sm:p-4 xl:p-5 glass-effect-job rounded text-white' label='Password' name='password' placeholder='Enter your password' required={true} />
          </div>
          <div className=''>
            <FormPassword className='w-full p-3 sm:p-4 xl:p-5 glass-effect-job rounded text-white' confirm label='Re-type Password' name='confirm_password' placeholder='Confirm your password' required={true} />
          </div>
        </div>
        <button className=' md:mt-6 sm:mt-5 mt-4 common-btn bg-primary text-[#02050A] !rounded'>{i18n.t("Save Changes")}</button>
      </Form>
    </div>
  );
}

export default UserDashboard
