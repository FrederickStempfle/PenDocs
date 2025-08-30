"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  relevance: number;
}

export default function CustomSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        // Fetch search results from API
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border rounded-lg bg-muted/55 sm:w-52 w-full"
        aria-label="Search documentation"
      >
        <Search className="w-4 h-4" />
        <span className="ml-1 font-code">Search...</span>
        <div className="absolute right-2 top-[0.4rem] hidden items-center gap-0.5 text-xs font-code sm:flex pointer-events-none">
          <div className="bg-background/30 border rounded-md py-0.5 px-1 dark:border-neutral-700 border-neutral-300">
            Ctrl
          </div>
          <div className="bg-background/30 border rounded-md py-0.5 px-[0.28rem] dark:border-neutral-700 border-neutral-300">
            K
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50">
          <div
            ref={searchRef}
            className="w-full max-w-2xl bg-background rounded-lg shadow-lg border"
          >
            <div className="flex items-center border-b p-4">
              <Search className="w-5 h-5 mr-2 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent outline-none text-foreground"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full hover:bg-muted mr-2"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : results.length > 0 ? (
                <ul className="divide-y">
                  {results.map((result, index) => {
                    // Highlight search terms in title and excerpt
                    const highlightText = (text: string) => {
                      if (!query.trim()) return text;
                      const regex = new RegExp(`(${query.trim()})`, 'gi');
                      const parts = text.split(regex);
                      return parts.map((part, i) => 
                        regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 dark:text-white px-0.5 rounded">{part}</mark> : part
                      );
                    };
                    
                    // Format the path for display
                    const formattedPath = result.path
                      .replace(/^\/docs\//, '📚 ')
                      .replace(/^\/blog\//, '📝 ')
                      .replace(/\//g, ' › ');
                    
                    return (
                      <li key={index}>
                        <button
                          className="w-full text-left p-3 hover:bg-muted rounded-md flex flex-col gap-1"
                          onClick={() => handleResultClick(result.path)}
                        >
                          <span className="font-medium">{highlightText(result.title)}</span>
                          <span className="text-xs text-muted-foreground">{formattedPath}</span>
                          <span className="text-sm text-muted-foreground line-clamp-2">
                            {highlightText(result.excerpt)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : query.trim() ? (
                <div className="p-4 text-center text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
