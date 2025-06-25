import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useDebounce } from "../hooks/useDebounce";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

  // Search the brain
  const [searchTerm, setSearchTerm] = useState(""); // State for search term from Input
  const [searchResults, setSearchResults] = useState([]); // State for search results In DB
  const [isSearching, setIsSearching] = useState(false); // State for search status
  const [searchType, setSearchType] = useState("all"); // State for search type
  const [searchError, setSearchError] = useState(""); // State for search errors

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      // Only search after 3 characters
      performSearch(debouncedSearchTerm);
    } else if (debouncedSearchTerm.length === 0) {
      // Clear search results when search is empty
      setSearchResults([]);
      setSearchError("");
    }
  }, [debouncedSearchTerm]);

  async function performSearch(searchTerm: string) {
    setIsSearching(true);
    setSearchError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/search`,
        {
          searchTerm,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const searchData = response.data.contents;
      setSearchResults(searchData);
      console.log("Search Results:", searchData);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError("Search failed. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchError("");
  };

  async function shareBrain() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/share`,
      {
        share: true,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`;
    alert(shareUrl);
  }

  const contents = useContent();

  // Determine what to display: search results or all content
  const isSearchActive = searchTerm.length > 0;
  const displayContent = isSearchActive ? searchResults : contents;
  const hasSearchResults = searchResults.length > 0;

  return (
    <>
      <div>
        <Sidebar />

        <div className="p-4 ml-72 h-min-screen bg-gray-100 border-2">
          <CreateContentModal
            open={modelOpen}
            onClose={() => {
              setModelOpen(false);
            }}
          />
          {/* Enhanced Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search Section */}
              <div className="flex-1 max-w-2xl">
                <div className="relative group">
                  {/* Search Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Enhanced Input Field */}
                  <input
                    placeholder="Search your brain... 🧠"
                    className="w-full pl-12 pr-12 py-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  {/* Clear Button */}
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      title="Clear search"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Loading Indicator */}
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>

                {/* Search Status - Moved under search */}
                {isSearchActive && (
                  <div className="mt-3 px-2">
                    {!isSearching && searchTerm.length > 2 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600 font-medium">
                          {hasSearchResults
                            ? `Found ${searchResults.length} result${
                                searchResults.length === 1 ? "" : "s"
                              } for "${searchTerm}"`
                            : `No results found for "${searchTerm}"`}
                        </span>
                      </div>
                    )}
                    {searchError && (
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-red-600 font-medium">
                          {searchError}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  startIcon={<PlusIcon size="lg" />}
                  variant="primary"
                  text="Add Content"
                  onClick={() => {
                    setModelOpen(() => !modelOpen);
                  }}
                  size="md"
                />
                <Button
                  startIcon={<ShareIcon />}
                  variant="secondary"
                  text="Share Brain"
                  onClick={shareBrain}
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-max">
            {displayContent.map(({ type, link, title, tags }, index) => (
              <Card
                key={index}
                title={title}
                link={link}
                type={type}
                tags={tags}
              />
            ))}
          </div>

          {/* Empty States */}
          {!isSearching && displayContent.length === 0 && (
            <div className="text-center py-12">
              {isSearchActive ? (
                <div className="space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="text-xl font-medium text-gray-700">
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try different keywords or{" "}
                    <button
                      onClick={clearSearch}
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      browse all content
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl">🧠</div>
                  <h3 className="text-xl font-medium text-gray-700">
                    Your brain is empty
                  </h3>
                  <p className="text-gray-500">
                    Start by adding some content to your digital brain
                  </p>
                  <Button
                    startIcon={<PlusIcon size="lg" />}
                    variant="primary"
                    text="Add Your First Content"
                    onClick={() => setModelOpen(true)}
                    size="md"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
