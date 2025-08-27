"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const TrackerPage = () => {
  const { subreddits, isLoading, hasSearched, searchSubreddits } =
    useRedditSearch();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f9fafb", // same as main page background
        color: "#111827", // main page foreground
        fontFamily: "Inter, sans-serif", // same font as main page
      }}
    >
      {/* Header */}
      <header
        className="border-b shadow-sm"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <div className="max-w-4xl mx-auto p-6">
          {/* Title with icon */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center sm:text-left">
            <div className="p-3 rounded-full shadow-lg bg-gradient-to-br from-red-500 to-red-700">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>
                Reddit Sub Finder
              </h1>
              <p className="mt-1" style={{ color: "#6b7280" }}>
                Discover subreddits by searching keywords
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={searchSubreddits} isLoading={isLoading} />

          {/* Home Button */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-block rounded-md px-4 py-2 font-medium transition-colors"
              style={{
                backgroundColor: "#ef4444", // red-500
                color: "#ffffff",
              }}
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              <div
                className="rounded-xl shadow-md p-8 mb-8 border"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                }}
              >
                <SearchIcon
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: "#ef4444" }}
                />
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#111827" }}
                >
                  Find Your Community
                </h2>
                <p
                  className="leading-relaxed mb-6"
                  style={{ color: "#6b7280" }}
                >
                  Search for subreddits using keywords related to your
                  interests. Find communities discussing topics you care about,
                  from technology and gaming to hobbies and lifestyle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2" style={{ color: "#6b7280" }}>
                    <TrendingUp className="w-4 h-4" style={{ color: "#ef4444" }} />
                    <span>Popular communities</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "#6b7280" }}>
                    <MessageSquare className="w-4 h-4" style={{ color: "#ef4444" }} />
                    <span>Real Reddit data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results section */}
        {hasSearched && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: "#111827" }}>
                {isLoading
                  ? "Searching subreddits..."
                  : subreddits.length > 0
                  ? `Found ${subreddits.length} subreddit${
                      subreddits.length !== 1 ? "s" : ""
                    }`
                  : "No subreddits found"}
              </h2>
            </div>

            {subreddits.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subreddits.map((subreddit) => (
                  <div
                    key={subreddit.display_name}
                    className="rounded-xl shadow-sm p-4 border"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e5e7eb",
                    }}
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
