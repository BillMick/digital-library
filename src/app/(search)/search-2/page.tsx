"use client";

import React, { useState, useEffect } from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "@/components/Input/Input";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "@/components/NcImage/NcImage";
import NcLink from "@/components/NcLink/NcLink";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import Card11 from "@/components/Card11/Card11";
import ButtonCircle from "@/components/Button/ButtonCircle";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import Tag from "@/components/Tag/Tag";
import CardAuthorBox2 from "@/components/CardAuthorBox2/CardAuthorBox2";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const cats = DEMO_CATEGORIES.filter((_, i) => i < 15);
const tags = DEMO_CATEGORIES.filter((_, i) => i < 32);
const authors = DEMO_AUTHORS.filter((_, i) => i < 12);

const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];

const TABS = ["Articles", "Categories", "Tags", "Authors"];

const PageSearch = () => {
  const [posts, setPosts] = useState<PostDataType[]>([]); // Store dynamic posts
  const [cats, setCats] = useState<any[]>(DEMO_CATEGORIES); // Keeping categories static for now
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  // Fetch posts from an API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/files"); // Replace with your API URL
        const data = await res.json();
        console.log(data);
        
        setPosts(data); // Store the fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className="nc-PageSearch">
      {/* Your previous layout and structure here */}

      {/* LOOP ITEMS POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
        {posts.map((post) => (
          <Card11 key={post.id} post={post} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
        <Pagination />
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default PageSearch;
