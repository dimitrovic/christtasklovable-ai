
import { LandingPage } from "@/components/LandingPage";
import { PaymentPage } from "@/components/PaymentPage";
import { useState } from "react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'payment'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('payment');
  };

  const handleHowItWorks = () => {
    // Scroll to how it works section or handle as needed
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'payment') {
    return <PaymentPage onBack={handleBackToLanding} />;
  }

  return (
    <LandingPage 
      onGetStarted={handleGetStarted} 
      onHowItWorks={handleHowItWorks} 
    />
  );
};

export default Index;
