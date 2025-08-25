"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const { subreddits, isLoading, hasSearched, searchSubreddits } = useRedditSearch();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4e6", color: "#000" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffdde1", borderBottom: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ padding: "0.75rem", borderRadius: "9999px", background: "linear-gradient(to right, #ef4444, #dc2626)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
              <MessageSquare style={{ width: "2rem", height: "2rem", color: "#fff" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#000" }}>Reddit Sub Finder</h1>
              <p style={{ marginTop: "0.25rem", color: "#333" }}>Discover subreddits by searching keywords</p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={searchSubreddits} isLoading={isLoading} />

          {/* Home Button */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#ef4444",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1024px", margin: "0 auto", padding: "2rem" }}>
        {!hasSearched && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#fff",
                  borderRadius: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  marginBottom: "2rem",
                }}
              >
                <SearchIcon style={{ width: "4rem", height: "4rem", color: "#ef4444", margin: "0 auto 1rem auto" }} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.75rem", color: "#000" }}>Find Your Community</h2>
                <p style={{ color: "#333", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                  Search for subreddits using keywords related to your interests.
                  Find communities discussing topics you care about, from technology
                  and gaming to hobbies and lifestyle.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.875rem", color: "#555" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <TrendingUp style={{ width: "1rem", height: "1rem", color: "#ef4444" }} />
                    <span>Popular communities</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MessageSquare style={{ width: "1rem", height: "1rem", color: "#ef4444" }} />
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#000" }}>
                {isLoading
                  ? "Searching subreddits..."
                  : subreddits.length > 0
                  ? `Found ${subreddits.length} subreddit${subreddits.length !== 1 ? "s" : ""}`
                  : "No subreddits found"}
              </h2>
            </div>

            {subreddits.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                {subreddits.map((subreddit) => (
                  <div
                    key={subreddit.display_name}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "1rem",
                      padding: "1rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <SubredditCard subreddit={subreddit} visitButtonStyle={{ backgroundColor: "#ef4444", color: "#fff", border: "none" }} />
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

export default Index;
