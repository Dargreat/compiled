"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, Search as SearchIcon } from "lucide-react";

const TrackerPage = () => {
  const { subreddits, isLoading, hasSearched, searchSubreddits } =
    useRedditSearch();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#ffeef2", // inline background (light pink)
        fontFamily: "'Inter', sans-serif",
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <header className="w-full shadow-sm border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
          {/* Title */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 text-center sm:text-left">
            <div className="p-3 rounded-full shadow bg-red-600">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Reddit Sub Finder</h1>
              <p className="text-gray-600 mt-1">
                Discover subreddits by searching keywords
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-lg">
            <SearchBar
              onSearch={searchSubreddits}
              isLoading={isLoading}
              iconColor="text-red-600" // 🔴 restored red search icon
              buttonColor="bg-red-600 hover:bg-red-700"
              textColor="text-white"
            />
          </div>

          {/* Home Button */}
          <div className="mt-6">
            <Link
              href="/"
              className="inline-block rounded-md bg-red-600 text-white px-4 py-2 font-medium hover:bg-red-700 transition"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto p-8 w-full">
        {/* Empty state */}
        {!hasSearched && (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-3">Find Your Community</h2>
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
              Search for subreddits using keywords related to your interests.
              Find communities discussing topics you care about — from
              technology and gaming to hobbies and lifestyle.
            </p>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-6">
              {isLoading
                ? "Searching subreddits..."
                : subreddits.length > 0
                ? `Found ${subreddits.length} subreddit${
                    subreddits.length !== 1 ? "s" : ""
                  }`
                : "No subreddits found"}
            </h2>

            {subreddits.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subreddits.map((subreddit) => (
                  <div
                    key={subreddit.display_name}
                    className="bg-white rounded-xl shadow p-4"
                  >
                    <SubredditCard subreddit={subreddit} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackerPage;
