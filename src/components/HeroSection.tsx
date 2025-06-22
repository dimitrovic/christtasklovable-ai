import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ArrowRight,
  Brain,
  Cross,
  Shield,
  BookOpen,
  Zap
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  variant?: 'landing' | 'app';
  className?: string;
}

export const HeroSection = ({ 
  onGetStarted, 
  onHowItWorks, 
  variant = "landing",
  className = ""
}: HeroSectionProps) => {
  const isLanding = variant === 'landing';

  return (
    <section className={`relative pt-20 pb-32 overflow-hidden ${className}`}>
      {/* Background Particles */}
      <div className="hero-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 ${
        isLanding 
          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-wave' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20'
      }`}></div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '6s' }}>
          <div className="w-14 h-14 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Cross className="w-7 h-7 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-6 animate-fade-in ${
            isLanding 
              ? 'bg-blue-500/20 text-blue-200 border-blue-400/30' 
              : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700/30'
          }`}>
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Christian Apologetics
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up ${
            isLanding ? 'text-white' : 'text-slate-900 dark:text-white'
          }`}>
            AI Christian
            <span className="block gradient-text">
              Apologetics
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in ${
            isLanding ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'
          }`}>
            Get biblical answers to tough questions with AI-powered Christian apologetics. 
            Defend your faith with confidence using Scripture-backed responses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
            <Button
              onClick={onGetStarted}
              size="lg"
              className={`px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover-lift animate-float ${
                isLanding 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Asking Questions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={onHowItWorks}
              variant="outline"
              size="lg"
              className={`px-8 py-4 text-lg hover-lift ${
                isLanding 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              How It Works
            </Button>
          </div>
        </div>
                  
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center animate-slide-in-left">
            <div className={`text-3xl font-bold mb-2 ${
              isLanding ? 'text-blue-300' : 'text-blue-600 dark:text-blue-400'
            }`}>
              15+
            </div>
            <div className={
              isLanding ? 'text-blue-200' : 'text-slate-600 dark:text-slate-400'
            }>
              Questions per day
            </div>
          </div>
          <div className="text-center animate-fade-in">
            <div className={`text-3xl font-bold mb-2 ${
              isLanding ? 'text-purple-300' : 'text-purple-600 dark:text-purple-400'
            }`}>
              100%
            </div>
            <div className={
              isLanding ? 'text-purple-200' : 'text-slate-600 dark:text-slate-400'
            }>
              Scripture-backed
            </div>
          </div>
          <div className="text-center animate-slide-in-right">
            <div className={`text-3xl font-bold mb-2 ${
              isLanding ? 'text-indigo-300' : 'text-indigo-600 dark:text-indigo-400'
            }`}>
              24/7
            </div>
            <div className={
              isLanding ? 'text-indigo-200' : 'text-slate-600 dark:text-slate-400'
            }>
              AI assistance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 