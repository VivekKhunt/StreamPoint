import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Play, Info } from "lucide-react";
import { VideoGrid } from "../../components/video-grid";
import { CategoryFilters } from "../../components/category-filters";
import { Button } from "../../components/ui/button";
import { DUMMY_VIDEOS, DUMMY_CATEGORIES } from "../../lib/dummy-data";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredVideo = DUMMY_VIDEOS[0];
  const filteredVideos =
    selectedCategory === "All"
      ? DUMMY_VIDEOS
      : DUMMY_VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-b from-primary/20 to-background overflow-hidden group">
        <img
          src={featuredVideo.thumbnail}
          alt={featuredVideo.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 pb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2 line-clamp-2">
            {featuredVideo.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
            {featuredVideo.owner.name} • {featuredVideo.views.toLocaleString()} views
          </p>
          <div className="flex gap-2">
            <Link to={`/watch/${featuredVideo.id}`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg">
                <Play size={18} fill="currentColor" />
                Play Now
              </Button>
            </Link>
            <Button variant="outline" className="border-border hover:bg-secondary gap-2 rounded-lg">
              <Info size={18} />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Recommended For You
          </h2>
          <CategoryFilters
            categories={DUMMY_CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <VideoGrid videos={filteredVideos} />
      </div>
    </div>
  );
}