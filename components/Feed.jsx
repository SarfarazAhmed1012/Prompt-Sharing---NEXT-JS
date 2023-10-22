"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter the posts based on the search text
    const filtered = posts.filter((post) => {
      const prompt = post.prompt.toLowerCase();
      const tag = post.tag.toLowerCase();
      const searchTextLower = text.toLowerCase();
      return prompt.includes(searchTextLower) || tag.includes(searchTextLower);
    });

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag and username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
