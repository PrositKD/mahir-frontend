/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormInput from '@/app/components/form/input'
import Banner from '@/app/components/site/common/component/Banner'
import { useI18n } from '@/app/contexts/i18n'
import { sentMessage } from '@/app/helper/backend'
import { useAction } from '@/app/helper/hooks'
import { Form } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import CommonBanner from '../../common/commonBanner'
const QuotePage4 = () => {
  const i18n = useI18n();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (value) => {
    setLoading(true);
    useAction( sentMessage, {
      body: {
        name: value.name,
        email: value.email,
        subject: value.subject,
        message: value.text
      }, 
    },
      () => {
        setLoading(false);
        form.resetFields();
      }
    )
  }
  return (
    <section className=' '>
     <CommonBanner  title='Quote' textTitle='text-primary' />
      <div className="agency-container py-12 sm:py-[70px] ">
        <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#ECFDF4] rounded-2xl theme5  py-12">
          <div className="px-10  sm:px-[150px] md:px-[200px] lg:px-[254px]">
            <h1 className='heading-6 text-[#333] text-center'>Request A Quote</h1>
            <Form className='2xl:mt-[60px] xl:mt-14 lg:mt-12 md:mt-10 sm:mt-8 mt-6' layout='vertical' onFinish={handleSubmit} initialValues={{ name: '', email: '' }} autoComplete='off' form={form}>
              <div>
                <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' type={'text'} label='Name' name='name' placeholder='Enter your name' required={true} />
              </div>
              <div>
                <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' type={'text'} label='Subject' name='subject' placeholder='Enter your Subject' required={true} />
              </div>
              <div className='sm:!mt-2'>
                <FormInput className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' type='email' label='Email' isEmail={true} name='email' placeholder='Enter your email' required={true} />
              </div>
              <div className='w-full'>
                <FormInput textArea={true} rows={3} className='w-full p-2 sm:p-3 xl:p-4 theme4 rounded text-[#333] focus:outline-primary' label='Message' name='text' placeholder='Enter Your Text'  required={true} />
              </div>
              <div className="text-center">
                <button type='submit'  className='w-full p-2 sm:p-3 text-lg font-inter font-medium xl:p-4 bg-[#31D692] hover:bg-[#0DBC79] text-white rounded-[10px] '>{loading ? i18n.t('Sending...') : i18n.t('Submit')}</button>
              </div>
            </Form>
            <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
              <Image className='h-24' width={264} height={147} src="/hand.png" alt="hand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuotePage4