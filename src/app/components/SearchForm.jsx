"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("photos"); // default type is photos

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const targetPage =
        searchType === "photos" ? "/search/photos" : "/search/videos";
      router.push(`${targetPage}?query=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <div className="searchContainer">
        <select
          className="select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="photos">Photos</option>
          <option value="videos">Videos</option>
        </select>
        <input
          type="text"
          placeholder={`Search for ${searchType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
      </div>
    </form>
  );
}

export default SearchForm;
