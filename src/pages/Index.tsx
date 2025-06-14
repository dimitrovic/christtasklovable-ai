
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { TopicCategories } from "@/components/TopicCategories";
import { Header } from "@/components/Header";
import { VerseReference } from "@/components/VerseReference";

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Ask Your Apologetics Question</h2>
                <p className="text-blue-100">Get biblical answers to defend your faith with confidence</p>
              </div>
              <ChatInterface selectedTopic={selectedTopic} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TopicCategories onTopicSelect={setSelectedTopic} />
            <VerseReference />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-300">
            "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have." - 1 Peter 3:15
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
