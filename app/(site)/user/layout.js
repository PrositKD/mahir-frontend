/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react";
import Banner from "../../components/site/common/component/Banner";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/app/contexts/i18n";
import { FaCartShopping, FaTicketSimple } from "react-icons/fa6";
import { HiOutlineLogout, HiOutlineMenu } from "react-icons/hi";
import { Drawer, message } from "antd";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { MdDashboard, MdWork } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserEdit, FaUserTie } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import Providers from "@/app/provider/userProvider";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import { getUser } from "@/app/helper/backend";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const i18n = useI18n();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const menuItems = [
    { id: 1, name: "Dashboard", href: "/user", icon: <MdDashboard /> },
    { id: 2, name: "Product orders", href: "/user/productOrder", icon: <FaCartShopping /> },
    { id: 3, name: "Events Booking", href: "/user/eventBooking", icon: <TbBrandBooking /> },
    { id: 4, name: "Testimonials", href: "/user/testimonials", icon: <FaUserTie /> },
    { id: 9, name: "Applied Jobs", href: "/user/appliedJobs", icon: <MdWork /> },
    { id: 5, name: "Support Ticket", href: "/user/supportTicket", icon: <FaTicketSimple /> },
    { id: 6, name: "Edit profile", href: "/user/editProfile", icon: <FaUserEdit /> },
    { id: 7, name: "Change Password", href: "/user/changePassword", icon: <BiEdit /> },
  ];

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(({ data }) => {
      if (data?.role == "user")  {
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
    <Providers>
      {
        user && user?.role == 'user' && (
          <div>
            <div className="bg-[#0F172A] w-full h-full">
              <Banner title="User Dashboard" />
              <div className="lg:flex agency-container lg:gap-x-6 py-[60px] md:pb-[120px] ">
                <div className="lg:hidden mb-5">
                  <HiOutlineMenu className="text-2xl cursor-pointer text-white" onClick={toggleDrawer} />
                </div>
                {/* Small Screen */}
                <Drawer
                  title={false}
                  placement="left"
                  closable={false}
                  onClose={toggleDrawer}
                  open={drawerOpen}
                  width={286}
                  rootClassName="custom-drawer"
                >
                  <div className="flex justify-end items-end">
                    <RxCross2 onClick={toggleDrawer} className="text-2xl" />
                  </div>
                  <nav>
                    <div className="overflow-hidden flex items-center justify-center rounded-full border border-primary/20 w-24 h-24 mx-auto mb-3">
                      {
                        user?.image && (
                          <Image className="rounded-full w-full " src={user?.image || "/inner/user.jpg"} width={1000} height={1000} alt="user" />
                        )
                      }

                    </div>
                    <p className="description-2 text-center text-white">{user?.name}</p>
                    <ul className="space-y-4 mt-3">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className={`flex items-center p-[8px] sm:p-[18px] border border-white/10 rounded transition-colors duration-200 font-poppins ${pathname === item.href ? "text-primary" : "text-[#888AA0]  hover:text-primary"
                              }`}
                          >
                            <span className="description-1 mr-2">{item.icon}</span>
                            <span className="description-1">{i18n?.t(item.name)}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            message.success(i18n?.t("Logged out successfully"));
                            router.push("/login");
                            getCurrentUser();
                          }}
                          className="flex items-center p-[8px] w-full sm:p-[18px] border border-white/10 rounded transition-colors duration-300"
                        >
                          <span className="description-1 mr-2">
                            <HiOutlineLogout />
                          </span>
                          <span className="description-1">{i18n?.t("Sign Out")}</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </Drawer>
                {/* Large Screen */}
                <div className="hidden lg:block lg:max-w-[300px] xl:max-w-[424px] lg:mb-0 mb-6 w-full h-fit bg-[#0F172A] p-4 sm:p-8 border border-white/10 rounded">
                  <nav>
                    {/* image */}
                    <div className="overflow-hidden flex items-center justify-center rounded-full border border-primary/20 w-36 h-36 mx-auto mb-3">
                      {
                        user?.image ? <Image crossOrigin="anonymous" className="rounded-full !w-[144px] !h-[144px] !object-fill" src={user?.image} width={200} height={300} alt="user" /> : <Image className="rounded-full w-full " src="/inner/user.jpg" width={1000} height={1000} alt="user" />
                      }
                    </div>
                    <p className="description-2 text-center text-white">{user?.name}</p>
                    <ul className="space-y-4 mt-4">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className={`flex items-center p-[8px] sm:p-[18px] border border-white/10 rounded font-poppins transition-colors duration-200 ${pathname === item.href ? "text-primary" : "text-[#888AA0] hover:text-primary"
                              }`}
                          >
                            <span className="description-1 mr-2">{item.icon}</span>
                            <span className="description-1">{i18n?.t(item?.name)}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="hover:text-primary text-[#888AA0]">
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            message.success(i18n?.t("Logged out successfully"));
                            router.push("/login");
                            getCurrentUser();
                          }}
                          className="flex items-center p-[8px] w-full sm:p-[18px] border border-white/10 rounded transition-colors duration-300"
                        >
                          <span className="text-lg sm:text-2xl mr-2">
                            <HiOutlineLogout />
                          </span>
                          <span className="description-1 ">{i18n?.t("Sign Out")}</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex-1 border border-white/10 p-6 rounded h-fit w-full lg:w-4/6">{children}</div>
              </div>
            </div>
          </div>
        )
      }
    </Providers>
  );
};

export default Layout;