import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Star, 
  Wifi, 
  Zap, 
  Coffee, 
  Droplets,
  ChevronDown,
  ChevronUp,
  Users
} from "lucide-react";
import { Bus } from "@/data/mockBuses";

interface BusCardProps {
  bus: Bus;
  onBookNow: (bus: Bus) => void;
}

const BusCard = ({ bus, onBookNow }: BusCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="h-4 w-4" />;
      case 'Charging Point': return <Zap className="h-4 w-4" />;
      case 'Snacks': return <Coffee className="h-4 w-4" />;
      case 'Water Bottle': return <Droplets className="h-4 w-4" />;
      default: return null;
    }
  };

  const urgencyColor = bus.seatsAvailable <= 3 ? 'text-destructive' : 
                      bus.seatsAvailable <= 10 ? 'text-warning' : 'text-success';

  return (
    <Card className="hover:shadow-strong transition-all duration-300 border-border/60">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Bus Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{bus.name}</h3>
                <p className="text-sm text-muted-foreground">{bus.operator}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{bus.rating}</span>
              </div>
            </div>

            {/* Time & Duration */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{bus.departureTime}</p>
                <p className="text-xs text-muted-foreground">Departure</p>
              </div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{bus.duration}</span>
                </div>
                <div className="w-full h-px bg-border mt-1"></div>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{bus.arrivalTime}</p>
                <p className="text-xs text-muted-foreground">Arrival</p>
              </div>
            </div>

            {/* Pickup & Drop */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{bus.pickup}</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{bus.drop}</span>
              </div>
            </div>

            {/* Seat Type & Availability */}
            <div className="flex items-center space-x-4">
              <Badge variant={bus.isAC ? "default" : "secondary"}>
                {bus.seatType}
              </Badge>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className={`text-sm font-medium ${urgencyColor}`}>
                  {bus.seatsAvailable} seats left
                </span>
              </div>
            </div>
          </div>

          {/* Price & Book */}
          <div className="lg:text-right space-y-3">
            <div>
              <p className="text-2xl font-bold text-foreground">₹{bus.price}</p>
              <p className="text-sm text-muted-foreground">per seat</p>
            </div>
            <Button 
              onClick={() => onBookNow(bus)}
              variant="hero"
              size="lg"
              className="w-full lg:w-auto"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Expandable Details */}
        <div className="mt-4 border-t border-border pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Bus Details & Amenities</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showDetails && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {bus.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-1 bg-muted rounded-full px-3 py-1">
                    {getAmenityIcon(amenity)}
                    <span className="text-xs text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{bus.busType}</span> • 
                <span className="ml-1">{bus.totalSeats} total seats</span>
              </div>
            </div>
          )}
        </div>

        {/* Urgency Message */}
        {bus.seatsAvailable <= 5 && (
          <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive font-medium">
              🔥 Only {bus.seatsAvailable} seats left! Book fast to avoid disappointment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusCard;