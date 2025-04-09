
import { useState, useEffect } from "react";
import { Gamepad2, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StreamerCard from "@/components/StreamerCard";
import { mockStreams, getStreamerById } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [filteredStreams, setFilteredStreams] = useState(mockStreams);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  // Unique categories from streams
  const availableCategories = Array.from(
    new Set(mockStreams.flatMap((stream) => stream.categories))
  ).sort();

  // Filter streams based on search query and category
  useEffect(() => {
    let filtered = [...mockStreams];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (stream) =>
          stream.title.toLowerCase().includes(query) ||
          getStreamerById(stream.streamerId)?.displayName
            .toLowerCase()
            .includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((stream) =>
        stream.categories.includes(selectedCategory)
      );
    }

    setFilteredStreams(filtered);
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Browse Streams</h1>
        <p className="text-muted-foreground">Discover live streams from creators around the world</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search streams or streamers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isMobile ? (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Mobile filters */}
        {isMobile && showFilters && (
          <div className="p-4 border rounded-md bg-card/50 animate-fade-in">
            <h3 className="font-medium mb-3">Filters</h3>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Active filters */}
        {(searchQuery || selectedCategory) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm">Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: {searchQuery}
              </Badge>
            )}
            {selectedCategory && (
              <Badge className="bg-twitch-500">
                {selectedCategory}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm h-7 px-2"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {filteredStreams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredStreams.map((stream) => {
            const streamer = getStreamerById(stream.streamerId);
            return (
              <StreamerCard
                key={stream.id}
                id={stream.id}
                thumbnailUrl={stream.thumbnailUrl}
                title={stream.title}
                streamerName={streamer?.displayName || "Unknown Streamer"}
                streamerAvatar={streamer?.avatarUrl}
                viewerCount={stream.viewerCount}
                isLive={stream.isLive}
                categories={stream.categories}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-card/30">
          <Gamepad2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-1">No streams found</h2>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Browse;
