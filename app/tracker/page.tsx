"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const TrackerPage = () => {
  const { subreddits, isLoading, hasSearched, searchReddit } = useRedditSearch();

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8"
      style={{
        backgroundColor: "#ffeef2", // inline same pink background as main page
        fontFamily: "'Inter', sans-serif", // match main page font
      }}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8 max-w-4xl">
        <Link
          href="/"
          className="text-red-600 font-bold text-lg sm:text-xl md:text-2xl"
        >
          Home
        </Link>
        <div className="flex items-center space-x-2">
          <MessageSquare className="text-red-600 w-6 h-6" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Reddit Sub Finder
          </h1>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center mb-10">
        <SearchIcon className="text-red-600 w-10 h-10 mb-3" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-gray-900">
          Find Your Community
        </h2>
        <p className="text-gray-700 mb-6">Discover real Reddit data instantly</p>
        <SearchBar onSearch={searchReddit} isLoading={isLoading} />
      </div>

      {/* Results Section */}
      <div className="w-full max-w-3xl">
        {isLoading && (
          <p className="text-center text-gray-600">Searching...</p>
        )}

        {!isLoading && hasSearched && subreddits.length === 0 && (
          <p className="text-center text-gray-600">
            No results found. Try another keyword.
          </p>
        )}

        {!isLoading && subreddits.length > 0 && (
          <>
            <div className="flex items-center mb-4">
              <TrendingUp className="text-red-600 w-5 h-5 mr-2" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Popular communities
              </h3>
            </div>
            <div className="grid gap-4">
              {subreddits.map((subreddit) => (
                <SubredditCard key={subreddit.id} subreddit={subreddit} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
