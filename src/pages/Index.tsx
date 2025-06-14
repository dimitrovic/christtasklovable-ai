
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { TopicCategories } from "@/components/TopicCategories";
import { Header } from "@/components/Header";
import { VerseReference } from "@/components/VerseReference";
import { LandingPage } from "@/components/LandingPage";

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleHowItWorks = () => {
    // Scroll to features section or show how it works modal
    // For now, just scroll down on the landing page
    const featuresSection = document.querySelector('section:nth-of-type(3)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} onHowItWorks={handleHowItWorks} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/3 to-yellow-500/3 rounded-full blur-3xl"></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-4 py-12 pt-24 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="xl:col-span-3">
            <ChatInterface selectedTopic={selectedTopic} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <TopicCategories onTopicSelect={setSelectedTopic} />
            <VerseReference />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-t border-amber-500/20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-200 text-lg italic leading-relaxed max-w-3xl mx-auto">
            "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have." - 1 Peter 3:15
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
