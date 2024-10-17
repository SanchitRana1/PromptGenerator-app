"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard key={post?._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    // deBounceMethod
    clearTimeout(searchTimeout)
		setSearchText(e.target.value);
    setSearchTimeout(setTimeout(()=>{
      const searchItem = filterPrompts(e.target.value);
      setSearchResults(searchItem)
    },500))
	};

	const filterPrompts= (searchText) => {
		const regex = new RegExp(searchText, "i");
		return posts.filter(item=> regex.test(item.creator.username) || regex.test(item.tag)||regex.test(item.prompt))
	};

  const handleTagClick=(tagname)=>{
    setSearchText(tagname)
    const data = filterPrompts(tagname)
    console.log(data);
    setSearchResults(data)
  };
	
  const fetchPrompts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();
		setPosts(data);
	};
	
  useEffect(() => {
		fetchPrompts();
	}, []);
	return (
		<section className="feed">
			<form action="" className="w-full flex-center relative" onSubmit={e=>e.preventDefault()}>
				<input
					type="text"
					placeholder="Search for a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{/* <PromptCardList data={searchText.length > 0 ? searchResults : posts} handleTagClick={handleTagClick} /> */}
		 {/* All Prompts */}
     {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
	);
};

export default Feed;
