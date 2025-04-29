'use client';
import Banner from "@/app/components/site/common/component/Banner";
import { fetchFAQ } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { columnFormatter } from "@/app/helper/utils";
import { Collapse } from "antd";
import Image from "next/image";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const FAQPage = () => {
  const [data, getData, { loading }] = useFetch(fetchFAQ);
  const [activePanel, setActivePanel] = useState(null);

  const handlePanelChange = (key) => {
    setActivePanel(key);
  };

  return (
    <div>
      <div className='bg-[#0F172A]'>
        <Banner title='FAQ' />
        <div className='lg:py-[100px] md:py-20 sm:py-16 py-12 agency-container'>
          <div className="md:max-w-[868px] w-full md:mx-auto relative bg-[#171f27] border border-[#fff]/15">
            <div className="p-5 sm:p-8 md:p-10 lg:p-14">
              <div className="faq">
                <Collapse
                  accordion
                  onChange={handlePanelChange}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) => (
                    <RiArrowDropDownLine
                      style={{
                        fontSize: '30px',
                        color: isActive ? '#19b071' : 'white',
                        transform: `rotate(${isActive ? 180 : 0}deg)`,
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  )}
                >
                  {data?.map((item) => (
                    <Collapse.Panel
                      key={item?._id}
                      header={
                        <span className={`description-1 ${activePanel == item?._id ? '!text-primary' : '!text-white'}`}>
                          {columnFormatter(item?.question)}
                        </span>
                      }
                      className="mb-8"
                    >
                      <p className="text-[#888AA0] description-2">{columnFormatter(item?.answer)}</p>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </div>
              <div className="lg:block hidden absolute -bottom-12 -left-[170px]">
                <Image className='h-24' src="/hand.png" width={264} height={147} alt="hand" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;