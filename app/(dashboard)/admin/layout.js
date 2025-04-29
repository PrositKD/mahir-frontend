/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  FaWrench,
  FaLanguage,
  FaUserTie,
  FaQuestionCircle,
  FaTags,
  FaBlogger,
  FaBloggerB,
  FaUsersCog,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";
import { MdEmojiEvents, MdEventAvailable, MdInsights, MdOutlineContactPhone, MdOutlineEmail, MdOutlineReviews, MdOutlineSettings, MdPayment, MdReviews, MdWork, MdWorkHistory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  RiFolderSettingsLine,
  RiMailSettingsFill,
} from "react-icons/ri";
import { TbMessageCog } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import Sidebar from "./layout/sideBar";
import Header from "./layout/header";
import I18nProvider, { useI18n } from "@/app/contexts/i18n";
import HeaderNav from "./layout/headerNav";
import Providers from "@/app/provider/userProvider";
import MainLoader from "../components/common/loader";
import { FcAdvertising, FcServices } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoCodeReview } from "react-icons/go";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaTicketSimple } from "react-icons/fa6";
import { getUser } from "@/app/helper/backend";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(({ data }) => {
      if ((data?.role == "admin") || (data?.role == "employee")) {
        setUser(data);
        setLoading(false);
      } else {
        router.push("/login");
        setLoading(false);
      }
      setLoading(false);
    });
  }, [user?._id]);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <div className=" bg-[#0F172A] font-inter">
      {user && (user?.role == 'admin' || user?.role == 'employee') && (
        <Providers>
          <I18nProvider>
            <div className="w-full top-0 left-0 z-50 ">
              <HeaderNav />
            </div>
            <div className="flex">
              <div className="md:w-[320px]">
                <Sidebar menu={menu} />
              </div>
              <div className="w-full mx-4 overflow-auto">
                <Header />
                <div className="bg-[#0F172A] min-h-screen">
                  <div className="w-full">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </I18nProvider>
        </Providers>
      )}
    </div>
  );
};

export default Layout;

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <MdOutlineSpaceDashboard />,
    permission: 'dashboard',
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <FaUsers />,
    permission: 'users',
  },
  {
    label: "Service Management",
    icon: <GrServices />,
    permission: 'service',
    child: [
      {
        label: "Tags",
        href: "/admin/serviceManagement/tags",
        icon: <FaTags />,
      },
      {
        label: "Category",
        href: "/admin/serviceManagement/categories",
        icon: <BiCategory />,
      },
      {
        label: "Services",
        href: "/admin/serviceManagement/service",
        icon: <FcServices />,
      },

    ],
  },
  {
    label: "Case Study Management",
    icon: <FaFileAlt />,
    permission: 'case',
    child: [
      {
        label: "Tags",
        href: "/admin/caseStudyManagement/tags",
        icon: <FaTags />,
      },
      {
        label: "Category",
        href: "/admin/caseStudyManagement/categories",
        icon: <BiCategory />,
      },
      {
        label: "Case Study",
        href: "/admin/caseStudyManagement/caseStudy",
        icon: <MdInsights />,
      },

    ],
  },
  {
    label: "Advertisement",
    href: "/admin/advertisement",
    icon: <FcAdvertising />,
    permission: 'advertisement',
  },
  {
    label: "Event Management",
    icon: <MdEmojiEvents />,
    permission: 'event',
    child: [

      {
        label: "Categories",
        href: "/admin/eventManagement/categories",
        icon: <BiCategory />,
      },

      {
        label: "Events",
        href: "/admin/eventManagement/events",
        icon: <BsCalendarEventFill />,
      },
      {
        label: "Event Booking",
        href: "/admin/eventManagement/eventBooking",
        icon: <MdEventAvailable />,
      },
    ],
  },
  {
    label: "Provider",
    href: "/admin/provider",
    icon: <FaUserTie />,
    permission: 'provider',
  },
  {
    label: "Blog Management",
    icon: <FaBlogger />,
    permission: 'blog',
    child: [
      {
        label: "Tags",
        href: "/admin/blog-management/tags",
        icon: <FaTags />,
      },
      {
        label: "Categories",
        href: "/admin/blog-management/categories",
        icon: <BiCategory />,
      },
      {
        label: "Blogs",
        href: "/admin/blog-management/blogs",
        icon: <FaBloggerB />,
      },
    ],
  },
  {
    label: "Support Ticket",
    href: "/admin/supportTicket",
    icon: <FaTicketSimple />,
    permission: 'support',
  },
  {
    label: "Job Management",
    icon: <MdWork />,
    permission: 'job',
    child: [
      {
        label: "Categories",
        href: "/admin/jobManagement/categories",
        icon: <BiCategory />,
      },
      {
        label: "Jobs",
        href: "/admin/jobManagement/jobs",
        icon: <MdWorkHistory />,
      },
      {
        label: "Applied Jobs",
        href: "/admin/jobManagement/appliedJobs",
        icon: <MdWorkHistory />,
      },
    ],
  },
  {
    label: "Product Management",
    icon: <AiFillProduct />,
    permission: 'product',
    child: [
      {
        label: "Categories",
        href: "/admin/projectManagement/categories",
        icon: <BiCategory />,
      },
      {
        label: "Products",
        href: "/admin/projectManagement/projects",
        icon: <AiOutlineProduct />,
      },
      {
        label: "Products Orders",
        href: "/admin/projectManagement/orders",
        icon: <AiOutlineProduct />,
      },
    ],
  },
  {
    label: "Review Management",
    icon: <GoCodeReview />,
    permission: 'review',
    child: [

      {
        label: "Site Review",
        href: "/admin/testimonials/siteTestimonials",
        icon: <MdReviews />,
      },

      {
        label: "Project Review",
        href: "/admin/testimonials/projectTestimonials",
        icon: <MdOutlineReviews />,
      },
    ],
  },
  {
    label: "HRM",
    icon: <FaUsersCog />,
    permission: 'hrm',
    child: [
      {
        label: "All Employee",
        href: "/admin/employeeList",
        icon: <FaUsers />,
      },
      {
        label: "Roles",
        href: "/admin/rolePermission",
        icon: <GrServices />,
      },
    ],
  },
  {
    label: "Settings",
    icon: <FaWrench />,
    permission: 'setting',
    child: [
      {
        label: "Site Settings",
        href: "/admin/settings",
        icon: <MdOutlineSettings />,
      },
      {
        label: "Page Settings",
        href: "/admin/settings/page-settings",
        icon: <RiFolderSettingsLine />,
      },
      {
        label: "Email Settings",
        href: "/admin/settings/email",
        icon: <RiMailSettingsFill />,
      },
      {
        label: "SMS Settings",
        href: "/admin/settings/sms",
        icon: <TbMessageCog />,
      },
      {
        label: "Payment Settings",
        href: "/admin/settings/payment",
        icon: <MdPayment />,
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/admin/contactUs",
    icon: <MdOutlineContactPhone />,
    permission: 'contact',
  },
  {
    label: "Newsletter",
    href: "/admin/newsletter",
    icon: <MdOutlineEmail />,
    permission: 'subscribers',
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    icon: <FaQuestionCircle />,
    permission: 'faq',
  },
  {
    label: "Languages",
    href: "/admin/languages",
    icon: <FaLanguage />,
    permission: 'language',
  },
];
