import { Tooltip } from "antd";
import Image from "next/image";
const  Advertisement  = ({ title, image, link }) => {
  return (
    <div className="border border-primary/40 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md max-w-sm">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image width={500} height={500} src={image} alt={title} className=" w-[100px] h-[100px] sm:w-[180px] sm:h-[150px] md:w-[220px] md:h-[200px] object-fill rounded-md" />
      </a>
      <div className=" text-[10px] sm:text-sm md:text-lg font-semibold mt-2">
      <Tooltip
            title={ title?.length > 8 ? title : undefined
            }
          >
            <span className="cursor-help">
              {title.length > 8
                ? title?.slice(0, 8) + "..."
                : title}
            </span>
          </Tooltip>
          </div>
    </div>
  );
}

export default Advertisement;
