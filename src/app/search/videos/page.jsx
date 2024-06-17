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

  useEffect(() => {
    if (query) {
      setVideos([]); // Clear previous results
      setPage(1); // Reset page number
      setHasMore(true); // Reset hasMore
    }
  }, [query]);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const videoResults = await fetchData(
        searchVideosUrl,
        params(10, page, query)
      );
      setLoading(false);

      if (videoResults.videos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => [...prevVideos, ...videoResults.videos]);
      }
    };

    if (query) {
      loadVideos();
    }
  }, [query, page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <main>
      <div className="content">
        <h1>Search Results for "{query}"</h1>
        {loading && <p>Loading...</p>}
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
        {loading && <p>Loading more videos...</p>}
        {!hasMore && <p>No more videos available.</p>}
      </div>
    </main>
  );
};

export default SearchVideosPage;
