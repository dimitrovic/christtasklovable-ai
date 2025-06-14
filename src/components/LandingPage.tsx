import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Sun, Moon, Cross, HelpCircle, GraduationCap, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  onAuthAction: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks, onAuthAction }: LandingPageProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      const maxScroll = 200; // Distance to complete the transformation
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
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

  // Calculate dynamic styles based on scroll progress
  const headerPadding = {
    horizontal: 6 * scrollProgress,
    vertical: 6 * scrollProgress
  };
  
  const containerStyles = {
    borderRadius: `${scrollProgress * 9999}px`, // Gradually becomes fully rounded
    padding: `${12 - (4 * scrollProgress)}px ${24}px`, // Shrinks padding
    maxWidth: scrollProgress > 0.5 ? '28rem' : '100%', // Becomes constrained after 50% scroll
    opacity: 0.95 + (0.05 * scrollProgress) // Slightly more opaque
  };

  const logoSize = 20 - (4 * scrollProgress); // Logo shrinks from 20px to 16px
  const titleSize = scrollProgress > 0.5 ? 'text-base' : `text-xl`; // Title size changes
  const navItemSize = scrollProgress > 0.5 ? 'text-xs' : 'text-sm'; // Nav items shrink

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <Header onAuthAction={onAuthAction} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-32 px-6">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="space-y-12">
            {/* Main Headline */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                <span className="text-slate-900 dark:text-slate-100 block">
                  Debate. Defend.
                </span>
                <span className="text-slate-900 dark:text-slate-100 block">
                  <span className="text-slate-600 dark:text-slate-400">Disciple</span><span className="text-slate-900 dark:text-slate-100">.</span>
                </span>
              </h1>
              
              {/* New Tagline - Updated to gold */}
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl lg:text-4xl text-amber-500 font-light leading-tight">
                  — Imagine If You Had the Perfect Answer in Every Debate…
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                An AI built to defend the faith — delivering fast, clear answers grounded in Scripture and logic.
                The silence ends now. The truth speaks.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-slate-900 hover:bg-amber-500 dark:bg-slate-100 dark:hover:bg-amber-500 text-slate-50 hover:text-slate-900 dark:text-slate-900 dark:hover:text-slate-900 text-lg px-12 py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Get Started
              </Button>
            </div>

            {/* Scripture Quote */}
            <div className="pt-8">
              <div className="inline-flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-8 py-5 shadow-sm">
                <BookOpen className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-4 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium italic text-lg">
                  "The fear of the LORD is the beginning of wisdom" — Proverbs 9:10
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      </div>

      {/* Problem/Solution Section */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2.5 border border-slate-200 dark:border-slate-700">
              <Target className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">The Reality</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Here's The Truth
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We won't sugarcoat reality, but we'll show you the transformative difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Reality Card */}
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="pb-8 pt-8 px-8">
                <div className="flex items-center mb-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800/30 mr-5">
                    <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-slate-100 font-bold">
                    The Reality
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-8">
                <div className="space-y-6">
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
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500">
                  <p className="text-red-700 dark:text-red-300 font-medium italic text-lg">
                    "The struggles are real, and they're not going anywhere."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Difference Card */}
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="pb-8 pt-8 px-8">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30 mr-5">
                    <Cross className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-slate-100 font-bold">
                    The Difference
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-8">
                <div className="space-y-6">
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
                </div>
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium italic text-lg">
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
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      </div>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2.5 border border-slate-200 dark:border-slate-700">
              <GraduationCap className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Arsenal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Learning Tools
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              "Put on the full armor of God" — Ephesians 6:11
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <Shield className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Instant Answers</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Get immediate, scholarly responses to evolution, suffering, biblical questions, and more
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <Brain className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Deep Learning</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Practice with challenging questions to strengthen your apologetic skills
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <Target className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Scripture Foundation</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Every answer is grounded in biblical truth and sound theology
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Organized Topics</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Explore Creation, Morality, Christ's Divinity, Biblical Reliability, and more
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <MessageSquare className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Interactive Dialogue</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Ask follow-up questions and dive deeper into any topic
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl overflow-hidden group">
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="bg-slate-50 dark:bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                  <Award className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100 font-bold leading-tight">Always Current</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Stay updated with the latest apologetic insights and responses
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      </div>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2.5 border border-slate-200 dark:border-slate-700">
              <HelpCircle className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Support</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Get clarity on everything you need to know
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-16 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl p-1">
              <TabsTrigger value="general" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm font-medium rounded-lg">
                General
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm font-medium rounded-lg">
                Features
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm font-medium rounded-lg">
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">What is ChristTask?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    ChristTask is an AI-powered apologetics tool designed to help Christians confidently defend their faith. 
                    It provides instant, Scripture-based responses to challenging questions about Christianity, evolution, 
                    biblical reliability, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">Is this tool biblically sound?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Absolutely. Every response is grounded in Scripture and orthodox Christian theology. Our AI is trained 
                    on trusted apologetic resources and biblical scholarship to ensure theological accuracy and faithfulness 
                    to God's Word.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">Who can benefit from this?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    ChristTask is perfect for students facing challenges in school, parents answering their children's 
                    questions, pastors preparing sermons, and any believer who wants to be better equipped to defend 
                    their faith with confidence and love.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">What topics are covered?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    We cover major apologetic topics including Creation vs Evolution, Biblical reliability, 
                    Jesus' divinity, the Trinity, moral arguments, the problem of suffering, historical evidence 
                    for Christianity, and responses to other worldviews.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">How does the AI work?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Our AI is specifically trained on apologetic literature, biblical commentaries, and theological 
                    resources. It can engage in interactive dialogue, provide follow-up answers, and adapt responses 
                    based on your specific needs and context.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">Can I ask follow-up questions?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Yes! ChristTask supports interactive dialogue. You can ask clarifying questions, request more 
                    details, or explore related topics. The AI maintains context throughout your conversation for 
                    more meaningful discussions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">What's included in the subscription?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Your subscription includes unlimited questions, access to all topic categories, 24/7 availability, 
                    interactive dialogue features, Scripture references, and regular updates with new apologetic 
                    insights and responses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">Can I cancel anytime?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    Yes, you can cancel your subscription at any time with no penalties or fees. Your access will 
                    continue until the end of your current billing period, and you won't be charged for the following month.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 pt-8 px-8">
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
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
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      </div>

      {/* Final CTA */}
      <section id="pricing" className="py-32 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2.5 border border-slate-200 dark:border-slate-700">
                <BookOpen className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Get Started</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                You now have access to something new
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                An AI-trained apologetics tool that equips you to speak truth — instantly, with Scripture and logic — in any debate.
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                The silence ends here.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 max-w-md mx-auto my-16 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl font-bold text-slate-400 line-through">£34.99</span>
                <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">£21.99</div>
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-lg">per month</div>
              <div className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold px-5 py-2.5 rounded-full inline-block border border-slate-200 dark:border-slate-600">
                Save £13 Monthly
              </div>
              <ul className="text-left space-y-4 pt-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-base">Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-base">All topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-base">24/7 access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-base">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-slate-900 hover:bg-amber-500 dark:bg-slate-100 dark:hover:bg-amber-500 text-slate-50 hover:text-slate-900 dark:text-slate-900 dark:hover:text-slate-900 text-xl px-16 py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <BookOpen className="mr-3 h-6 w-6" />
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};
