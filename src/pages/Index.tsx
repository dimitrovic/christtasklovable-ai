
import { LandingPage } from "@/components/LandingPage";
import { PaymentPage } from "@/components/PaymentPage";
import { AuthPage } from "@/components/AuthPage";
import { ChatInterface } from "@/components/ChatInterface";
import { TopicCategories } from "@/components/TopicCategories";
import { GuestAccountPrompt } from "@/components/GuestAccountPrompt";
import { useAuth } from "@/hooks/useAuth";
import { useGuestAuth } from "@/hooks/useGuestAuth";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'payment' | 'auth' | 'app'>('landing');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showTopics, setShowTopics] = useState(true);
  const [forceShowLanding, setForceShowLanding] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { isGuest, guestUser, handleGuestSuccess, showAccountPrompt } = useGuestAuth();

  // Handle guest success from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const isGuestCheckout = urlParams.get('guest') === 'true';
    const sessionId = urlParams.get('session_id');

    if (success === 'true' && isGuestCheckout && sessionId) {
      handleGuestSuccess(sessionId);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handleGuestSuccess]);

  // Redirect authenticated users to app (but only if not forced to show landing)
  useEffect(() => {
    if ((user || (isGuest && guestUser)) && currentPage === 'auth') {
      setCurrentPage('app');
    } else if ((user || (isGuest && guestUser)) && currentPage === 'landing' && !forceShowLanding) {
      setCurrentPage('app');
    }
  }, [user, guestUser, isGuest, currentPage, forceShowLanding]);

  const handleGetStarted = () => {
    setForceShowLanding(false);
    if (user || (isGuest && guestUser)) {
      setCurrentPage('app');
    } else {
      setCurrentPage('payment');
    }
    window.scrollTo(0, 0);
  };

  const handleAuthAction = (action: 'signin' | 'signup') => {
    setAuthMode(action);
    setCurrentPage('auth');
    window.scrollTo(0, 0);
  };

  const handleHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setForceShowLanding(true);
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setCurrentPage('landing');
    setForceShowLanding(true);
    setShowTopics(true);
    setSelectedTopic(null);
    window.scrollTo(0, 0);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setShowTopics(false);
  };

  const handleBackToTopics = () => {
    setShowTopics(true);
    setSelectedTopic(null);
  };

  const handleSignOut = async () => {
    if (isGuest) {
      // Clear guest data
      localStorage.removeItem('guest_user_data');
      localStorage.removeItem('last_account_prompt');
      window.location.reload();
    } else {
      await signOut();
    }
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
    return <AuthPage onBack={handleBackToLanding} initialMode={authMode} />;
  }

  if (currentPage === 'payment') {
    return <PaymentPage onBack={handleBackToLanding} />;
  }

  if (currentPage === 'app' && (user || (isGuest && guestUser)) && !forceShowLanding) {
    const currentUser = user || guestUser;
    
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          {/* App Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={handleLogoClick}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CT</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">ChristTask</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{currentUser?.email}</span>
                    {isGuest && (
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                        Guest
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* App Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showTopics ? (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to ChristTask
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Choose a topic to start your apologetics journey
                  </p>
                  <Button
                    onClick={() => setShowTopics(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Direct Chat
                  </Button>
                </div>
                <TopicCategories onTopicSelect={handleTopicSelect} />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBackToTopics}
                  >
                    ← Back to Topics
                  </Button>
                </div>
                <ChatInterface selectedTopic={selectedTopic} />
              </div>
            )}
          </div>
        </div>

        {/* Guest Account Prompt */}
        {showAccountPrompt && isGuest && <GuestAccountPrompt />}
      </>
    );
  }

  return (
    <LandingPage 
      onGetStarted={handleGetStarted} 
      onHowItWorks={handleHowItWorks} 
      onAuthAction={handleAuthAction}
      onLogoClick={handleLogoClick}
    />
  );
};

export default Index;
