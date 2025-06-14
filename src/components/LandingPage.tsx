import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Cross, Sun, Moon, Sword, AlertTriangle, TrendingUp, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks }: LandingPageProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors font-serif">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-200/50 dark:border-slate-700/50' 
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/30 dark:border-slate-700/30'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 rounded-lg p-2 shadow-sm">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white font-sans">
                ChristTask
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  Home
                </a>
                <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  Pricing
                </a>
              </nav>
              
              <Button
                onClick={toggleDarkMode}
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 rounded-full border-slate-300 dark:border-slate-600"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-600" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-slate-200 dark:border-slate-700">
              <nav className="flex flex-col space-y-4 pt-6">
                <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  Home
                </a>
                <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors font-medium">
                  Pricing
                </a>
                <Button
                  onClick={toggleDarkMode}
                  variant="outline"
                  size="sm"
                  className="w-9 h-9 p-0 rounded-full border-slate-300 dark:border-slate-600 self-start"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-slate-900 dark:text-white">
                Debate. Defend. <span className="text-amber-500">Disciple</span>.
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-slate-600 dark:text-slate-400 font-light mt-8 block relative">
                — Instantly.
                <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent opacity-0 animate-[draw-line_2s_ease-in-out_1s_forwards]"></span>
                <span className="absolute bottom-[-14px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500/80 rounded-full opacity-0 animate-[draw-dot_0.3s_ease-in-out_3s_forwards]"></span>
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                What if, the last time someone questioned your faith, you had replied with clarity, logic, and Scripture — without fear or hesitation?
              </p>
            </div>

            <div className="mb-16">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Get Started
              </Button>
            </div>

            {/* Scripture Quote */}
            <div className="inline-flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-8 py-4 shadow-sm">
              <BookOpen className="h-5 w-5 text-amber-500 mr-4 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium italic text-lg">
                "The fear of the LORD is the beginning of wisdom" — Proverbs 9:10
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>

      {/* Problem/Solution Section */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 mb-6">
              <Target className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">The Truth</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Here's The Reality
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
              We won't sugarcoat reality, but we'll show you the difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Reality Card */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-500 p-3 rounded-lg shadow-sm mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-white font-bold">
                    The Reality
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    We're not here to promise you some fantasy of never being challenged again.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    You'll still face objections. The world won't stop debating.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700 dark:text-red-300 font-medium italic">
                    "The struggles are real, and they're not going anywhere."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Difference Card */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-500 p-3 rounded-lg shadow-sm mr-4">
                    <Cross className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-white font-bold">
                    The Difference
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    But with this app, you wouldn't be scrambling, doubting, or staying silent.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    You'd be standing firm — calmly defending the truth with confidence.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium italic">
                    "Transform from uncertain to unshakeable."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">Your Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Learning Arsenal
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
              "Put on the full armor of God" — Ephesians 6:11
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <Shield className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Instant Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Get immediate, scholarly responses to evolution, suffering, biblical questions, and more
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <Brain className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Deep Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Practice with challenging questions to strengthen your apologetic skills
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <Target className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Scripture Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every answer is grounded in biblical truth and sound theology
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <Users className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Organized Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Explore Creation, Morality, Christ's Divinity, Biblical Reliability, and more
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <MessageSquare className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Interactive Dialogue</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ask follow-up questions and dive deeper into any topic
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
              <CardHeader className="pb-4">
                <Zap className="h-8 w-8 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-slate-900 dark:text-white font-semibold">Always Current</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Stay updated with the latest apologetic insights and responses
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
              Get clarity on everything you need to know
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <TabsTrigger value="general" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white font-medium">
                General
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white font-medium">
                Features
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white font-medium">
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">What is ChristTask?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    ChristTask is an AI-powered apologetics tool designed to help Christians confidently defend their faith. 
                    It provides instant, Scripture-based responses to challenging questions about Christianity, evolution, 
                    biblical reliability, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Is this tool biblically sound?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Absolutely. Every response is grounded in Scripture and orthodox Christian theology. Our AI is trained 
                    on trusted apologetic resources and biblical scholarship to ensure theological accuracy and faithfulness 
                    to God's Word.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Who can benefit from this?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    ChristTask is perfect for students facing challenges in school, parents answering their children's 
                    questions, pastors preparing sermons, and any believer who wants to be better equipped to defend 
                    their faith with confidence and love.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">What topics are covered?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We cover major apologetic topics including Creation vs Evolution, Biblical reliability, 
                    Jesus' divinity, the Trinity, moral arguments, the problem of suffering, historical evidence 
                    for Christianity, and responses to other worldviews.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">How does the AI work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our AI is specifically trained on apologetic literature, biblical commentaries, and theological 
                    resources. It can engage in interactive dialogue, provide follow-up answers, and adapt responses 
                    based on your specific needs and context.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Can I ask follow-up questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Yes! ChristTask supports interactive dialogue. You can ask clarifying questions, request more 
                    details, or explore related topics. The AI maintains context throughout your conversation for 
                    more meaningful discussions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">What's included in the subscription?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your subscription includes unlimited questions, access to all topic categories, 24/7 availability, 
                    interactive dialogue features, Scripture references, and regular updates with new apologetic 
                    insights and responses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Can I cancel anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Yes, you can cancel your subscription at any time with no penalties or fees. Your access will 
                    continue until the end of your current billing period, and you won't be charged for the following month.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We're currently offering our special launch price of £21.99/month (reduced from £34.99). 
                    This gives you full access to all features so you can experience the complete value of 
                    ChristTask from day one.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>

      {/* Final CTA */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              You now have access to something new
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed font-light">
              An AI-trained apologetics tool that equips you to speak truth — instantly, with Scripture and logic — in any debate.
            </p>
            <p className="text-2xl font-bold text-amber-500 mb-12">
              The silence ends here.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-auto mb-12 border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-slate-400 line-through mr-3">£34.99</span>
                <div className="text-4xl font-bold text-amber-500">£21.99</div>
              </div>
              <div className="text-slate-600 dark:text-slate-400 mb-6">per month</div>
              <div className="bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-6">
                Save £13 Monthly
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">All topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">24/7 access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-12 py-6 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
          >
            <BookOpen className="mr-3 h-6 w-6" />
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};
