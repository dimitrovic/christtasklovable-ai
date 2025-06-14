
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Cross, Sword, Lightbulb } from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks }: LandingPageProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-sm shadow-2xl border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-3 rounded-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-transparent"></div>
                <BookOpen className="h-8 w-8 text-slate-900 relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  ChristTask
                </h1>
                <p className="text-slate-400 text-xs tracking-wider">TRUTH MEETS TECHNOLOGY</p>
              </div>
            </div>
            
            {/* Navigation - Center (Desktop) */}
            <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
              <a href="#home" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide">
                Home
              </a>
              <a href="#how-it-works" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide">
                How It Works
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide">
                Pricing
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-slate-300" />
            </button>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-bold shadow-xl">
                Begin Your Journey
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
              <nav className="flex flex-col space-y-3 pt-4">
                <a href="#home" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium">
                  Home
                </a>
                <a href="#how-it-works" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button onClick={onGetStarted} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-bold w-full">
                    Begin Your Journey
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Divine Light Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-b from-amber-400 to-transparent"></div>
          
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Cross className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <div className="absolute inset-0 animate-pulse">
                <Cross className="h-16 w-16 text-amber-300/50 mx-auto" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Defend Your Faith
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-slate-200 font-light">
              with Divine Wisdom
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-200 mb-4 max-w-4xl mx-auto leading-relaxed font-semibold">
            "Always be ready to give a defense for the hope within you."
          </p>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Equipped with Scripture-based wisdom and scholarly apologetics, face every challenge to your faith with 
            <span className="font-semibold text-amber-400"> divine confidence</span>. From evolution debates to biblical contradictions — 
            truth prevails through knowledge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 text-lg px-8 py-4 font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Sword className="mr-2 h-5 w-5" />
              Arm Yourself with Truth
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onHowItWorks}
              className="text-lg px-8 py-4 border-amber-400 text-amber-400 hover:bg-amber-400/10 hover:border-amber-300"
            >
              <Lightbulb className="mr-2 h-5 w-5" />
              See Divine Wisdom
            </Button>
          </div>

          {/* Scripture Quote */}
          <div className="inline-flex items-center bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-full px-8 py-4 mb-16 backdrop-blur-sm">
            <BookOpen className="h-5 w-5 text-amber-400 mr-3" />
            <span className="text-amber-200 font-medium italic">
              "The fear of the LORD is the beginning of wisdom" - Proverbs 9:10
            </span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 p-8 rounded-2xl border border-red-500/20">
              <h2 className="text-3xl font-bold text-red-300 mb-6 flex items-center">
                <Shield className="mr-3 h-8 w-8" />
                Under Spiritual Attack?
              </h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Skeptics challenge your faith with "science disproves God" and you feel defenseless</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You know God's truth but lack the scholarly armor to defend it</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You retreat from spiritual battles feeling unprepared and defeated</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 p-8 rounded-2xl border border-amber-500/20">
              <h2 className="text-3xl font-bold text-amber-300 mb-6 flex items-center">
                <Sword className="mr-3 h-8 w-8" />
                Stand Firm in Truth
              </h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p>Receive instant, Scripture-backed responses to any challenge</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p>Access millennia of Christian apologetics and biblical scholarship</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p>Build unshakeable confidence in God's eternal truth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            Your Spiritual Arsenal
          </h2>
          <p className="text-center text-slate-400 mb-12 text-lg">
            "Put on the full armor of God" - Ephesians 6:11
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <Shield className="h-12 w-12 text-amber-400 mb-4" />
                <CardTitle className="text-xl text-amber-300">Shield of Faith</CardTitle>
                <CardDescription className="text-slate-400">
                  Instant, scholarly responses to evolution, suffering, biblical contradictions, and every assault on truth
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <Brain className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-xl text-amber-300">Wisdom Training</CardTitle>
                <CardDescription className="text-slate-400">
                  Practice with AI opponents using real atheist and skeptic arguments to sharpen your apologetic skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <Target className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-amber-300">Scripture Arsenal</CardTitle>
                <CardDescription className="text-slate-400">
                  Access perfectly matched Bible verses and theological explanations for every spiritual battle
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <Users className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle className="text-xl text-amber-300">Divine Categories</CardTitle>
                <CardDescription className="text-slate-400">
                  Organized by sacred topics: Creation, Morality, Christ's Divinity, Biblical Reliability, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-amber-400 mb-4" />
                <CardTitle className="text-xl text-amber-300">Holy Dialogue</CardTitle>
                <CardDescription className="text-slate-400">
                  Ask follow-up questions and receive deeper understanding until truth becomes crystal clear
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-xl text-amber-300">Living Wisdom</CardTitle>
                <CardDescription className="text-slate-400">
                  Stay current with the latest apologetic discoveries and responses to emerging challenges
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof */}
      <section className="py-16 bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <Cross className="h-12 w-12 text-amber-300 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-amber-100">Join the Army of Truth</h2>
          <blockquote className="text-xl text-amber-200 mb-8 max-w-3xl mx-auto italic leading-relaxed">
            "I was once afraid to engage skeptics about my faith. Now I eagerly share God's truth with confidence. 
            This divine tool has transformed my witness completely."
          </blockquote>
          <cite className="text-amber-300 font-semibold">- Sarah M., Youth Pastor</cite>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Sword className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-200">
            Ready to Stand Firm in Faith?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the faithful today and receive divine wisdom to defend the Gospel with scholarly authority and spiritual power.
          </p>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-8 border border-amber-500/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-slate-500 line-through mr-3">£34.99</span>
                <div className="text-4xl font-bold text-amber-400">£21.99</div>
              </div>
              <div className="text-slate-400 mb-4">per month</div>
              <div className="bg-amber-900/30 text-amber-300 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4 border border-amber-500/30">
                Divine Discount - Save £13
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-400 mr-2" />
                  <span className="text-sm text-slate-300">Unlimited spiritual warfare</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-400 mr-2" />
                  <span className="text-sm text-slate-300">All apologetic topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-400 mr-2" />
                  <span className="text-sm text-slate-300">24/7 divine wisdom</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-400 mr-2" />
                  <span className="text-sm text-slate-300">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 text-xl px-12 py-6 font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Cross className="mr-2 h-6 w-6" />
            Begin Your Sacred Journey
          </Button>
          
          <p className="text-sm text-slate-500 mt-4">7-day divine trial • No earthly commitments required</p>
        </div>
      </section>
    </div>
  );
};
