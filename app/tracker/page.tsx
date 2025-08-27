"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const { subreddits, isLoading, hasSearched } = useRedditSearch();

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundColor: "#fdeef3", // inline background (matches main page light pink)
        fontFamily: "Arial, Helvetica, sans-serif", // inline font
      }}
    >
      {/* Top navigation bar */}
      <div className="w-full flex justify-between items-center p-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-xl font-bold"
          style={{
            backgroundColor: "#e02424", // 🔴 restore red background for Home button
            color: "white",
          }}
        >
          Home
        </Link>
      </div>

      {/* Header with icon and text */}
      <div className="flex flex-col items-center text-center mt-6">
        <MessageSquare
          className="w-12 h-12 mb-3"
          style={{ color: "#e02424" }} // 🔴 red chat bubble icon
        />
        <h1 className="text-3xl font-bold" style={{ color: "#111" }}>
          Reddit Sub Finder
        </h1>
        <p className="text-base mt-1" style={{ color: "#333" }}>
          Find Your Community
        </p>
      </div>

      {/* Search section */}
      <div className="w-full max-w-lg px-4 mt-8">
        <div className="flex items-center border rounded-xl bg-white p-2">
          <SearchIcon
            className="w-6 h-6 mr-2"
            style={{ color: "#e02424" }} // 🔴 restore red search icon
          />
          <SearchBar />
        </div>
      </div>

      {/* Results */}
      <div
        className="w-full max-w-4xl px-4 mt-8 rounded-2xl p-6"
        style={{ backgroundColor: "#fbdde9" }} // slightly darker pink for results section
      >
        {isLoading && <p>Loading results...</p>}

        {!isLoading && hasSearched && subreddits.length === 0 && (
          <p>No results found.</p>
        )}

        {!isLoading && subreddits.length > 0 && (
          <div className="grid gap-4">
            {subreddits.map((subreddit) => (
              <SubredditCard key={subreddit.id} subreddit={subreddit} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <TrendingUp
          className="w-6 h-6 mx-auto mb-2"
          style={{ color: "#e02424" }} // 🔴 red trending up icon
        />
        <h2 className="text-xl font-bold" style={{ color: "#111" }}>
          Popular communities
        </h2>
        <p className="text-sm mt-1" style={{ color: "#333" }}>
          Real Reddit data
        </p>
      </div>
    </div>
  );
};

export default Index;
