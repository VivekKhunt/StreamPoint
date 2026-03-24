import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { TopNav } from "../../components/top-nav";
import { BottomNav } from "../../components/bottom-nav";
import { VideoGrid } from "../../components/video-grid";
import { CategoryFilters } from "../../components/category-filters";
import { DUMMY_VIDEOS, DUMMY_CATEGORIES } from "../../lib/dummy-data";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? [...DUMMY_VIDEOS].sort(() => Math.random() - 0.5)
      : DUMMY_VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Explore
        </h1>
        <p className="text-muted-foreground mb-6">
          Discover new content across all categories
        </p>
        <CategoryFilters
          categories={DUMMY_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <VideoGrid videos={filteredVideos} />
      </div>
    </div>
  );
}
