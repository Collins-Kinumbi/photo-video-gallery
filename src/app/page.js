"use client";

import { useEffect, useState, useRef } from "react";
import { fetchData, params } from "@/app/utils/utils";
import Image from "next/image";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const initialLoad = useRef(true);

  // Function to fetch photos
  async function loadPhotos(page) {
    setLoading(true);
    const trendingImagesUrl = "https://api.pexels.com/v1/curated";
    const newPhotos = await fetchData(trendingImagesUrl, params(10, page));
    // console.log(`Fetching page ${page}`, newPhotos);
    setLoading(false);

    if (newPhotos.photos.length === 0) {
      setHasMore(false);
    } else {
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos.photos]);
    }
  }

  // Initial fetch
  useEffect(() => {
    if (initialLoad.current) {
      loadPhotos(page);
      initialLoad.current = false;
    }
  }, []);

  // Fetch more photos when page changes
  useEffect(() => {
    if (!initialLoad.current && page > 1) {
      loadPhotos(page);
    }
  }, [page]);

  // Infinite scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <main>
      <div className="content">
        <h1>Trending photos</h1>
        <div className="photo-gallery">
          {photos &&
            photos.map((photo, index) => (
              <div className="photo-item" key={`${photo.id}-${index}`}>
                <Image
                  src={photo.src.portrait}
                  alt={photo.alt}
                  width={800}
                  height={1200}
                  priority
                />
                <div className="overlay">
                  <span>photo by {photo.photographer}</span>
                </div>
              </div>
            ))}
        </div>
        {loading && <p>Loading photos...</p>}
        {!hasMore && <p>No more photos available.</p>}
      </div>
    </main>
  );
}
