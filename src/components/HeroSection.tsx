import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Search, ArrowRight, Gift, Star } from "lucide-react";

const HeroSection = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-foreground rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-soft rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-foreground rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-accent-soft/20 backdrop-blur-sm rounded-full px-4 py-2 border border-accent-soft/30">
              <Gift className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                Get ₹100 on your first booking!
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              India's <span className="text-accent-foreground">Trusted</span>
              <br />
              Bus Booking Platform
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Book bus tickets online with ease. Compare prices, choose your seat, and travel comfortably across India.
            </p>
          </div>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto shadow-strong animate-slide-up">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="from-city" className="text-sm font-medium">
                    From
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="from-city"
                      placeholder="Departure city"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-city" className="text-sm font-medium">
                    To
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="to-city"
                      placeholder="Destination city"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travel-date" className="text-sm font-medium">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="travel-date"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full" 
                  variant="hero"
                  onClick={() => {
                    if (fromCity && toCity && travelDate) {
                      window.location.href = `/search?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${travelDate}`;
                    }
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Buses
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-primary-foreground">
              Popular Routes
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Delhi → Mumbai",
                "Bangalore → Chennai",
                "Pune → Goa",
                "Kolkata → Bhubaneswar",
                "Hyderabad → Vijayawada",
                "Jaipur → Udaipur"
              ].map((route) => (
                <button
                  key={route}
                  className="inline-flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 border border-primary-foreground/20 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300"
                >
                  <span>{route}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm font-medium">4.8/5 Rating</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <span className="text-sm font-medium">10M+ Happy Customers</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <span className="text-sm font-medium">500+ Cities Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;