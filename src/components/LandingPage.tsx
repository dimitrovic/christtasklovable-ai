
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Cross, Lightbulb } from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks }: LandingPageProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md shadow-sm border-b border-stone-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-stone-800">
                  ChristTask
                </h1>
              </div>
            </div>
            
            {/* Navigation - Center (Desktop) */}
            <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
              <a href="#home" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                Home
              </a>
              <a href="#how-it-works" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                Pricing
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-stone-600" />
            </button>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <Button onClick={onGetStarted} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 text-sm rounded-full">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-stone-200/50 bg-white/90 backdrop-blur-sm rounded-b-lg">
              <nav className="flex flex-col space-y-3 pt-4">
                <a href="#home" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                  Home
                </a>
                <a href="#how-it-works" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button onClick={onGetStarted} className="bg-amber-500 hover:bg-amber-600 text-white font-bold w-full rounded-full">
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <Cross className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-stone-800">
              Defend Your Faith
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-stone-600 font-light">
              with Divine Wisdom
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-600 mb-4 max-w-4xl mx-auto leading-relaxed font-semibold">
            "Always be ready to give a defense for the hope within you."
          </p>

          <p className="text-lg md:text-xl text-stone-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Equipped with Scripture-based wisdom and scholarly apologetics, face every challenge to your faith with 
            <span className="font-semibold text-amber-600"> divine confidence</span>. From evolution debates to biblical contradictions — 
            truth prevails through knowledge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-4 font-bold rounded-full"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onHowItWorks}
              className="text-lg px-8 py-4 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-full"
            >
              <Lightbulb className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>

          {/* Scripture Quote */}
          <div className="inline-flex items-center bg-white border border-stone-200 rounded-full px-8 py-4 mb-16 shadow-sm">
            <BookOpen className="h-5 w-5 text-amber-500 mr-3" />
            <span className="text-stone-700 font-medium italic">
              "The fear of the LORD is the beginning of wisdom" - Proverbs 9:10
            </span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center">
                <Shield className="mr-3 h-8 w-8 text-amber-500" />
                Facing Challenges?
              </h2>
              <div className="space-y-4 text-stone-700">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Skeptics challenge your faith and you feel unprepared</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You know God's truth but lack the knowledge to defend it</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You want to grow stronger in your apologetic understanding</p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center">
                <Cross className="mr-3 h-8 w-8 text-amber-500" />
                Stand Firm in Truth
              </h2>
              <div className="space-y-4 text-stone-700">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>Receive instant, Scripture-backed responses to any challenge</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>Access Christian apologetics and biblical scholarship</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>Build confidence in defending your faith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-stone-800">
            Your Learning Tools
          </h2>
          <p className="text-center text-stone-600 mb-12 text-lg">
            "Put on the full armor of God" - Ephesians 6:11
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Instant Answers</CardTitle>
                <CardDescription className="text-stone-600">
                  Get immediate, scholarly responses to evolution, suffering, biblical questions, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Brain className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Deep Learning</CardTitle>
                <CardDescription className="text-stone-600">
                  Practice with challenging questions to strengthen your apologetic skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Target className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Scripture Foundation</CardTitle>
                <CardDescription className="text-stone-600">
                  Every answer is grounded in biblical truth and sound theology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Organized Topics</CardTitle>
                <CardDescription className="text-stone-600">
                  Explore Creation, Morality, Christ's Divinity, Biblical Reliability, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Interactive Dialogue</CardTitle>
                <CardDescription className="text-stone-600">
                  Ask follow-up questions and dive deeper into any topic
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-stone-200 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800">Always Current</CardTitle>
                <CardDescription className="text-stone-600">
                  Stay updated with the latest apologetic insights and responses
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Cross className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-stone-800">Growing in Faith</h2>
          <blockquote className="text-xl text-stone-700 mb-8 max-w-3xl mx-auto italic leading-relaxed">
            "I was once afraid to engage skeptics about my faith. Now I confidently share God's truth. 
            This tool has transformed my understanding and witness."
          </blockquote>
          <cite className="text-amber-600 font-semibold">- Sarah M., Youth Pastor</cite>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <BookOpen className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-stone-800">
            Ready to Grow in Faith?
          </h2>
          <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto">
            Start your journey today and gain the knowledge to confidently defend the Gospel.
          </p>
          
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto mb-8 border border-stone-200 shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-stone-400 line-through mr-3">£34.99</span>
                <div className="text-4xl font-bold text-amber-500">£21.99</div>
              </div>
              <div className="text-stone-600 mb-4">per month</div>
              <div className="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Save £13 Monthly
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700">Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700">All topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700">24/7 access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-12 py-6 font-bold rounded-full"
          >
            <Cross className="mr-2 h-6 w-6" />
            Get Started
          </Button>
          
          <p className="text-sm text-stone-500 mt-4">7-day free trial • No commitment required</p>
        </div>
      </section>
    </div>
  );
};
