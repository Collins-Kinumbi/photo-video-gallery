"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { fetchData, params } from "../utils/utils";
import { useInView } from "react-intersection-observer";
import Video from "../components/Video";

const trendingVideosUrl = "https://api.pexels.com/videos/popular";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadedVideoIds = useRef(new Set());
  const videoItemRefs = useRef([]);

  const { ref, inView } = useInView({
    threshold: 0.5, // Load more when the component is 50% in view
  });

  // Function to fetch videos
  const loadVideos = async (pageNumber) => {
    setLoading(true);
    try {
      const videoData = await fetchData(
        trendingVideosUrl,
        params(10, pageNumber)
      );
      setLoading(false);

      if (pageNumber === 1) {
        // Clear previous videos on initial load
        setVideos(videoData.videos);
        loadedVideoIds.current.clear(); // Clear loaded video IDs
      } else {
        // Append new videos
        const newVideos = videoData.videos.filter(
          (video) => !loadedVideoIds.current.has(video.id)
        );
        newVideos.forEach((video) => loadedVideoIds.current.add(video.id));
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      }

      // Determine if there are more videos to load
      setHasMore(videoData.videos.length > 0);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  // Initial load of videos
  useEffect(() => {
    loadVideos(page);
  }, [page]);

  // Load more videos when in view and there are more to load
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  // Add video item refs function
  const addToRefs = useCallback((el) => {
    if (el && !videoItemRefs.current.includes(el)) {
      videoItemRefs.current.push(el);
    }
  }, []);

  return (
    <main>
      <div className="content">
        <h1>Popular videos</h1>
        <Video videos={videos} addToRefs={addToRefs} />
        {loading && <p className="loading">Loading videos...</p>}
        {!hasMore && <p className="no-more">No more videos available.</p>}
      </div>
      <div ref={ref}></div>
    </main>
  );
}
