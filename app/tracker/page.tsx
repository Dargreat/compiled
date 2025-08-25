"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Subreddit {
  id: string;
  name: string;
  description: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <div style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          <Input
            type="text"
            placeholder="Search for subreddits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            style={{
              width: "100%",
              height: "3.5rem",
              paddingLeft: "3rem",
              paddingRight: "6rem",
              fontSize: "1.125rem",
              borderWidth: "2px",
              borderColor: "#d1d5db",
              borderRadius: "1rem",
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          />
          <Search
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "1.25rem",
              height: "1.25rem",
              color: "#6b7280",
            }}
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              height: "2.5rem",
              padding: "0 1rem",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              borderRadius: "0.5rem",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#b91c1c")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#dc2626")
            }
          >
            {isLoading ? (
              <>
                <Loader2 style={{ width: "1rem", height: "1rem", marginRight: "0.5rem", animation: "spin 1s linear infinite" }} />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

const TrackerPage = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchSubreddits = async (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubreddits([
        {
          id: "1",
          name: `r/${query}Example1`,
          description: "This is a description for subreddit example 1",
        },
        {
          id: "2",
          name: `r/${query}Example2`,
          description: "This is a description for subreddit example 2",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffe4e6, #fbcfe8)",
        padding: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#b91c1c", fontSize: "2rem", marginBottom: "2rem" }}>
        Subreddit Tracker
      </h1>
      <SearchBar onSearch={searchSubreddits} isLoading={isLoading} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {subreddits.map((sub) => (
          <div
            key={sub.id}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{sub.name}</h2>
            <p style={{ marginTop: "0.5rem", flexGrow: 1 }}>{sub.description}</p>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#dc2626",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#b91c1c")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#dc2626")
              }
            >
              Visit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackerPage;
