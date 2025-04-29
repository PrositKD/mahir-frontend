/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FormInput from "@/app/components/form/input";
import FormPassword from "@/app/components/form/password";
import Banner from "@/app/components/site/common/component/Banner";
import { useI18n } from "@/app/contexts/i18n";
import { useUser } from "@/app/contexts/user";
import { postLogin } from "@/app/helper/backend";
import { Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const i18n = useI18n();


  const handleSubmit = async (value) => {
    setLoading(true);
    const data = await postLogin({
      body: {
        identifier: value?.email,
        password: value?.password,
      },
    });
    if (data?.success) {
      setUser(data?.data?.user);
      localStorage.setItem("token", data?.data?.accessToken);
      message.success(data?.message);
      form.resetFields();

      if (
        (data?.data?.user?.role === "admin") ||
        (data?.data?.user?.role === "employee")
      ) {
        router.push("/admin");
        setLoading(false);
      } else if (data?.data?.user?.role === "user") {
        router.push("/user");
        setLoading(false);
      } else {
        router.push("/");
        setLoading(false);
      }
    } else {
      message.error(data?.errorMessage);
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  return (
    <section className="bg-[#0F172A] ">
      <Banner title="Login" />
      <div className="agency-container py-12 sm:py-[70px] md:py-[90px] lg:py-[100px]">
        <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#122130] py-12 md:py-[90px] lg:py-[100px]">
          <div className="px-10 sm:px-[150px] md:px-[200px] lg:px-[254px]">
            <div className="text-center">
              <h1 className="heading-6 text-white capitalize">{i18n.t("Welcome back")}</h1>
              <div className="mt-5 md:mt-6 lg:mt-8 xl:mt-12 2xl:mt-[60px] flex items-center justify-center">
                <span className="h-[2px] w-8 sm:w-10 bg-gray-500"></span>
                <p className="text-[#888AA0] description-2 py-5 px-3">
                {i18n.t("Sign in with your credentials")}
                </p>
                <span className="h-[2px] w-8 sm:w-10 bg-gray-500"></span>
              </div>
            </div>

            <Form
              initialValues={{ email: "" }}
              autoComplete="off"
              className="mt-3"
              layout="vertical"
              onFinish={handleSubmit}
              form={form}
            >
              <div className="">
                <FormInput
                  className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  required={true}
                />
              </div>
              <div className="sm:!mt-2 auth">
                <FormPassword
                  className="w-full p-3 sm:p-4 xl:p-5 glass-effect rounded text-white"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  required={true}
                />
              </div>
              <Link
                href={"/forgotPassword"}
                className="text-primary description-2 mt-5 sm:mt-6 lg:mt-8 xl:mt-10"
              >
                 {i18n?.t("Forgot Password")} ?
              </Link>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full common-btn bg-primary xl:mt-8 lg:mt-6 sm:mt-5 mt-4"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </Form>
            <div className="mt-5 sm:mt-6 lg:mt-8">
              <p className="description-1 text-[#888AA0]">
              {i18n?.t("Don't have an account")}?
                <span className="text-primary cursor-pointer">
                  <Link href={"/signup"}>{i18n?.t("Sign Up")}</Link>
                </span>
              </p>
            </div>
            <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
              <Image
                width={265}
                height={147}
                className="h-24"
                src="/hand.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;