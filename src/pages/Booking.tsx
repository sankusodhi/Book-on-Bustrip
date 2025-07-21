import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { mockBuses, Bus } from "@/data/mockBuses";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  CreditCard,
  Shield,
  Gift,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  User
} from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const busId = searchParams.get("busId");
  const from = searchParams.get("from") || "Dantewada";
  const to = searchParams.get("to") || "Raipur";
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0];
  
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    age: "",
    gender: "male",
    phone: "",
    email: ""
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const bus = mockBuses.find(b => b.id === busId);

  useEffect(() => {
    if (!bus) {
      navigate('/');
    }
  }, [bus, navigate]);

  if (!bus) return null;

  // Mock seat layout (40 seats - 2+2 configuration)
  const seatLayout = Array.from({ length: 40 }, (_, i) => ({
    id: `S${i + 1}`,
    number: i + 1,
    isAvailable: Math.random() > 0.3, // 70% seats available
    isSelected: false,
    row: Math.floor(i / 4) + 1,
    position: ['A', 'B', 'C', 'D'][i % 4]
  }));

  const handleSeatSelect = (seatId: string) => {
    const seat = seatLayout.find(s => s.id === seatId);
    if (seat?.isAvailable) {
      setSelectedSeat(seatId);
    }
  };

  const calculateTotal = () => {
    let total = bus.price;
    if (selectedOffer === 'first-booking') {
      total -= 100;
    } else if (selectedOffer === 'cashback') {
      total = total * 0.95; // 5% cashback
    }
    return Math.max(total, 0);
  };

  const handleBooking = () => {
    if (!selectedSeat || !passengerDetails.name || !passengerDetails.phone || !acceptedTerms) {
      alert("Please fill all required details and accept terms & conditions");
      return;
    }
    
    // Simulate payment processing
    navigate(`/booking-success?busId=${busId}&seat=${selectedSeat}&from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Complete Your Booking</h1>
            <p className="text-muted-foreground">{from} → {to} • {date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bus Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>Selected Bus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{bus.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{bus.departureTime} - {bus.arrivalTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{bus.pickup}</span>
                      </div>
                    </div>
                    <Badge variant={bus.isAC ? "default" : "secondary"}>
                      {bus.seatType}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{bus.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{bus.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seat Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your Seat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-success rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-muted border rounded"></div>
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                    {seatLayout.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={!seat.isAvailable}
                        className={`
                          w-10 h-10 rounded text-xs font-medium transition-all
                          ${!seat.isAvailable 
                            ? 'bg-muted border cursor-not-allowed' 
                            : selectedSeat === seat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-success text-success-foreground hover:bg-success/80'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeat && (
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm">
                        <strong>Selected Seat:</strong> {selectedSeat}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            <Card>
              <CardHeader>
                <CardTitle>Passenger Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        value={passengerDetails.name}
                        onChange={(e) => setPassengerDetails({...passengerDetails, name: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={passengerDetails.age}
                      onChange={(e) => setPassengerDetails({...passengerDetails, age: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={passengerDetails.gender}
                    onValueChange={(value) => setPassengerDetails({...passengerDetails, gender: value})}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <label htmlFor="female">Female</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <label htmlFor="other">Other</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+91 XXXXXXXXXX"
                        value={passengerDetails.phone}
                        onChange={(e) => setPassengerDetails({...passengerDetails, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={passengerDetails.email}
                        onChange={(e) => setPassengerDetails({...passengerDetails, email: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="space-y-6">
            {/* Available Offers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-accent-foreground" />
                  <span>Available Offers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedOffer === 'first-booking' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedOffer(selectedOffer === 'first-booking' ? null : 'first-booking')}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={selectedOffer === 'first-booking'} disabled />
                    <div>
                      <p className="font-medium text-sm">First Booking</p>
                      <p className="text-xs text-muted-foreground">Get ₹100 off</p>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedOffer === 'cashback' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedOffer(selectedOffer === 'cashback' ? null : 'cashback')}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={selectedOffer === 'cashback'} disabled />
                    <div>
                      <p className="font-medium text-sm">Cashback Offer</p>
                      <p className="text-xs text-muted-foreground">5% cashback</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Fare</span>
                    <span>₹{bus.price}</span>
                  </div>
                  {selectedOffer === 'first-booking' && (
                    <div className="flex justify-between text-sm text-success">
                      <span>First Booking Discount</span>
                      <span>-₹100</span>
                    </div>
                  )}
                  {selectedOffer === 'cashback' && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Cashback (5%)</span>
                      <span>-₹{Math.round(bus.price * 0.05)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      id="terms"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I accept the terms & conditions
                    </label>
                  </div>
                  
                  <Button
                    onClick={handleBooking}
                    disabled={!selectedSeat || !passengerDetails.name || !passengerDetails.phone || !acceptedTerms}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>100% Secure Payment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;