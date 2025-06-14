
import { LandingPage } from "@/components/LandingPage";
import { PaymentPage } from "@/components/PaymentPage";
import { AuthPage } from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'payment' | 'auth'>('landing');
  const { user, loading } = useAuth();

  // Redirect authenticated users to landing page
  useEffect(() => {
    if (user && currentPage === 'auth') {
      setCurrentPage('landing');
    }
  }, [user, currentPage]);

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('payment');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleAuthAction = () => {
    setCurrentPage('auth');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  if (currentPage === 'auth') {
    return <AuthPage onBack={handleBackToLanding} />;
  }

  if (currentPage === 'payment') {
    return <PaymentPage onBack={handleBackToLanding} />;
  }

  return (
    <LandingPage 
      onGetStarted={handleGetStarted} 
      onHowItWorks={handleHowItWorks} 
      onAuthAction={handleAuthAction}
    />
  );
};

export default Index;
