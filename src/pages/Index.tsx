import { LandingPage } from "@/components/LandingPage";
import { PaymentPage } from "@/components/PaymentPage";
import { AuthPage } from "@/components/AuthPage";
import { ChatInterface } from "@/components/ChatInterface";
import { TopicCategories } from "@/components/TopicCategories";
import { GuestAccountPrompt } from "@/components/GuestAccountPrompt";
import { WelcomeToChatbot } from "@/components/WelcomeToChatbot";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useGuestAuth } from "@/hooks/useGuestAuth";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'payment' | 'auth' | 'app'>('landing');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showTopics, setShowTopics] = useState(true);
  const [forceShowLanding, setForceShowLanding] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paidUser, setPaidUser] = useState(false); // Track if user just paid
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'chatbot' | 'profile'>('home');
  const { user, loading, signOut } = useAuth();
  const { isGuest, guestUser, handleGuestSuccess, showAccountPrompt } = useGuestAuth();
  const { toast } = useToast();

  // Handle payment success from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const isGuestCheckout = urlParams.get('guest') === 'true';
    const sessionId = urlParams.get('session_id');

    if (success === 'true') {
      setIsProcessingPayment(true);
      setPaidUser(true); // Mark user as having just paid
      
      if (isGuestCheckout && sessionId) {
        // Handle guest checkout success - go directly to chatbot
        handleGuestSuccess(sessionId).then(() => {
          setIsProcessingPayment(false);
          setCurrentPage('app');
          setShowTopics(false); // Skip topics, go directly to chat
          toast({
            title: "Payment successful!",
            description: "Welcome to ChristTask! You now have full access to the chatbot.",
          });
        }).catch((error) => {
          setIsProcessingPayment(false);
          console.error('Guest success handling failed:', error);
          toast({
            title: "Payment processed, but access failed",
            description: "Your payment was successful, but we couldn't set up your account. Please contact support.",
            variant: "destructive"
          });
        });
      } else if (user) {
        // Handle authenticated user payment success - go directly to chatbot
        setIsProcessingPayment(false);
        setCurrentPage('app');
        setShowTopics(false); // Skip topics, go directly to chat
        toast({
          title: "Payment successful!",
          description: "Welcome to ChristTask! You now have full access to the chatbot.",
        });
      } else {
        // Payment success but no user - this shouldn't happen but handle gracefully
        setIsProcessingPayment(false);
        toast({
          title: "Payment successful",
          description: "Please sign in to access your subscription.",
        });
        setCurrentPage('auth');
      }
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handleGuestSuccess, user, toast]);

  // Redirect authenticated users to app
  useEffect(() => {
    if ((user || (isGuest && guestUser)) && currentPage === 'auth' && !isProcessingPayment) {
      setCurrentPage('app');
      // If user just paid, skip topics and go to chat
      if (paidUser) {
        setShowTopics(false);
      }
    } else if ((user || (isGuest && guestUser)) && currentPage === 'landing' && !forceShowLanding && !isProcessingPayment) {
      setCurrentPage('app');
      // If user just paid, skip topics and go to chat
      if (paidUser) {
        setShowTopics(false);
      }
    }
  }, [user, guestUser, isGuest, currentPage, forceShowLanding, isProcessingPayment, paidUser]);

  // Debug: Force show app for logged in users
  useEffect(() => {
    if ((user || (isGuest && guestUser)) && currentPage === 'landing') {
      setCurrentPage('app');
    }
  }, [user, guestUser, isGuest, currentPage]);

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
    setPaidUser(false); // Reset paid user status when going back to landing
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
    setPaidUser(false); // Reset paid user status on sign out
  };

  // TEST: Show navigation for any logged-in user
  if (user || (isGuest && guestUser)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-20">
        {/* Debug Info */}
        <div className="bg-red-100 p-2 text-center text-sm font-bold">
          TEST: Navigation should be visible below! currentPage={currentPage}, user={user?.email || 'guest'}
        </div>
        
        {/* App Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CT</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">ChristTask</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user?.email || guestUser?.email}</span>
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Navigation Test
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You should see the bottom navigation bar below!
            </p>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  if (loading || isProcessingPayment) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <div className="text-slate-600 dark:text-slate-400">
            {isProcessingPayment ? 'Setting up your account...' : 'Loading...'}
          </div>
        </div>
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
    
    // Show WelcomeToChatbot after payment, until user clicks the button
    if (paidUser && !showChatbot) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
          <WelcomeToChatbot onStartChat={() => {
            setShowChatbot(true);
            setActiveTab('chatbot');
          }} />
        </div>
      );
    }

    // For existing paid users, show the main app with navigation immediately
    // Main app with bottom navigation
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-20">
        {/* Debug Info - Remove this later */}
        <div className="bg-yellow-100 p-2 text-center text-sm">
          Debug: currentPage={currentPage}, activeTab={activeTab}, user={user?.email || 'none'}
        </div>
        
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

        {/* Main Content based on activeTab */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'home' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to ChristTask
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Choose a topic to start your apologetics journey
                </p>
                <Button
                  onClick={() => setActiveTab('chatbot')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Direct Chat
                </Button>
              </div>
              <TopicCategories onTopicSelect={handleTopicSelect} />
            </div>
          )}
          {activeTab === 'chatbot' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('home')}
                >
                  ← Back to Home
                </Button>
              </div>
              <ChatInterface selectedTopic={selectedTopic} />
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Profile & Settings
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Manage your account and personal settings here.
                </p>
                {/* You can add more profile/settings UI here */}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Guest Account Prompt */}
        {showAccountPrompt && isGuest && <GuestAccountPrompt />}
      </div>
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
