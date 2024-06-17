"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { fetchData, params } from "../../utils/utils";
import Photos from "../../components/Photos";

const searchPhotosUrl = "https://api.pexels.com/v1/search";

const SearchPhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPhotoIds = useRef(new Set());

  const searchParams = useSearchParams(); // Access search params directly
  const query = searchParams.get("query") || ""; // Get 'query' parameter from searchParams

  // Function to fetch photos
  const loadPhotos = async (pageNumber) => {
    setLoading(true);
    const photoResults = await fetchData(
      searchPhotosUrl,
      params(20, pageNumber, query)
    );
    setLoading(false);

    if (pageNumber === 1) {
      // Reset state when fetching the first page
      setPhotos(photoResults.photos);
      fetchedPhotoIds.current.clear(); // Clear fetched photo IDs
      photoResults.photos.forEach((photo) =>
        fetchedPhotoIds.current.add(photo.id)
      );
    } else {
      // Append new photos to photos
      const uniqueNewPhotos = photoResults.photos.filter(
        (photo) => !fetchedPhotoIds.current.has(photo.id)
      );
      uniqueNewPhotos.forEach((photo) => fetchedPhotoIds.current.add(photo.id));
      setPhotos((prevPhotos) => [...prevPhotos, ...uniqueNewPhotos]);
    }

    // Determine if there are more pages to fetch
    setHasMore(photoResults.photos.length > 0);
  };

  // Fetch photos on initial load and when query changes
  useEffect(() => {
    setPage(1); // Reset page to 1 when query changes
    setPhotos([]); // Clear photos when query changes
    fetchedPhotoIds.current.clear(); // Clear fetched photo IDs when query changes
    loadPhotos(1); // Load photos for page 1 on query change
  }, [query]); // Reload photos when query changes

  // Fetch more photos when page changes
  useEffect(() => {
    if (page > 1) {
      loadPhotos(page);
    }
  }, [page]); // Fetch photos when page changes

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
  }, [loading, hasMore]); // Re-attach event listener on changes

  return (
    <main>
      <div className="content">
        <h1>Search Results for "{query}"</h1>
        <Photos photos={photos} />
        {loading && <p className="loading">Loading photos...</p>}
        {!hasMore && <p className="no-more">No more photos available.</p>}
      </div>
    </main>
  );
};

export default SearchPhotosPage;
