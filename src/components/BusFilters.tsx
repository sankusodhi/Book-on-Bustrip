import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterState {
  busTypes: string[];
  timeSlots: string[];
  priceRange: [number, number];
  isAC: boolean | null;
}

interface BusFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const BusFilters = ({ filters, onFiltersChange, onClearFilters }: BusFiltersProps) => {
  const busTypes = ['Sleeper', 'Seater', 'Semi-Sleeper'];
  const timeSlots = ['Morning (5AM - 12PM)', 'Afternoon (12PM - 5PM)', 'Evening (5PM - 9PM)', 'Night (9PM - 5AM)'];

  const handleBusTypeChange = (busType: string, checked: boolean) => {
    const newBusTypes = checked 
      ? [...filters.busTypes, busType]
      : filters.busTypes.filter(type => type !== busType);
    
    onFiltersChange({ ...filters, busTypes: newBusTypes });
  };

  const handleTimeSlotChange = (timeSlot: string, checked: boolean) => {
    const newTimeSlots = checked 
      ? [...filters.timeSlots, timeSlot]
      : filters.timeSlots.filter(slot => slot !== timeSlot);
    
    onFiltersChange({ ...filters, timeSlots: newTimeSlots });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({ ...filters, priceRange: [values[0], values[1]] });
  };

  const handleACChange = (value: string) => {
    const isAC = value === 'ac' ? true : value === 'non-ac' ? false : null;
    onFiltersChange({ ...filters, isAC });
  };

  const hasActiveFilters = 
    filters.busTypes.length > 0 || 
    filters.timeSlots.length > 0 || 
    filters.isAC !== null ||
    filters.priceRange[0] > 400 || 
    filters.priceRange[1] < 1000;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bus Types */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Bus Type</h4>
          <div className="space-y-2">
            {busTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.busTypes.includes(type)}
                  onCheckedChange={(checked) => handleBusTypeChange(type, checked as boolean)}
                />
                <label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* AC/Non-AC */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Air Conditioning</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ac"
                checked={filters.isAC === true}
                onCheckedChange={(checked) => handleACChange(checked ? 'ac' : 'any')}
              />
              <label htmlFor="ac" className="text-sm text-muted-foreground cursor-pointer">
                AC
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="non-ac"
                checked={filters.isAC === false}
                onCheckedChange={(checked) => handleACChange(checked ? 'non-ac' : 'any')}
              />
              <label htmlFor="non-ac" className="text-sm text-muted-foreground cursor-pointer">
                Non-AC
              </label>
            </div>
          </div>
        </div>

        {/* Departure Time */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Departure Time</h4>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <div key={slot} className="flex items-center space-x-2">
                <Checkbox
                  id={slot}
                  checked={filters.timeSlots.includes(slot)}
                  onCheckedChange={(checked) => handleTimeSlotChange(slot, checked as boolean)}
                />
                <label htmlFor={slot} className="text-sm text-muted-foreground cursor-pointer">
                  {slot}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={1000}
              min={400}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Active Filters</h4>
            <div className="flex flex-wrap gap-1">
              {filters.busTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
              {filters.timeSlots.map((slot) => (
                <Badge key={slot} variant="secondary" className="text-xs">
                  {slot.split(' ')[0]}
                </Badge>
              ))}
              {filters.isAC === true && (
                <Badge variant="secondary" className="text-xs">AC</Badge>
              )}
              {filters.isAC === false && (
                <Badge variant="secondary" className="text-xs">Non-AC</Badge>
              )}
              {(filters.priceRange[0] > 400 || filters.priceRange[1] < 1000) && (
                <Badge variant="secondary" className="text-xs">
                  ₹{filters.priceRange[0]}-₹{filters.priceRange[1]}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusFilters;