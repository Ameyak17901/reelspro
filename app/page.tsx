"use client";

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { IKVideo } from "imagekitio-next";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[] | undefined>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className="min-h-screen text-white">
      <h1 className="text-xl font-bold text-center">Videos</h1>
      {videos?.map((video) => (
        <IKVideo urlEndpoint={video.videoUrl} key={video.title} className="" />
      ))}
    </div>
  );
}
