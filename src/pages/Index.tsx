
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
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
      <footer className="mt-20 py-12 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-300 text-lg italic leading-relaxed max-w-3xl mx-auto">
            "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have." - 1 Peter 3:15
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
