import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Cross, Lightbulb, Sun, Moon, ChevronDown, Sword, AlertTriangle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks }: LandingPageProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference, otherwise default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode
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
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'px-6 pt-4' 
          : 'px-0 pt-0'
      }`}>
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl border border-stone-200/50 dark:border-amber-500/20 py-2 rounded-full mx-auto max-w-2xl' 
            : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm border-b border-stone-200/50 dark:border-slate-700/50 py-2 w-full'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`bg-amber-500 rounded-lg transition-all duration-300 ${
                  isScrolled ? 'p-1.5' : 'p-2'
                }`}>
                  <BookOpen className={`text-white transition-all duration-300 ${
                    isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                  }`} />
                </div>
                <div>
                  <h1 className={`font-bold text-stone-800 dark:text-white transition-all duration-300 ${
                    isScrolled ? 'text-base' : 'text-lg'
                  }`}>
                    ChristTask
                  </h1>
                </div>
              </div>
              
              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Navigation Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
                    className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-stone-200 dark:border-slate-600 rounded-lg shadow-sm hover:bg-stone-100 dark:hover:bg-slate-700 transition-all duration-300 ${
                      isScrolled ? 'p-1.5' : 'p-2'
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <div className={`bg-stone-600 dark:bg-stone-300 transition-all duration-300 ${
                        isScrolled ? 'w-3 h-0.5' : 'w-4 h-0.5'
                      }`}></div>
                      <div className={`bg-stone-600 dark:bg-stone-300 transition-all duration-300 ${
                        isScrolled ? 'w-3 h-0.5' : 'w-4 h-0.5'
                      }`}></div>
                    </div>
                  </button>
                  
                  {isNavDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-600 rounded-lg shadow-lg p-2 z-50">
                      <div className="flex flex-col space-y-1 min-w-[150px]">
                        <a href="#home" className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                          Home
                        </a>
                        <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                          How It Works
                        </a>
                        <a href="#pricing" className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                          Pricing
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={toggleDarkMode}
                  variant="outline"
                  size="sm"
                  className={`rounded-full border-stone-300 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300 ${
                    isScrolled ? 'w-5 h-5 p-0' : 'w-6 h-6 p-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className={`text-amber-500 transition-all duration-300 ${
                      isScrolled ? 'h-2 w-2' : 'h-2.5 w-2.5'
                    }`} />
                  ) : (
                    <Moon className={`text-slate-600 transition-all duration-300 ${
                      isScrolled ? 'h-2 w-2' : 'h-2.5 w-2.5'
                    }`} />
                  )}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className={`md:hidden transition-all duration-300 ${
                  isScrolled ? 'p-1.5' : 'p-2'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className={`text-stone-600 dark:text-stone-300 transition-all duration-300 ${
                  isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                }`} />
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-stone-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-b-lg">
                <nav className="flex flex-col space-y-3 pt-4">
                  <a href="#home" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition-colors text-sm font-medium">
                    Home
                  </a>
                  <a href="#how-it-works" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition-colors text-sm font-medium">
                    How It Works
                  </a>
                  <a href="#pricing" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition-colors text-sm font-medium">
                    Pricing
                  </a>
                  <div className="flex flex-col space-y-2 pt-2">
                    <div className="flex space-x-2">
                      <Button
                        onClick={toggleDarkMode}
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0 rounded-full border-stone-300 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-800"
                      >
                        {isDarkMode ? (
                          <Sun className="h-2.5 w-2.5 text-amber-500" />
                        ) : (
                          <Moon className="h-2.5 w-2.5 text-slate-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-stone-800 dark:text-white">
              Imagine If You Had the <span className="text-amber-500">Perfect Answer</span> in Every Debate…
            </span>
            <br />
            <span className="text-lg md:text-2xl text-stone-600 dark:text-stone-300 font-light mt-8 block">
              — Instantly.
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-stone-700 dark:text-stone-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            What if, the last time someone questioned your faith, you had replied with clarity, logic, and Scripture — without fear or hesitation?
          </p>

          <div className="flex justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-amber-500 hover:bg-blue-900 text-white text-lg px-8 py-4 font-bold rounded-full"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </div>

          {/* Scripture Quote */}
          <div className="inline-flex items-center bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-full px-8 py-4 mb-16 shadow-sm">
            <BookOpen className="h-5 w-5 text-amber-500 mr-3" />
            <span className="text-stone-700 dark:text-stone-300 font-medium italic">
              "The fear of the LORD is the beginning of wisdom" - Proverbs 9:10
            </span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 via-white to-stone-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-white mb-4">
              Here's The <span className="text-amber-500">Truth</span>
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              We won't sugarcoat reality, but we'll show you the difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Reality Card */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 rounded-2xl"></div>
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-red-200 dark:border-red-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-stone-800 dark:text-white ml-4">
                    The Reality
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      We're not here to promise you some fantasy of never being challenged again.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      You'll still face objections. The world won't stop debating.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700 dark:text-red-300 font-semibold italic">
                    "The struggles are real, and they're not going anywhere."
                  </p>
                </div>
              </div>
            </div>

            {/* Difference Card */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/20 dark:to-blue-500/20 rounded-2xl"></div>
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-emerald-200 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-3 rounded-xl shadow-lg">
                    <Cross className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-stone-800 dark:text-white ml-4">
                    The Difference
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      But with this app, you wouldn't be scrambling, doubting, or staying silent.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-bold">
                      You'd be standing firm — calmly defending the truth with confidence.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-emerald-700 dark:text-emerald-300 font-bold italic">
                    "Transform from uncertain to unshakeable."
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connecting Arrow */}
          <div className="flex justify-center mt-8">
            <div className="bg-amber-500 p-3 rounded-full shadow-lg animate-pulse">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-stone-800 dark:text-white">
            Your Learning Tools
          </h2>
          <p className="text-center text-stone-600 dark:text-stone-300 mb-12 text-lg">
            "Put on the full armor of God" - Ephesians 6:11
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Instant Answers</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Get immediate, scholarly responses to evolution, suffering, biblical questions, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Brain className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Deep Learning</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Practice with challenging questions to strengthen your apologetic skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Target className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Scripture Foundation</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Every answer is grounded in biblical truth and sound theology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Organized Topics</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Explore Creation, Morality, Christ's Divinity, Biblical Reliability, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Interactive Dialogue</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Ask follow-up questions and dive deeper into any topic
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-amber-500 transition-colors shadow-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-xl text-stone-800 dark:text-white">Always Current</CardTitle>
                <CardDescription className="text-stone-600 dark:text-stone-300">
                  Stay updated with the latest apologetic insights and responses
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* War of Ideas Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Dramatic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 dark:from-slate-900 dark:via-red-900/30 dark:to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 p-4 rounded-full shadow-2xl animate-pulse">
                  <Sword className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                It's Time to Stand <span className="text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">Bold</span> in the War of Ideas
              </h2>
            </div>

            {/* Opening Statement */}
            <div className="mb-12 p-6 bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-xl md:text-2xl text-stone-200 font-medium leading-relaxed">
                We wish truth would speak for itself… but that's <span className="text-red-400 font-bold">not how the world works</span> anymore.
              </p>
            </div>

            {/* Challenge Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm p-6 rounded-xl border border-red-500/30 hover:border-red-400 transition-all duration-300 hover:scale-105">
                <TrendingUp className="h-8 w-8 text-red-400 mb-4 mx-auto" />
                <p className="text-white font-semibold text-lg">From classrooms to TikTok comments</p>
                <p className="text-stone-300 text-sm mt-2">Faith is being challenged faster and louder than ever</p>
              </div>
              
              <div className="group bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                <Users className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
                <p className="text-white font-semibold text-lg">Atheists. Muslims. Skeptics.</p>
                <p className="text-stone-300 text-sm mt-2">Everyone's making their case — and most Christians are staying silent</p>
              </div>
              
              <div className="group bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mb-4 mx-auto" />
                <p className="text-white font-semibold text-lg">Culture wants to turn Christianity</p>
                <p className="text-stone-300 text-sm mt-2">Into something "safe"… watered-down, silent, and powerless</p>
              </div>
            </div>

            {/* The Stakes */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm p-8 rounded-2xl border-2 border-red-500/50 shadow-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  And if that happens?
                </h3>
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-stone-200 font-medium leading-relaxed">
                    The world wins the debate — <span className="text-red-400 font-bold">not because they're right,</span>
                  </p>
                  <p className="text-xl md:text-2xl text-stone-200 font-bold leading-relaxed">
                    but because believers didn't have the <span className="text-transparent bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text">words to fight back.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-white font-bold mb-8">
                But it doesn't have to be this way.
              </p>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white text-xl px-12 py-6 font-bold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
              >
                <Sword className="mr-3 h-6 w-6" />
                Arm Yourself with Truth
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <BookOpen className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-stone-800 dark:text-white">
            You now have access to something new:
          </h2>
          <p className="text-xl text-stone-700 dark:text-stone-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            An AI-trained apologetics tool that equips you to speak truth — instantly, with Scripture and logic — in any debate.
          </p>
          <p className="text-2xl font-bold text-amber-500 mb-8">
            The silence ends here.
          </p>
          
          <div className="bg-white dark:bg-slate-700 rounded-2xl p-8 max-w-md mx-auto mb-8 border border-stone-200 dark:border-slate-600 shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-stone-400 line-through mr-3">£34.99</span>
                <div className="text-4xl font-bold text-amber-500">£21.99</div>
              </div>
              <div className="text-stone-600 dark:text-stone-300 mb-4">per month</div>
              <div className="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Save £13 Monthly
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700 dark:text-stone-300">Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700 dark:text-stone-300">All topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700 dark:text-stone-300">24/7 access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm text-stone-700 dark:text-stone-300">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-amber-500 hover:bg-blue-900 text-white text-xl px-12 py-6 font-bold rounded-full"
          >
            <BookOpen className="mr-2 h-6 w-6" />
            Get Started
          </Button>
          
        </div>
      </section>
    </div>
  );
};
