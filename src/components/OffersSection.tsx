import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, Coins, Clock, ArrowRight } from "lucide-react";

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: "First Booking Bonus",
      description: "Get ₹100 cashback on your first bus booking",
      code: "FIRST100",
      icon: Gift,
      bgColor: "bg-gradient-to-br from-accent/20 to-accent/10",
      borderColor: "border-accent/30",
      textColor: "text-accent-foreground",
      points: 100,
      minBooking: 500,
      validity: "Valid till 31st Dec"
    },
    {
      id: 2,
      title: "Refer & Earn",
      description: "Invite friends and earn ₹50 for each successful referral",
      code: "REFER50",
      icon: Users,
      bgColor: "bg-gradient-to-br from-primary/20 to-primary/10",
      borderColor: "border-primary/30",
      textColor: "text-primary-foreground",
      points: 50,
      minBooking: 300,
      validity: "No expiry"
    },
    {
      id: 3,
      title: "Loyalty Points",
      description: "Earn 2 points per ₹100 spent. Redeem after 100 points",
      code: "LOYALTY",
      icon: Coins,
      bgColor: "bg-gradient-to-br from-success/20 to-success/10",
      borderColor: "border-success/30",
      textColor: "text-success-foreground",
      points: 2,
      minBooking: 100,
      validity: "Points expire in 1 year"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-soft/50 rounded-full px-4 py-2">
            <Gift className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Limited Time Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Exclusive Deals & Rewards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save more on every journey with our carefully curated offers and loyalty rewards program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <Card
                key={offer.id}
                className={`relative overflow-hidden border-2 ${offer.borderColor} ${offer.bgColor} hover:shadow-medium transition-all duration-300 group hover:scale-105`}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary shadow-soft`}>
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {offer.code}
                    </Badge>
                  </div>
                  <CardTitle className={`text-xl font-bold ${offer.textColor}`}>
                    {offer.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground/80 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reward</span>
                      <span className="font-semibold text-foreground">₹{offer.points}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Min. Booking</span>
                      <span className="font-semibold text-foreground">₹{offer.minBooking}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{offer.validity}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:shadow-medium transition-all duration-300" 
                    variant="outline"
                  >
                    Claim Offer
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent opacity-10 rounded-full blur-lg"></div>
              </Card>
            );
          })}
        </div>

        {/* Terms & Conditions */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            * Offers are subject to terms and conditions. Cashback will be credited to your BusGo wallet within 24-48 hours. 
            Minimum booking amount may vary. Points can be redeemed only after reaching the minimum threshold. 
            Referral rewards are credited when the referred user completes their first successful booking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;