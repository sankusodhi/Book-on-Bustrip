import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OffersSection from "@/components/OffersSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <OffersSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
