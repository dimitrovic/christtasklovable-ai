import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Shield, 
  BookOpen, 
  Users, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Star,
  Brain,
  Cross
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  onAuthAction: (action: 'signin' | 'signup') => void;
  onLogoClick: () => void;
}

export const LandingPage = ({ 
  onGetStarted, 
  onHowItWorks, 
  onAuthAction, 
  onLogoClick 
}: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={onLogoClick}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Cross className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ChristTask</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onAuthAction('signin')}
                className="text-white hover:bg-white/10"
              >
                Sign In
              </Button>
              <Button
                onClick={() => onAuthAction('signup')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-6 animate-fade-in">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Christian Apologetics
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              AI Christian
              <span className="block gradient-text">
                Apologetics
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Get biblical answers to tough questions with AI-powered Christian apologetics. 
              Defend your faith with confidence using Scripture-backed responses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover-lift"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Asking Questions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={onHowItWorks}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg hover-lift"
              >
                How It Works
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-slide-in-left">
              <div className="text-3xl font-bold text-blue-300 mb-2">15+</div>
              <div className="text-blue-200">Questions per day</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold text-purple-300 mb-2">100%</div>
              <div className="text-purple-200">Scripture-backed</div>
            </div>
            <div className="text-center animate-slide-in-right">
              <div className="text-3xl font-bold text-indigo-300 mb-2">24/7</div>
              <div className="text-indigo-200">AI assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose ChristTask?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Get instant, biblical answers to challenging questions about Christianity, 
              atheism, Islam, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover-lift animate-slide-in-left">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Biblical Defense</h3>
                <p className="text-blue-200">
                  Get Scripture-backed responses to defend your faith against common objections and challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover-lift animate-fade-in-up">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Answers</h3>
                <p className="text-blue-200">
                  AI-powered responses in seconds, helping you engage in meaningful conversations about faith.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover-lift animate-slide-in-right">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Deep Knowledge</h3>
                <p className="text-blue-200">
                  Access comprehensive apologetics knowledge covering theology, philosophy, and biblical studies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Defend Your Faith?
          </h2>
          <p className="text-xl text-blue-200 mb-8 animate-fade-in">
            Join thousands of Christians who are equipped with biblical answers to tough questions.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover-lift animate-fade-in-up"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Your Apologetics Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200">
            © 2024 ChristTask. Empowering Christians with AI-powered apologetics.
          </p>
        </div>
      </footer>
    </div>
  );
};
