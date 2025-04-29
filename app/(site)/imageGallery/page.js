/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import ImageGalleryPage from "@/app/components/theme4/imageGallery/imageGallery";
import ImageGalleryPage4 from "@/app/components/theme4/imageGallery/imageGallery4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const ImageGallery = () => {
  const [dataTheme, getDataTheme, { loading }] = useFetch(
    fetchPageContentTheme1,
    {
      status: true,
    }
  );
  useEffect(() => {
    if (dataTheme) getDataTheme();
  }, []);
  const activeTheme = dataTheme?.theme;
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        <div>
          {activeTheme === "four" && <ImageGalleryPage4 />}
          {activeTheme === "one" && <ImageGalleryPage />}
          {activeTheme === "two" && <ImageGalleryPage />}
          {activeTheme === "three" && <ImageGalleryPage />}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
