import { Rate } from "antd";
import Image from "next/image";
import React from "react";

const ProductReviewCard = ({ data }) => {
  return (
    <section>
      <div className="flex items-start flex-col md:flex-row gap-3 lg:gap-4 xl:gap-5">
        <Image
          className="rounded-md w-[80px] h-[80px] object-fill"
          src={data?.user?.image || "/inner/user.jpg"}
          width={800}
          height={800}
          alt="Reviewer"
        />
        <div className="w-full rounded-md border border-primary/30 p-3 lg:p-4 xl:p-5">
          <h3 className="heading-3">{data?.user?.name}</h3>
          <Rate className="mt-3 text-primary" disabled defaultValue={data?.rating} />
          <p className="mt-3 lg:mt-4 xl:mt-5 description-2">{data?.comment}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductReviewCard;
