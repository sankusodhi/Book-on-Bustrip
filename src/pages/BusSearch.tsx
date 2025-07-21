import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusCard from "@/components/BusCard";
import BusFilters from "@/components/BusFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { mockBuses, getTimeCategory, Bus } from "@/data/mockBuses";
import type { FilterState } from "@/components/BusFilters";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Filter,
  SortAsc,
  Clock,
  Star,
  IndianRupee
} from "lucide-react";

const BusSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const from = searchParams.get("from") || "Dantewada";
  const to = searchParams.get("to") || "Raipur";
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0];
  
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure' | 'rating'>('departure');
  const [filters, setFilters] = useState<FilterState>({
    busTypes: [],
    timeSlots: [],
    priceRange: [400, 1000],
    isAC: null
  });

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  });

  const filteredAndSortedBuses = useMemo(() => {
    let filtered = mockBuses.filter(bus => {
      // Bus type filter
      if (filters.busTypes.length > 0 && !filters.busTypes.includes(bus.busType)) {
        return false;
      }
      
      // AC filter
      if (filters.isAC !== null && bus.isAC !== filters.isAC) {
        return false;
      }
      
      // Price range filter
      if (bus.price < filters.priceRange[0] || bus.price > filters.priceRange[1]) {
        return false;
      }
      
      // Time slot filter
      if (filters.timeSlots.length > 0) {
        const timeCategory = getTimeCategory(bus.departureTime);
        const matchesTimeSlot = filters.timeSlots.some(slot => 
          slot.toLowerCase().includes(timeCategory.toLowerCase())
        );
        if (!matchesTimeSlot) return false;
      }
      
      return true;
    });

    // Sort buses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          const aDuration = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]);
          const bDuration = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]);
          return aDuration - bDuration;
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleBookNow = (bus: Bus) => {
    navigate(`/booking?busId=${bus.id}&from=${from}&to=${to}&date=${date}`);
  };

  const clearFilters = () => {
    setFilters({
      busTypes: [],
      timeSlots: [],
      priceRange: [400, 1000],
      isAC: null
    });
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="flex items-center space-x-6">
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="lg:text-right space-y-3">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{from}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{to}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {loading ? "Searching..." : `${filteredAndSortedBuses.length} buses found`}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                Modify Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BusFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="flex gap-2">
                  {[
                    { key: 'departure' as const, label: 'Departure', icon: Clock },
                    { key: 'price' as const, label: 'Price', icon: IndianRupee },
                    { key: 'duration' as const, label: 'Duration', icon: SortAsc },
                    { key: 'rating' as const, label: 'Rating', icon: Star }
                  ].map(({ key, label, icon: Icon }) => (
                    <Button
                      key={key}
                      variant={sortBy === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(key)}
                      className="text-xs"
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bus Results */}
            {loading ? (
              <LoadingSkeleton />
            ) : filteredAndSortedBuses.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSortedBuses.map((bus) => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No buses found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search for a different route.
                      </p>
                    </div>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusSearch;