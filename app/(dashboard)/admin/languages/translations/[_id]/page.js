/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import Button from "@/app/(dashboard)/components/common/button";
import FormInput, { HiddenInput } from "@/app/components/form/input";
import { fetchAdminLanguages, putLanguage } from "@/app/helper/backend";
import { useAction, useFetch } from "@/app/helper/hooks";
import { Form } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Translations = () => {
  const params = useParams();
  const id = params?._id;
  const [translations, getTranslations] = useFetch(fetchAdminLanguages, {}, false);
  const [data, getData] = useFetch(fetchAdminLanguages, {}, false);
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getData({ _id: id });
      getTranslations({ _id: id });
    }
  }, [id, refresh]);

  useEffect(() => {
    if (translations) {
      let values = {};
      Object?.keys(translations?.translations ?? {})?.forEach((key) => {
        values = {
          ...values,
          [id]: {
            ...values[id],
            [key]: {
              value: translations?.translations[key],
            },
          },
        };
      });
      form.setFieldsValue(values);
    }
  }, [translations]);

  const keys = [
    // theme 1
    { name: "Trusted by over 32K growing companies" },
    { name: "Building World-Class Digital Marketplaces" },
    { name: "World-class digital agency & marketplace" },
    { name: "About US" },
    { name: "Services" },
    { name: "We provide best service" },
    { name: "We deliver high quality reliable services that meet your needs and drive your success and your satisfaction is our priority" },
    { name: "Product" },
    { name: "Exceptional Products for Every Need" },
    { name: "We deliver high quality reliable products designed to meet your needs and drive your success your satisfaction is our priority" },
    { name: "Case Study" },
    { name: "See how we help businesses succeed" },
    { name: "Our case studies highlight reliable solutions tailored to client needs delivering impactful results and lasting success" },
    { name: "Testimonials" },
    { name: "Some Good Words From Our Clients" },
    { name: "Hear from our happy clients and discover how our work has positively impacted their businesses and experiences with us" },
    { name: "Team" },
    { name: "The People Behind Our Success" },
    { name: "Meet the dedicated and talented individuals whose passion expertise and collaboration drive everything we do" },
    { name: "Blog" },
    { name: "Latest Trends & Expert Tips" },
    { name: "Stay informed with the latest industry insights trends and expert tips curated by our team of professionals" },
    { name: "Careers" },
    { name: "Events" },
    // Auth
    { name: "Forget Password" },
    { name: "Please enter your email to reset your password" },
    { name: "Continue" },
    { name: "Verify OTP" },
    { name: "Please enter 4-digit code sent to" },
    { name: "Do not receive the code" },
    { name: "Resend" },
    { name: "Verify" },
    { name: "Reset Password" },
    { name: "Please enter your new password and confirm password" },
    { name: "Image Gallery" },
    { name: "Login" },
    { name: "Welcome back" },
    { name: "Sign in with your credentials" },
    { name: "Don't have an account" },
    { name: "Sign Up" },
    { name: "Let's Join Us" },
    { name: "Sign in with your email" },
    { name: "Already have an account" },
    { name: "Sign In" },
    { name: "Don't receive the code" },
    { name: "Product" },
    { name: "Quote" },
    { name: "Video Gallery" },
    // admin layout
    { name: "Dashboard" },
    { name: "Total Services" },
    { name: "Total Event" },
    { name: "Total Jobs" },
    { name: "Total Applied Jobs" },
    { name: "Total Product" },
    { name: "User" },
    { name: "User List" },
    { name: "Search" },
    { name: "Image" },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "Joined At" },
    { name: "Password" },
    { name: "Reset Password" },
    { name: "Action" },
    { name: "Change User Password" },
    { name: "Password" },
    { name: "Confirm Password" },
    { name: "Close" },
    { name: "Save" },
    { name: "Gender" },
    { name: "Date Of Birth" },
    { name: "Address" },
    { name: "Are you sure?" },
    { name: "Are you sure you want to delete this item?" },
    { name: "OK" },
    { name: "Cancel" },
    { name: "Previous" },
    { name: "Show" },
    { name: "Showing " },
    { name: "entries" },
    { name: "to" },
    { name: "of" },
    { name: "Service Management" },
    { name: "Tags" },
    { name: "Service Tags" },
    { name: "Created At" },
    { name: "Add New" },
    { name: "Back" },
    { name: "Edit Service Tag" },
    { name: "Submit" },
    { name: "Category " },
    { name: "Service Category List" },
    { name: "Edit ServiceCategory" },
    { name: "Services List" },
    { name: "Services" },
    { name: "Title" },
    { name: "Category" },
    { name: "Status" },
    { name: "Card Image" },
    { name: "Banner Image" },
    { name: "Service Title" },
    { name: "Service Description" },
    { name: "Short Description" },
    { name: "Service Category" },
    { name: "Payment Type" },
    { name: "Edit Service" },
    { name: "Service Description" },
    { name: "Service Title" },
    { name: "Video Url" },
    { name: "TaService Tagsgs" },
    { name: "Case Study Management" },
    { name: "Case Study Tags" },
    { name: "Add Case Study Tag" },
    { name: "Add New Service Tag" },
    { name: "Add New Service Category" },
    { name: "Add Service" },
    { name: "Edit Case Study Tag" },
    { name: "Case Study Categories" },
    { name: "Add New Case Study Category" },
    { name: "Edit Case Study Category" },
    { name: "Case Studies" },
    { name: "Add Case Study" },
    { name: "Case Study Title" },
    { name: "Case Study Result" },
    { name: "Case Study Description" },
    { name: "Case Study Category" },
    { name: "Case Study Tags" },
    { name: "Case Study client" },
    { name: "Case Study Budget" },
    { name: "Case Study Duration" },
    { name: "Advertisement List" },
    { name: "Add Advertisement" },
    { name: "Type" },
    { name: "Redirect Url" },
    { name: "Edit Advertisement" },
    { name: "Advertisement " },
    { name: "Event Management" },
    { name: "Event Category List" },
    { name: "Add New Event Category" },
    { name: "Active" },
    { name: "Inactive" },
    { name: "Edit Event Category" },
    { name: "Event List" },
    { name: "Event Date" },
    { name: "Category" },
    { name: "Add New Event" },
    { name: "Organizer Image" },
    { name: "Event Image" },
    { name: "Event Category" },
    { name: "Description" },
    { name: "Organizer Name" },
    { name: "Location" },
    { name: "Organizer Phone" },
    { name: "Organizer Email" },
    { name: "Event Date" },
    { name: "Start Date" },
    { name: "End Date" },
    { name: "Payment Type" },
    { name: "Event Details" },
    { name: "Event Title" },
    { name: "Event Description" },
    { name: "Organizer Name" },
    { name: "Price" },
    { name: "Discount Type" },
    { name: "TaDiscount Amountgs" },
    { name: "Providers List" },
    { name: "Expertise" },
    { name: "Provider Name" },
    { name: "About" },
    { name: "Professional Information" },
    { name: "Guidelines" },
    { name: "Linkedin Url" },
    { name: "Instagram Url" },
    { name: "Twitter Url" },
    { name: "Provider Details" },
    { name: "Add Provider" },
    { name: "Provider" },
    { name: "Blog Management" },
    { name: "Blog Tags" },
    { name: "Edit Blog Tag" },
    { name: "Add New Blog Tag" },
    { name: "Subscribed At" },
    { name: "Blog Categories" },
    { name: "Add New Blog Category" },
    { name: "Edit Blog Category" },
    { name: "Blogs List" },
    { name: "Blogs " },
    { name: "Short Description" },
    { name: "Latest" },
    { name: "Add New Blog" },
    { name: "Blog Category" },
    { name: "Blog Tags" },
    { name: "Blog Tags" },
    { name: "Event Description" },
    { name: "Blog Details" },
    { name: "Edit Blog" },
    { name: "Support Ticket" },
    { name: "Subject" },
    { name: "Job Management" },
    { name: "Job Category List" },
    { name: "Edit Job Category" },
    { name: "Add New Job Category" },
    { name: "Job List" },
    { name: "Job Position" },
    { name: "Event Title" },
    { name: "Job Type" },
    { name: "Company Name	" },
    { name: "Author Name" },
    { name: "Job Position	" },
    { name: "Salary" },
    { name: "Vacancy" },
    { name: "Location" },
    { name: "Deadline	" },
    { name: "Job Context	" },
    { name: "Job Responsibility	" },
    { name: "TaEducational Requirementgs" },
    { name: "Experience Requirement	" },
    { name: "Additional Requirement	" },
    { name: "Job Details" },
    { name: "Applied Jobs" },
    { name: "Applicant Phone" },
    { name: "Applicant Name" },
    { name: "Cover Lettergs" },
    { name: "Resume" },
    { name: "Product Management" },
    { name: "Product Categories" },
    { name: "Add New Product Category" },
    { name: "Edit Product Category" },
    { name: "Product List" },
    { name: "Quantity" },
    { name: "Add Product" },
    { name: "Discount Type" },
    { name: "Product Details" },
    { name: "Product " },
    { name: "Review Management" },
    { name: "Site Testimonials" },
    { name: "Reviewer Image" },
    { name: "Reviewer Name" },
    { name: "Comment" },
    { name: "Rating" },
    { name: "Site Testimonials" },
    { name: "Reviewer ImageReviewer Name" },
    { name: "HRM" },
    { name: "Add Employee" },
    { name: "All Employee" },
    { name: "Role" },
    { name: "Details of cat" },
    { name: "Edit Employee" },
    { name: "Add Role" },
    { name: "Roles Permission: Marketing Manager" },
    { name: "Edit Role" },
    { name: "Settings" },
    { name: "Site Settings" },
    { name: "Phone Number" },
    { name: "File Upload Type" },
    { name: "Otp Verification Type" },
    { name: "Client Side URL" },
    { name: "Server Side URL" },
    { name: "Client Side URL" },
    { name: "Server Side URL" },
    { name: "Facebook Link" },
    { name: "Twitter Link" },
    { name: "Instagram Link" },
    { name: "Linkedin Link" },
    { name: "Youtube Link" },
    { name: "Currency Code" },
    { name: "Currency Symbol" },
    { name: "Partnership" },
    { name: "Page Settings" },
    { name: "Home Page Settings" },
    { name: "Contact List" },
    { name: "Message" },
    { name: "Newsletter List" },
    { name: "Subscribed At" },
    { name: "Send Mail" },
    { name: "Send Mail To All Newsletter Subscribers" },
    { name: "Send Mail All" },
    { name: "TagsSend Mail To Newsletter Subscriber" },
    { name: "Subject" },
    { name: "FAQ List" },
    { name: "Add New" },
    { name: "Answer" },
    { name: "Edit Faq" },
    { name: "Question" },
    { name: "Add Faq" },
    { name: "Question" },
    { name: "Answer" },
    { name: "Language List" },
    { name: "Default" },
    { name: "Flag" },
    { name: "Code" },
    { name: "RTL" },
    { name: "Edit Language" },
    { name: "Rtl Support" },
    { name: "Email Settings" },
    { name: "SMS Settings" },
    { name: "Payment Settings" },
    { name: "Short Description" },
    //User Dashboard
    { name: "Event Booking" },
    { name: "Product Orders" },
    { name: "Support Ticket" },
    { name: "Applied Jobs" },
    { name: "Events Booking" },
    { name: "Testimonials" },
    { name: "Edit profile" },
    { name: "Change Password" },
    { name: "Job Title" },
    { name: "Company Name" },
    { name: "Resume" },
    { name: "Cover Letter" },
    { name: "Apply New Job" },
    { name: "Details Information" },
    { name: "Applicant Information" },
    { name: "Job Information" },
    { name: "Company Name" },
    { name: "Job Position" },
    { name: "Job Title" },
    { name: "Edit Profile" },
    { name: "Save Changes" },
    { name: "Change Password" },
    { name: "No event booking found" },
    { name: "Event Image" },
    { name: "Ticket" },
    { name: "Event name" },
    { name: "Event Location" },
    { name: "Booking Status" },
    { name: "Booking Price" },
    { name: "Payment Method" },
    { name: "Payment Status" },
    { name: "Event Date" },
    { name: "Start Date" },
    { name: "End Date" },
    { name: "Order Date" },
    { name: "No product orders found" },
    { name: "Product Image" },
    { name: "Order Id" },
    { name: "Product name" },
    { name: "Product category" },
    { name: "Product Price" },
    { name: "Order Status" },
    { name: "Payment Method" },
    { name: "Payment Status" },
    { name: "All Support Ticket" },
    { name: "Add New Support Ticket" },
    { name: "Title" },
    { name: "Subject" },
    { name: "Priority" },
    { name: "Description" },
    { name: "Testimonials List" },
    { name: "Submit" },

    //landing Page
    { name: "Follow US" },
    { name: "Get a Quote" },
    { name: "review" },
    { name: "Explore More" },
    { name: "Project Complete" },
    { name: "Years of Experiences" },
    { name: "Our Service" },
    { name: "We provide best service" },
    { name: "Case Study" },
    { name: "Explore how we've helped businesses achieve their goals" },
    { name: "Our Product" },
    { name: "Recently Produced Products" },
    { name: "Our Experts" },
    { name: "Best experts working our agency" },
    { name: "Testimonials" },
    { name: "What Our Clients Say" },
    { name: "Rating" },
    { name: "Blogs" },
    { name: "View More" },
    { name: "Latest Articles &News from the Blogs" },
    { name: "Read more" },
    { name: "Home" },
    { name: "Services" },
    { name: "Team" },
    { name: "Condition" },
    { name: "Privacy" },
    { name: "Read more" },

  ];

  const handleSubmit = async (values) => {
    let translationsArray = [];
    Object.keys(values)?.forEach((lang) => {
      Object.keys(values[lang])?.forEach((key) => {
        translationsArray.push({
          [key]: values[lang][key].value,
        });
      });
    });

    const translationsObject = {
      translations: Object.assign({}, ...translationsArray),
    };

    const response = await useAction(
      putLanguage,
      {
        body: {
          _id: id,
          name: data?.name,
          code: data?.code,
          flag: data?.flag,
          ...translationsObject,
        },
      },
      () => {
        getTranslations({ _id: id });
        setRefresh((prev) => !prev); // Force re-fetch
      }
    );

  };

  return (
    <>
      <div className="w-full overflow-x-auto mt-7 mb-20 dashboardModal">
        <div className="border-2 border-[#1c2c52] rounded dashboardInput pb-7">
          <div className="flex justify-between px-8 pt-8 items-center">
            <h1 className="text-[#C7D1DA] text-3xl">Language List</h1>
            <BackButton />
          </div>
          <div className="px-8 pt-8">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <table className="px-2 w-full">
                <thead className="bg-slate-400 w-1/2">
                  <tr>
                    <th className="py-2 px-6 text-start">English</th>
                    <th className="py-2 px-6 text-start">{data?.name}</th>
                  </tr>
                </thead>
                <tbody className="mt-2 w-1/2">
                  {keys?.map((key, index) => (
                    <tr key={index} className="">
                      <td className="px-3 py-3 mt-3 bg-transparent dashinput flex justify-start rounded">
                        {key?.name}
                      </td>

                      {id && (
                        <td key={index} className="pl-4 mt-2">
                          <HiddenInput
                            name={[id, key.name, "type"]}
                            initialValue={key.type}
                            className=" "
                          />
                          <FormInput
                            className="w-full rounded bg-transparent p-3 mt-3 dashinput"
                            initialValue=""
                            name={[id, key.name, "value"]}
                            placeholder="Type here"
                          ></FormInput>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button type="submit"> Submit </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translations;
