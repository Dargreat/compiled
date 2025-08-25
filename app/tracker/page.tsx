"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const { subreddits, isLoading, hasSearched, searchSubreddits } = useRedditSearch();

  return (
    <div className="min-h-screen bg-pink-100 text-black">
      {/* Header */}
      <header className="bg-pink-200 border-b border-pink-300 shadow-sm rounded-b-xl">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="p-3 bg-red-500 rounded-full shadow-md">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">
                Reddit Sub Finder
              </h1>
              <p className="text-gray-700 mt-1">
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
              className="inline-block px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="p-6 bg-pink-200 rounded-2xl shadow-md border border-pink-300 mb-8">
                <SearchIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-black mb-3">
                  Find Your Community
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Search for subreddits using keywords related to your interests.
                  Find communities discussing topics you care about, from technology
                  and gaming to hobbies and lifestyle.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span>Popular communities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-red-600" />
                    <span>Real Reddit data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">
                {isLoading ? (
                  "Searching subreddits..."
                ) : subreddits.length > 0 ? (
                  `Found ${subreddits.length} subreddit${subreddits.length !== 1 ? "s" : ""}`
                ) : (
                  "No subreddits found"
                )}
              </h2>
            </div>

            {subreddits.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subreddits.map((subreddit) => (
                  <SubredditCard
                    key={subreddit.display_name}
                    subreddit={subreddit}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
