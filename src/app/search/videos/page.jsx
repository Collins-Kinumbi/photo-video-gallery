"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { fetchData, params } from "../../utils/utils";
import { useInView } from "react-intersection-observer";

const searchVideosUrl = "https://api.pexels.com/videos/search";

const SearchVideosPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5, // Load more when the component is 50% in view
  });

  const initialLoad = useRef(true);

  // Function to load videos
  async function loadVideos(pageNumber) {
    setLoading(true);
    try {
      const videoResults = await fetchData(
        searchVideosUrl,
        params(10, pageNumber, query)
      );

      if (pageNumber === 1) {
        // Reset videos on initial load
        setVideos(videoResults.videos);
      } else {
        // Append new videos
        setVideos((prevVideos) => [...prevVideos, ...videoResults.videos]);
      }

      // Determine if there are more videos to load
      setHasMore(videoResults.videos.length > 0);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Effect to fetch videos when query changes or page number changes
  useEffect(() => {
    if (query) {
      setPage(1); // Reset page number
      setVideos([]); // Clear previous videos
      setHasMore(true); // Reset hasMore to true
    }
  }, [query]);

  useEffect(() => {
    if (query && !initialLoad.current) {
      loadVideos(page);
    }
  }, [query, page]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <main>
      <div className="content">
        <h1>Search Results for "{query}"</h1>

        <div className="video-gallery">
          {videos.map((video) => (
            <div className="video-item" key={video.id}>
              <video controls poster={video.image} muted>
                <source
                  src={video.video_files[0].link}
                  type={video.video_files[0].file_type}
                />
              </video>
            </div>
          ))}
        </div>
        <div ref={ref}></div>
        {loading && <p className="loading">Loading...</p>}
        {!hasMore && <p className="no-more">No more videos available.</p>}
      </div>
    </main>
  );
};

export default SearchVideosPage;
