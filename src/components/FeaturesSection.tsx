import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  CreditCard, 
  MapPin, 
  Smartphone, 
  Users,
  QrCode,
  Headphones
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "100% safe and secure payments with SSL encryption",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "24/7 Booking",
      description: "Book anytime, anywhere with our round-the-clock service",
      color: "text-primary"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay via UPI, cards, wallets, or net banking",
      color: "text-accent"
    },
    {
      icon: MapPin,
      title: "Live Bus Tracking",
      description: "Track your bus in real-time and get arrival updates",
      color: "text-warning"
    },
    {
      icon: Smartphone,
      title: "Digital Tickets",
      description: "No need for printouts - show your digital ticket",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Group Booking",
      description: "Special discounts for group bookings and family trips",
      color: "text-success"
    },
    {
      icon: QrCode,
      title: "QR Code Tickets",
      description: "Quick boarding with QR code scan verification",
      color: "text-accent"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get instant help from our customer support team",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Why Choose BusGo?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience hassle-free bus booking with our advanced features designed for your convenience and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-medium transition-all duration-300 group hover:-translate-y-2 bg-card border-border/50"
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;