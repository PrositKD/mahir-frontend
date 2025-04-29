'use client'
import FormInput from '@/app/components/form/input'
import Banner from '@/app/components/site/common/component/Banner'
import { Form, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { postResetPassword, postVerifyOTP, sendOtp } from '@/app/helper/backend'
import { useTimer } from 'use-timer';
import FormPassword from '@/app/components/form/password'
import Image from 'next/image'
import { useI18n } from '@/app/contexts/i18n'
const ForgetPasswordPage = () => {
  const i18n = useI18n();
  const [otp, setOtp] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();
  const [passwordModal, setPasswordModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { time, start, pause, reset } = useTimer({
    initialTime: 120,
    timerType: 'DECREMENTAL',
  });
  useEffect(() => {
    if (otpEmail) {
      start();
    }
    if (time === 0) pause();
  }, [time, start, pause, otpEmail]);
  const handleSubmit = async (value) => {
    if (!!value?.email) {
      setOtpEmail(value.email);
      const data = await sendOtp({
        body: {
          "identifier": value.email,
          "action": "forget_password"
        }
      });
      if (data.success) {
        message.success(data.message);
        setIsModalOpen(true);
      } else {
        message.error(data.errorMessage);
      }
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const handlePasswordMOdalCancel = () => {
    setPasswordModal(false);
  }
  const [form] = Form.useForm();
  return (
    <section className='bg-[#0F172A] '>
      <Banner title='Forget Password' />
      <div className="agency-container py-12 sm:py-[70px] md:py-[90px] lg:py-[100px]">
        <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#122130] py-12 md:py-[90px] lg:py-[110px] xl:py-[130px] 2xl:py-[150px]">
          <div className="px-10 sm:px-[150px] md:px-[200px] lg:px-[232px]">
            <h1 className='heading-6 text-white capitalize'>{i18n.t('Forgot Your Password')}?</h1>
            <p className='description-2 text-[#888AA0] font-normal mt-2 sm:mt-3'>{i18n.t('Please enter your email to reset your password')}</p>
            <Form initialValues={{ email: '' }} autoComplete='off' className='mt-5 md:mt-6 lg:mt-8 xl:mt-10' layout='vertical' onFinish={handleSubmit} form={form}>
              <div className=''>
                <FormInput className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Email' type={'email'} name='email' placeholder='Enter your email' required={true} />
              </div>
              <div className="text-center">
                <button type='submit' className='w-full common-btn bg-primary'>{i18n.t('Continue')}</button>
              </div>
            </Form>
            <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
              <Image width={265} height={147} className='h-24' src="/hand.png" alt="hand" />
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <div className="w-full p-10">
          <div className="">
            <h1 className='heading-6 text-white capitalize'>{i18n.t('Verify OTP')}</h1>
            <p className='description-2 text-[#888AA0] font-normal mt-2 sm:mt-3'>{i18n.t('Please enter 4-digit code sent to')} <span className='text-primary'>{otpEmail}</span> </p>
            <Form className='mt-5 md:mt-6 lg:mt-8 xl:mt-10' onFinish={
              async (value) => {
                if (!!otp) {
                  const data = await postVerifyOTP({
                    body: {
                      "otp": otp,
                      "action": "forget_password",
                      "identifier": otpEmail
                    }
                  })
                  if (data.success) {
                    setAccessToken(data.data.accessToken);
                    message.success(data.message);
                    form.resetFields();
                    handleCancel();
                    setPasswordModal(true);
                  }
                  else {
                    message.error(data.errorMessage);
                  }
                }
              }
            } layout='vertical'>
              <div className='otp'>
                <Input.OTP onChange={(value) => setOtp(value)} className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' length={5} />
              </div>
              <div>
                <p className='mt-5 md:mt-6 lg:mt-8 xl:mt-10 description-2 text-[#888AA0]'>
                {i18n.t("Do not receive the code")} ?
                  {
                    time === 0 ? (
                      <span className='text-primary cursor-pointer'>
                        <button onClick={async () => {
                          const data = await sendOtp({
                            body: {
                              "identifier": otpEmail,
                              "action": "signup"
                            }
                          });
                          if (data.success) {
                            message.success(data.message);
                            reset();
                            start();
                          }

                        }}>{i18n.t("Resend")}</button>
                      </span>
                    ) : <span className='text-primary cursor-pointer'>
                      <button>{i18n.t("Resend")} in {time} s</button>
                    </span>
                  }

                </p>
              </div>
              <div className="text-center">
                <button type='submit' className='w-full common-btn text-[#02050A] font-semibold bg-primary'>{i18n.t('Verify')}</button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>

      {/* Password modal  */}
      <Modal open={passwordModal} onCancel={handlePasswordMOdalCancel} footer={null} centered>
        <div className="w-full p-10">
          <div className="">
            <h1 className='heading-6 text-white capitalize'>{i18n.t('Reset Password')}</h1>
            <p className='description-2 text-[#888AA0] font-normal mt-2 sm:mt-3'>{i18n.t('Please enter your new password and confirm password')}</p>
            <Form className='mt-5 md:mt-6 lg:mt-8 xl:mt-10' onFinish={
              async (value) => {
                if (!!otp) {
                  const data = await postResetPassword({
                    body: {
                      "password": value.password,
                      "confirm_password": value.confirm_password,
                    },
                    accessToken: accessToken
                  })
                  if (data.success) {
                    message.success(data.message);
                    form.resetFields();
                    handlePasswordMOdalCancel();
                    router.push('/login');
                  }
                  else {
                    message.error(data.errorMessage);
                  }
                }
              }
            } layout='vertical'>
              <div className='sm:!mt-2 auth'>
                <FormPassword className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' label='Password' name='password' placeholder='Enter your password' required={true} />
              </div>
              <div className='sm:!mt-2 auth'>
                <FormPassword className='w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white' confirm label='Re-type Password' name='confirm_password' placeholder='Confirm your password' required={true} />
              </div>
              <div className="text-center">
                <button type='submit' className='w-full common-btn text-[#02050A] font-semibold bg-primary xl:mt-8 lg:mt-6 sm:mt-5 mt-4'>{i18n.t('Reset Password')}</button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default ForgetPasswordPage
