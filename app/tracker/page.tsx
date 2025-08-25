"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, TrendingUp, Search as SearchIcon, ArrowRight } from "lucide-react";

interface Subreddit {
  display_name: string;
  title: string;
  subscribers: number;
  public_description: string;
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&type=sr`);
      const data = await res.json();
      const subs = data.data.children.map((child: any) => ({
        display_name: child.data.display_name,
        title: child.data.title,
        subscribers: child.data.subscribers,
        public_description: child.data.public_description,
      }));
      setSubreddits(subs);
    } catch (err) {
      console.error(err);
      setSubreddits([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E6E0F8", color: "#000" }}> {/* 🟣 Page background */}
      {/* Header */}
      <header style={{ backgroundColor: "#FFDDDE", borderBottom: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ padding: "0.75rem", borderRadius: "9999px", backgroundColor: "#EF4444", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
              <MessageSquare style={{ width: "2rem", height: "2rem", color: "#fff" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#000" }}>Reddit Sub Finder</h1>
              <p style={{ marginTop: "0.25rem", color: "#333" }}>Discover subreddits by searching keywords</p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: "32rem", margin: "0 auto", position: "relative" }}>
            <input
              type="text"
              placeholder="Search for subreddits..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "0.75rem 4rem 0.75rem 3rem",
                borderRadius: "0.75rem",
                border: "1px solid #D1D5DB",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "1rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
            <SearchIcon style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", width: "1.25rem", height: "1.25rem" }} />
            <button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              style={{
                position: "absolute",
                right: "0.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#EF4444",
                color: "#fff",
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                cursor: isLoading || !query.trim() ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Home Button */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#EF4444",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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
                  border: "1px solid #D1D5DB",
                  marginBottom: "2rem",
                }}
              >
                <SearchIcon style={{ width: "4rem", height: "4rem", color: "#EF4444", margin: "0 auto 1rem auto" }} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.75rem", color: "#000" }}>Find Your Community</h2>
                <p style={{ color: "#000", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                  Search for subreddits using keywords related to your interests.
                  Find communities discussing topics you care about, from technology
                  and gaming to hobbies and lifestyle.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.875rem", color: "#000" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <TrendingUp style={{ width: "1rem", height: "1rem", color: "#EF4444" }} />
                    <span>Popular communities</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MessageSquare style={{ width: "1rem", height: "1rem", color: "#EF4444" }} />
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
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "0.25rem" }}>{subreddit.title}</h3>
                    <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>{subreddit.public_description}</p>
                    <p style={{ fontSize: "0.75rem", color: "#555", marginBottom: "0.5rem" }}>{subreddit.subscribers.toLocaleString()} subscribers</p>
                    <a
                      href={`https://reddit.com/r/${subreddit.display_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "#EF4444",
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 500,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      Visit
                    </a>
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
