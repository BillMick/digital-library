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

const TABS = ["Fichiers", "Catégories", "Tags", "Auteurs"];

const PageSearch = ({}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [tabActive, setTabActive] = useState(TABS[0]);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3003/api/files");
        const data = await response.json();
        setFiles(data.files); // Ensure the response structure has "files"
      } catch (error) {
        console.error("Error fetching files:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFiles();
  }, []);

  let s = "Technologie";
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Fetch data on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const responsePosts = await fetch("http://localhost:3003/api/files");
  //       const postsData = await responsePosts.json();
  //       setPosts(postsData);
  //     } catch (error) {
  //       // setError(error);
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [tabActive, setTabActive] = useState(TABS[0]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-PageSearch`}>
      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-9 lg:aspect-h-5 overflow-hidden z-0">
          <NcImage
            alt="search"
            fill
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
        </div>
        {/* CONTENT */}
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl font-semibold">{s}</h2>
              <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                We found{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  1135
                </strong>{" "}
                results for{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  {s}
                </strong>
              </span>
              <form
                className="relative w-full mt-8 sm:mt-11 text-left"
                method="post"
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    id="search-input"
                    type="search"
                    placeholder="Type and press enter"
                    sizeClass="pl-14 py-5 pe-5 md:ps-16"
                    defaultValue={s}
                  />
                  <ButtonCircle
                    className="absolute end-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
                  </ButtonCircle>
                  <span className="absolute start-5 top-1/2 transform -translate-y-1/2 text-2xl md:start-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      ></path>
                    </svg>
                  </span>
                </label>
              </form>
              <div className="w-full text-sm text-start mt-4 text-neutral-500 dark:text-neutral-300">
                <div className="inline-block space-x-1.5 sm:space-x-2.5 rtl:space-x-reverse">
                  <span className="">Sont reliés:</span>
                  <NcLink className="inline-block font-normal" href="/search">
                    Design
                  </NcLink>
                  <NcLink className="inline-block font-normal" href="/search">
                    Optimisation
                  </NcLink>
                  <NcLink className="inline-block font-normal" href="/search">
                    Frontend
                  </NcLink>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar"
              className="sm:space-x-2 rtl:space-x-reverse"
            >
              {TABS.map((item, index) => (
                <NavItem
                  isActive={item === tabActive}
                  key={index}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          {/* LOOP ITEMS FILES */}
          {tabActive === "Articles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {loading ? (
                <p className="text-center col-span-full">Chargement...</p>
              ) : error ? (
                <p className="text-center col-span-full text-red-500">Erreur de chargement.</p>
              ) : files.length === 0 ? (
                <p className="text-center col-span-full">Aucun fichier trouvé.</p>
              ) : (
                files.map((file) => <Card11 key={file.id} file={file} />)
              )}
            </div>
          )}

          {/* LOOP ITEMS CATEGORIES */}
          {tabActive === "Categories" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {cats.map((cat) => (
                <CardCategory2 key={cat.id} taxonomy={cat} />
              ))}
            </div>
          )}
          {/* LOOP ITEMS TAGS */}
          {tabActive === "Tags" && (
            <div className="flex flex-wrap mt-12 ">
              {tags.map((tag) => (
                <Tag className="mb-3 mr-3" key={tag.id} tag={tag} />
              ))}
            </div>
          )}
          {/* LOOP ITEMS POSTS */}
          {tabActive === "Authors" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {authors.map((author) => (
                <CardAuthorBox2 key={author.id} author={author} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageSearch;
