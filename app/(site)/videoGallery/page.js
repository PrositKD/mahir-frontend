/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLoader from "@/app/(dashboard)/components/common/loader";
import VideoGalleryPage from "@/app/components/theme4/videoGallery/videoGallery";
import VideoGalleryPage4 from "@/app/components/theme4/videoGallery/videoGallery4";
import { fetchPageContentTheme1 } from "@/app/helper/backend";
import { useFetch } from "@/app/helper/hooks";
import { useEffect } from "react";
const VideoGallery = () => {
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
          {activeTheme === "four" && <VideoGalleryPage4 />}
          {activeTheme === "one" && <VideoGalleryPage />}
          {activeTheme === "two" && <VideoGalleryPage />}
          {activeTheme === "three" && <VideoGalleryPage />}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
