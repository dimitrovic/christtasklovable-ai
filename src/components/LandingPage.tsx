import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target, Menu, Cross, Lightbulb, Sun, Moon, ChevronDown } from "lucide-react";
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
              className="bg-amber-500 hover:bg-blue-500 text-white text-lg px-8 py-4 font-bold rounded-full"
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
      <section id="how-it-works" className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-stone-50 dark:bg-slate-700 p-8 rounded-2xl border border-stone-200 dark:border-slate-600">
              <h2 className="text-3xl font-bold text-stone-800 dark:text-white mb-6 flex items-center">
                <Shield className="mr-3 h-8 w-8 text-amber-500" />
                Facing Challenges?
              </h2>
              <div className="space-y-4 text-stone-700 dark:text-stone-300">
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
            <div className="bg-stone-50 dark:bg-slate-700 p-8 rounded-2xl border border-stone-200 dark:border-slate-600">
              <h2 className="text-3xl font-bold text-stone-800 dark:text-white mb-6 flex items-center">
                <Cross className="mr-3 h-8 w-8 text-amber-500" />
                Stand Firm in Truth
              </h2>
              <div className="space-y-4 text-stone-700 dark:text-stone-300">
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

      {/* Testimonial */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Cross className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-stone-800 dark:text-white">Growing in Faith</h2>
          <blockquote className="text-xl text-stone-700 dark:text-stone-300 mb-8 max-w-3xl mx-auto italic leading-relaxed">
            "I was once afraid to engage skeptics about my faith. Now I confidently share God's truth. 
            This tool has transformed my understanding and witness."
          </blockquote>
          <cite className="text-amber-600 font-semibold">- Sarah M., Youth Pastor</cite>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <BookOpen className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-stone-800 dark:text-white">
            Ready to Grow in Faith?
          </h2>
          <p className="text-xl text-stone-700 dark:text-stone-300 mb-8 max-w-2xl mx-auto">
            Start your journey today and gain the knowledge to confidently defend the Gospel.
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
            className="bg-amber-500 hover:bg-blue-500 text-white text-xl px-12 py-6 font-bold rounded-full"
          >
            <BookOpen className="mr-2 h-6 w-6" />
            Get Started
          </Button>
          
        </div>
      </section>
    </div>
  );
};
