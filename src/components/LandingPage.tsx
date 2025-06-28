// @ts-nocheck - Temporary disable for missing dependencies
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ChristianBackground } from "@/components/ChristianBackground";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { OrganicWaveDivider } from "@/components/OrganicWaveDivider";
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
  Cross,
  ExternalLink,
  Heart,
  Globe,
  Book,
  Video,
  Mic
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
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/payment');
  };

  return (
    <ChristianBackground>
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={onLogoClick}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center animate-glow">
                <Cross className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ChristTask</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <button onClick={() => navigate('/')} className="text-white hover:text-blue-300 font-medium transition">Home</button>
              <button onClick={() => navigate('/payment')} className="text-white hover:text-blue-300 font-medium transition">Chat with AI</button>
              <button onClick={() => navigate('/payment')} className="text-white hover:text-blue-300 font-medium transition">Pricing</button>
              <button onClick={() => onAuthAction('signin')} className="text-white hover:text-blue-300 font-medium transition">Sign In</button>
              <button onClick={() => onAuthAction('signup')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded font-semibold transition">Get Started</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-wave"></div>
        
        {/* Floating crosses for hero section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-floating-cross">✝</div>
          <div className="hero-floating-cross">✝</div>
          <div className="hero-floating-cross">✝</div>
          <div className="hero-floating-cross">✝</div>
          <div className="hero-floating-cross">✝</div>
          <div className="hero-floating-cross">✝</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-6 animate-fade-in">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Christian Apologetics
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              <TypewriterEffect 
                phrases={[
                  'never claimed he was God',
                  'is just a prophet',
                  'is only human'
                ]}
                speed={30}
                deleteSpeed={15}
                pauseTime={1500}
                className="justify-center"
                jesusClassName="text-black font-bold"
                typewriterClassName="text-white"
              />
            </h1>
              
            <p className="text-lg md:text-xl text-gray-300 font-bold tracking-wide mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Never lose a debate again. Speak with unshakable confidence, dismantle objections, and prove your point.
            </p>
              
            <div className="flex justify-center items-center mb-12 animate-fade-in-up">
              <Button
                onClick={handleStartJourney}
                size="lg"
                className="bg-white text-black rounded-full px-10 py-4 font-bold text-lg shadow-lg transition hover:bg-gray-100 hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Win Every Debate — Start Now
                <ArrowRight className="w-5 h-5 ml-2" />
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

      {/* Organic Wave Divider - Hero */}
      <OrganicWaveDivider variant="horizontal" />

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose ChristTask?
            </h2>
            <div className="subtitle-bubble">
              <p className="text-xl text-blue-900 font-medium text-center">
                Get instant, biblical answers to challenging questions about Christianity, 
                atheism, Islam, and more.
              </p>
            </div>
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

      {/* Organic Wave Divider - Two Dips */}
      <OrganicWaveDivider variant="horizontal" />

      {/* Testimonials Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Join thousands of Christians who have strengthened their faith with ChristTask
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="testimonial-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-slide-in-left">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-blue-500 text-white">SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Sarah Mitchell</h4>
                    <p className="text-blue-200 text-sm">Youth Pastor</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-200 italic">
                  "ChristTask has been invaluable for my youth group. The AI provides thoughtful, 
                  Scripture-based answers that help our teens defend their faith with confidence."
                </p>
              </CardContent>
            </Card>

            <Card className="testimonial-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-purple-500 text-white">MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Michael Johnson</h4>
                    <p className="text-blue-200 text-sm">College Student</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-200 italic">
                  "As a college student, I face challenging questions about my faith daily. 
                  ChristTask gives me the tools and confidence to engage in meaningful discussions."
                </p>
              </CardContent>
            </Card>

            <Card className="testimonial-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-slide-in-right">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-indigo-500 text-white">DL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">David Lee</h4>
                    <p className="text-blue-200 text-sm">Small Group Leader</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-200 italic">
                  "The depth of knowledge and biblical accuracy is impressive. 
                  It's like having a theology professor available 24/7 for our small group discussions."
            </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider variant="horizontal" />

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
            onClick={handleStartJourney}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover-lift animate-fade-in-up"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Your Apologetics Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Cross className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">ChristTask</h3>
              </div>
              <p className="text-blue-200 mb-4 max-w-md">
                Empowering Christians with AI-powered apologetics. Defend your faith with confidence 
                using Scripture-backed responses to challenging questions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={onHowItWorks} 
                          className="resource-link text-blue-200 hover:text-white flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => onAuthAction('signin')} 
                          className="resource-link text-blue-200 hover:text-white flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => onAuthAction('signup')} 
                          className="resource-link text-blue-200 hover:text-white flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Get Started
                  </button>
                </li>
                <li>
                  <a href="#contact" 
                     className="resource-link text-blue-200 hover:text-white flex items-center">
                    <Mic className="w-4 h-4 mr-2" />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-blue-200">
            © 2024 ChristTask. Empowering Christians with AI-powered apologetics.
              Made with <Heart className="w-4 h-4 inline text-red-400" /> for the Kingdom.
          </p>
          </div>
        </div>
      </footer>
    </ChristianBackground>
  );
};
