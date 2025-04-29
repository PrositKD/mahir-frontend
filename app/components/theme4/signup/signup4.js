'use client'
import FormInput from '@/app/components/form/input'
import FormPassword from '@/app/components/form/password'
import Banner from '@/app/components/site/common/component/Banner'
import { postSignup, sendOtp } from '@/app/helper/backend'
import { Form, Input, message, Modal } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTimer } from 'use-timer';
import CommonBanner from '../../common/commonBanner'
import { useI18n } from '@/app/contexts/i18n'
const SignUpPage4 = () => {
  const i18n = useI18n();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [otpEmail, setOtpEmail] = useState('');
  const [signUpValues, setSignUpValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
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
    setLoading(true);
    if (!!value?.email) {
      setOtpEmail(value.email);
      setSignUpValues(value);
      const data = await sendOtp({
        body: {
          "identifier": value.email,
          "action": "signup"
        }
      });
      if (data.success) {
        message.success(data.message);
        setIsModalOpen(true);
        setLoading(false);
      } else {
        message.error(data.errorMessage);
        setLoading(false);
      }
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <section className=''>
      <CommonBanner title="Create Account" />
      <div className="agency-container py-12 sm:py-[70px] md:py-[90px] lg:py-[100px]">
        <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#ECFDF4] py-12 md:py-[90px] lg:py-[100px]">
          <div className="px-10 sm:px-[150px] md:px-[200px] lg:px-[254px]">
            <div className="text-center">
              <h1 className='heading-6 text-[#333]'>{i18n.t("Let's Join Us")}</h1>
              <div className='mt-5 md:mt-6 lg:mt-8 xl:mt-12 2xl:mt-[60px] flex items-center justify-center'><span className='h-[2px] w-10 sm:w-14 bg-gray-500'></span><p className='text-[#888AA0] description-2 py-5 px-5'>{i18n.t("Sign in with your email")}</p><span className='h-[2px] w-10 sm:w-14 bg-gray-500'></span></div>
            </div>
            <Form className='mt-3' layout='vertical theme5' onFinish={handleSubmit} initialValues={{ name: '', email: '' }} autoComplete='off' form={form}>
              <div>
                <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Name' name='name' placeholder='Enter your name' required={true} />
              </div>
              <div className='sm:!mt-2'>
                <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Email' name='email' placeholder='Enter your email' required={true} />
              </div>
              <div className='sm:!mt-2 password-icon'>
                <FormPassword className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Password' name='password' placeholder='Enter your password' required={true} />
              </div>
              <div className='sm:!mt-2 password-icon'>
                <FormPassword className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' confirm label='Re-type Password' name='confirm_password' placeholder='Confirm your password' required={true} />
              </div>
              <div className="text-center">
                <button type='submit' className='w-full common-btn bg-primary xl:mt-8 lg:mt-6 sm:mt-5 mt-4'>{loading ? 'Loading ...' : 'Sign Up'}</button>
              </div>
            </Form>
            <div className='mt-5 sm:mt-6 lg:mt-8'>
              <p className='description-1 text-[#888AA0]'>{i18n.t("Already have an account")}? <span className='text-primary cursor-pointer'><Link href={'/login'}>
                {i18n.t("Sign In")}</Link></span>
              </p>
            </div>
            <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
              <Image width={265} height={147} className='h-24' src="/hand.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <div className="w-full p-10">
          <div className="">
            <h1 className='heading-6 text-[#333] capitalize'>{i18n.t("Verify OTP")}</h1>
            <p className='description-2 text-[#888AA0] font-normal mt-2 sm:mt-3'>{i18n.t("Please enter 4-digit code sent to")}<span className='text-primary'>{otpEmail}</span> </p>
            <Form className='mt-5 md:mt-6 lg:mt-8 xl:mt-10 theme5' onFinish={
              async (value) => {
                if (!!otp) {
                  setLoading(true);
                  const data = await postSignup({
                    body: {
                      "otp": otp,
                      "name": signUpValues.name,
                      "email": signUpValues.email,
                      "password": signUpValues.password
                    }
                  })
                  if (data.success) {
                    message.success(data.message);
                    form.resetFields();
                    router.push('/login');
                    setLoading(false);
                    handleCancel();
                  }
                  else {
                    message.error(data.errorMessage);
                    setLoading(false);
                  }
                }
              }
            } layout='vertical'>
              <div className='otp'>
                <Input.OTP onChange={(value) => setOtp(value)} className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' length={5} />
              </div>
              <div>
                <p className='mt-5 md:mt-6 lg:mt-8 xl:mt-10 description-2 text-[#888AA0]'>
                  {i18n.t("Don't receive the code")} ?
                  {
                    time === 0 ? (
                      <span className='text-primary cursor-pointer'>
                        <button onClick={async () => {
                          setLoading(true);
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
                            setLoading(false);
                          }

                        }}>{loading ? 'Loading...' : 'Resend'}</button>
                      </span>
                    ) : <span className='text-primary cursor-not-allowed'>
                      <button>Resend in {time} s</button>
                    </span>
                  }

                </p>
              </div>
              <div className="text-center">
                <button type='submit' className='w-full common-btn text-[#02050A] font-semibold bg-primary xl:mt-8 lg:mt-6 sm:mt-5 mt-4'>{loading ? 'Loading...' : 'Verify'}</button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default SignUpPage4
