/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Expert1 from "../components/home1/expert1";
import Partner from "../components/home1/partner";
import Review1 from "../components/home1/review1";
import Blogs2 from "./allBlog/page";
import About from "../components/home1/about1";
import Service from "../components/home1/service";
import RecentlyProjects from "../components/home1/recentProjects";
import Hero from "../components/home1/hero";
import { useFetch } from "../helper/hooks";
import {
  fetchPageContentTheme1,
  getAllPublicAdvertisement,
} from "../helper/backend";
import About2 from "../components/home2/about2";
import Service2 from "../components/home2/bestService";
import Hero3 from "../components/home3/hero3";
import Review3 from "../components/home3/review3";
import { Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import Advertisement from "../components/site/common/advertisement";
import { columnFormatter } from "../helper/utils";
import { LayoutLoader } from "../(dashboard)/components/common/loader";
import CaseStudy from "../components/home1/casestudy";
import Hero4 from "../components/home4/hero4";
import AboutSection from "../components/home4/about4";
import Service4 from "../components/home4/service4";
import Product4 from "../components/home4/product4";
import CaseStudy4 from "../components/home4/caseStudy4";
import Testimonials4 from "../components/home4/testimonials4";
import Team4 from "../components/home4/team4";
import Blog4 from "../components/home4/blog4";

export default function Home() {
  const [data, getData, { loading }] = useFetch(fetchPageContentTheme1, {
    status: true,
  });
  useEffect(() => {
    getData();
  }, [])
  const theme = data?.theme;
  useEffect(() => {
    if (theme == "theme1") {
      getData({ theme: "theme1" });
    }
    if (theme == "theme2") {
      getData({ theme: "theme2" });
    }
    if (theme == "theme3") {
      getData({ theme: "theme3" });
    }
    if (theme == "theme4") {
      getData({ theme: "theme4" });
    }
  }, [theme])

  const [advertisement] = useFetch(getAllPublicAdvertisement);
  const sortedData =
    advertisement?.docs?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ) || [];
  const userBackground = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(217, 217, 217, 0.10) 100%)",
    borderRadius: "100px",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 4px 25px -1px rgba(0, 0, 0, 0.20)",
    backdropFilter: "blur(50px)",
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem("modalShown");
    if (!modalShown) {
      setIsModalVisible(true);
      sessionStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        {/* <MainLoader /> */}
        <LayoutLoader />
      </div>
    );
  }

  return (
    <main className="flex flex-col">
      {theme === "one" && (
        <>
          <main className="flex flex-col 2xl:gap-[150px] xl:gap-[120px] md:gap-20 gap-10">
            <Hero data={data} />
            <Partner />
            <About theme="theme1" />
            <Service />
            <CaseStudy theme="theme1" />
            <RecentlyProjects />
            <Expert1 />
            <div className="sl:mt-8 lg:mt-6 md:mt-5 mt-4">
              <Review1 />
            </div>
            <Blogs2 theme={" "} userBackground={" "} color={" "} radius={" "} />
          </main>
        </>
      )}

      {theme === "two" && (
        <>
          <main className="flex flex-col">
            <Hero
              theme="theme2"
              bgColor="bg-[#070713]"
              textColor="text-[#ffffff]"
              data={data}
            />
            <Partner />
            <About2 theme="theme2" />
            <Service2 theme="theme2" />
            <CaseStudy theme="theme2" />
            <div className="xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-6">
              <RecentlyProjects theme="theme2" />
            </div>
            <div className=" 2xl:my-[130px] xl:my-[100px] lg:my-[80px] my-[60px]">
              <Expert1 theme="theme2" />
            </div>
            {/* <Pricing2 bg="#070713" theme="theme2" /> */}
            <Review1 color="bg-[#32BA7D]" />
            <div className=" 2xl:my-[130px] xl:my-[100px] lg:my-[80px] my-[60px]">
              <Partner />
            </div>
            <Blogs2
              radius="rounded-full"
              color="text-[#02050A]"
              theme={""}
              userBackground={""}
            />
          </main>
        </>
      )}

      {theme === "three" && (
        <>
          <main
            className="flex flex-col 2xl:gap-[150px] xl:gap-[120px] lg:gap-[100px] md:gap-20 sm:gap-14 gap-10"
            style={{
              backgroundImage: "url('/BG3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Hero3 data={data} bgColor="bg-[#070713]" textColor="text-[#ffffff]" />
            <Partner bgColor='bg-[#ECFDF4]' />
            <About2 theme="theme3" />
            <Service theme="theme3" />
            <CaseStudy theme="theme3" />
            <RecentlyProjects theme="theme3" />
            <Expert1 theme="theme3" />
            {/* <Pricing2 theme="theme3" bg="" /> */}
            <Review3 />
            <Blogs2
              radius="rounded"
              color="text-white"
              align="text-center"
              theme="theme3"
              userBackground={userBackground}
            />
          </main>
        </>
      )}

      {theme === "four" && (
        <>
          <div className="bg-[#ECFDF4] ">
            <Hero4 data={data} />
          </div>
          <Partner
            bgOpacity="bg-opacity-100"
            bgColor="bg-[#ECFDF4]"
            theme="theme4"
          />
          <AboutSection />
          <div className="py-20 flex flex-col items-center justify-center xl:gap-36 lg:gap-32 md:gap-24 sm:gap-16 gap-12">
            <Service4 />
            <Product4 />
            <CaseStudy4 />
            <Testimonials4 />
            <Team4 />
            <div className="bg-[#ECFDF4] w-full xl:py-14 lg:py-12 md:py-10 sm:py-8 py-6">
              <Blog4 />
            </div>
          </div>
        </>
      )}

      <div className="modal-wrapper dashboardModal">
        <Modal
          open={isModalVisible}
          onCancel={handleClose}
          footer={null}
          centered
          width={800}
          className="custom-modal"
        >
          <div className="flex justify-between items-center gap-4 w-full mt-6">
            {sortedData?.length > 0 ? (
              sortedData
                ?.slice(0, 3)
                ?.map((item) => (
                  <Advertisement
                    key={item?._id}
                    title={columnFormatter(item?.title)}
                    image={item?.image}
                    link={item?.redirect_url}
                  />
                ))
            ) : (
              <div className="flex justify-center mt-10">
                <Empty description="No Advertisement Found" />
              </div>
            )}
          </div>
        </Modal>
      </div>
    </main>
  );
}
