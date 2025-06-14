import { Header } from "./Header";
import { GameStats } from "./GameStats";
import { TopicCategories } from "./TopicCategories";
import { VerseReference } from "./VerseReference";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Target, Trophy, Users, ChevronRight, Star, CheckCircle } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  onAuthAction: (action: 'signin' | 'signup') => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks, onAuthAction }: LandingPageProps) => {
  const handleTopicSelect = (topic: string) => {
    console.log('Topic selected:', topic);
    // For now, just log the topic selection
    // This could be expanded to navigate to a specific topic page
  };

  const handleFeatures = () => {
    // Scroll to features section
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onAuthAction={onAuthAction} onHowItWorks={onHowItWorks} onFeatures={handleFeatures} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-amber-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200/50 dark:border-amber-500/30 rounded-full px-6 py-3 mb-8 shadow-lg">
              <Star className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Defend Your Faith with Confidence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-8 leading-tight">
              <span className="text-white">
                Debate. Defend. Disciple.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white font-light mb-12 max-w-4xl mx-auto leading-relaxed">
              An apologetics AI that equips you with the words — backed by Scripture, sharpened by logic, ready for every challenge.
              <br className="hidden md:block" />
              <span className="text-lg md:text-xl">This is where silence becomes strength.</span>
            </p>

            <div className="flex items-center justify-center">
              <Button
                onClick={onGetStarted}
                className="px-8 py-4 rounded-2xl bg-white text-slate-800 hover:bg-amber-400 hover:text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Interactive Scenarios</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice real conversations with AI that challenges your understanding and helps you grow stronger in your apologetics skills.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Biblical Foundations</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Learn from Scripture-based responses and discover how to articulate your faith with biblical wisdom and theological depth.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Track Progress</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor your growth with detailed analytics and unlock achievements as you master different apologetics topics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How ChristTask Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI-powered platform provides personalized training to strengthen your apologetics skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full w-20 h-20 mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Choose Your Challenge</h3>
              <p className="text-slate-300 leading-relaxed">
                Select from various apologetics topics and difficulty levels to match your current understanding and goals.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-full w-20 h-20 mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Engage with AI</h3>
              <p className="text-slate-300 leading-relaxed">
                Practice defending your faith in realistic conversations with our intelligent AI that adapts to your responses.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-full w-20 h-20 mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Learn & Grow</h3>
              <p className="text-slate-300 leading-relaxed">
                Receive personalized feedback, biblical insights, and track your progress as you become more confident in your faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <GameStats score={1250} streak={7} level={3} />
        </div>
      </section>

      {/* Features Section - rename Topics section to Features */}
      <section id="features" className="py-20 px-6 bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Master Key Topics
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Explore the most important areas of Christian apologetics and build your confidence
            </p>
          </div>
          <TopicCategories onTopicSelect={handleTopicSelect} />
        </div>
      </section>

      {/* Verse Reference Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <VerseReference />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Strengthen Your Faith?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of Christians who are growing stronger in their apologetics skills with ChristTask
          </p>
          <Button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-white text-blue-600 hover:bg-amber-400 hover:text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};
