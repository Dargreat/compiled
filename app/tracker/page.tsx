"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SubredditCard } from "@/components/SubredditCard";
import { useRedditSearch } from "@/hooks/useRedditSearch";
import { MessageSquare, TrendingUp, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const { subreddits, isLoading, hasSearched, searchSubreddits } = useRedditSearch();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f5f8', color: '#3b4458' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            {/* Icon beside header */}
            <div style={{ padding: '12px', borderRadius: '9999px', boxShadow: '0 4px 20px -4px rgba(255, 69, 0, 0.25)', background: 'linear-gradient(135deg, #ff4500, #cc3700)' }}>
              <MessageSquare style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#3b4458' }}>
                Reddit Sub Finder
              </h1>
              <p style={{ marginTop: '4px', color: '#8c949c' }}>
                Discover subreddits by searching keywords
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={searchSubreddits} isLoading={isLoading} />

          {/* Home Button */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link
              href="/"
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '0.375rem', backgroundColor: '#ff4500', color: 'white', transition: 'background-color 0.2s ease-in-out', cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc3700')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff4500')}
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px' }}>
        {!hasSearched && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ padding: '24px', borderRadius: '0.75rem', boxShadow: '0 2px 10px -2px rgba(59, 68, 88, 0.1)', border: '1px solid #e5e7eb', marginBottom: '32px', backgroundColor: 'white' }}>
                <SearchIcon style={{ width: '64px', height: '64px', color: '#ff4500', margin: '0 auto 16px', display: 'block' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#3b4458', marginBottom: '12px' }}>
                  Find Your Community
                </h2>
                <p style={{ color: '#8c949c', lineHeight: '1.625', marginBottom: '24px' }}>
                  Search for subreddits using keywords related to your interests.
                  Find communities discussing topics you care about, from technology
                  and gaming to hobbies and lifestyle.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', fontSize: '0.875rem', color: '#8c949c' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp style={{ width: '16px', height: '16px', color: '#ff4500' }} />
                    <span>Popular communities</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare style={{ width: '16px', height: '16px', color: '#ff4500' }} />
                    <span>Real Reddit data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results section */}
        {hasSearched && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3b4458' }}>
                {isLoading ? (
                  "Searching subreddits..."
                ) : subreddits.length > 0 ? (
                  `Found ${subreddits.length} subreddit${
                    subreddits.length !== 1 ? "s" : ""
                  }`
                ) : (
                  "No subreddits found"
                )}
              </h2>
            </div>

            {subreddits.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {subreddits.map((subreddit) => (
                  <div key={subreddit.display_name} style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
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

export default Index;
