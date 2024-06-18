"use client";

import { useEffect, useState, useRef } from "react";
import { fetchData, params } from "./utils/utils";
import Photos from "./components/Photos";

const trendingImagesUrl = "https://api.pexels.com/v1/curated";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPhotoIds = useRef(new Set());

  // Function to fetch photos
  async function loadPhotos(pageNumber) {
    setLoading(true);
    try {
      const newPhotos = await fetchData(
        trendingImagesUrl,
        params(20, pageNumber)
      );
      setLoading(false);

      if (pageNumber === 1) {
        // Reset state when fetching the first page
        setPhotos(newPhotos.photos);
        fetchedPhotoIds.current.clear(); // Clear fetched photo IDs
      } else {
        // Append new photos to photos
        const uniqueNewPhotos = newPhotos.photos.filter(
          (photo) => !fetchedPhotoIds.current.has(photo.id)
        );
        setPhotos((prevPhotos) => [...prevPhotos, ...uniqueNewPhotos]);
      }

      // Update fetched photo IDs
      newPhotos.photos.forEach((photo) =>
        fetchedPhotoIds.current.add(photo.id)
      );

      // Determine if there are more pages to fetch
      setHasMore(newPhotos.photos.length > 0);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setLoading(false);
    }
  }

  // Initial fetch
  useEffect(() => {
    loadPhotos(page);
  }, [page]); // Fetch photos when page changes

  // Infinite scroll event listener with debounce
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    const debounceScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debounceScroll);

    return () => window.removeEventListener("scroll", debounceScroll);
  }, [loading, hasMore]); // Re-attach event listener on changes

  // Debounce function
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  return (
    <main>
      <div className="content">
        <h1>Trending photos</h1>
        <Photos photos={photos} />
        {loading && <p className="loading">Loading photos...</p>}
        {!hasMore && <p className="no-more">No more photos available.</p>}
      </div>
    </main>
  );
};

export default Home;
