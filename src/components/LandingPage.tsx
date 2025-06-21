import { Header } from "./Header";
import { GameStats } from "./GameStats";
import { TopicCategories } from "./TopicCategories";
import { VerseReference } from "./VerseReference";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Target, Trophy, Users, ChevronRight, Star, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Brain, Heart, Zap, Crown, Sword } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  onAuthAction: (action: 'signin' | 'signup') => void;
  onLogoClick?: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks, onAuthAction, onLogoClick }: LandingPageProps) => {
  const handleTopicSelect = (topic: string) => {
    console.log('Topic selected:', topic);
  };

  const handleFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onAuthAction={onAuthAction} onHowItWorks={onHowItWorks} onFeatures={handleFeatures} onLogoClick={onLogoClick} />
      
      {/* Hero Section - New Design */}
      <section className="relative pt-20 pb-16 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3 shadow-sm">
                <Crown className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-lg font-semibold text-blue-800">Win Every Faith Debate</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Master Apologetics
                </span>
                <br />
                <span className="text-gray-900">
                  With Scripture
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  & Logic
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed max-w-2xl">
                Transform from uncertain to unshakeable. Defend your faith with confidence against any challenge.
              </p>
              
              <div className="flex items-center space-x-4 text-lg text-gray-600">
                <div className="flex items-center">
                  <Sword className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Biblical Foundation</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Logical Reasoning</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-6 pt-8">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="px-12 py-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  Try It Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                
                <Button
                  onClick={onHowItWorks}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
                >
                  See How It Works
                </Button>
              </div>

              {/* Social Proof */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Trusted by Christian apologists worldwide</p>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1,200+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Debates Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:order-last">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-gray-200">
                {/* Debate Scene Illustration */}
                <div className="aspect-[4/3] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Two people engaged in thoughtful discussion representing a faith debate"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Floating UI Elements */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-800">Scripture-Based</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-800">AI-Powered</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white rounded-lg px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">Debate Won!</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-40"></div>
              </div>
              
              {/* University-style Detail Badge */}
              <div className="absolute -bottom-6 left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">Academic Excellence</div>
                  <div className="text-sm text-gray-600">University-Level Training</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Truth Section - Modern Redesign */}
      <section className="py-32 px-6 bg-gradient-to-r from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-sm border-y border-slate-700/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Here's The Truth
            </h2>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto font-light">
              We won't sugarcoat reality — but we'll show you the transformative difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* The Reality */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-md rounded-3xl p-10 border border-red-500/30 shadow-2xl hover:shadow-red-500/25 transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl mr-6 shadow-lg">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">The Reality</h3>
                </div>
                
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>Challenges to your faith will keep coming.</p>
                  <p>Tough questions won't disappear.</p>
                  <p>The world won't stop debating.</p>
                  <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mt-8">
                    <p className="text-red-200 italic font-semibold text-xl">
                      "Without preparation, you'll remain silent when it matters most."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Difference */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-md rounded-3xl p-10 border border-emerald-500/30 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl mr-6 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">The Difference</h3>
                </div>
                
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>You'll stand firm with confidence.</p>
                  <p>Respond with wisdom and grace.</p>
                  <p>Defend truth with unshakeable conviction.</p>
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-6 mt-8">
                    <p className="text-emerald-200 italic font-semibold text-xl">
                      "Transform from uncertain to unstoppable."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              How ChristTask Works
            </h2>
            <p className="text-2xl text-slate-200 max-w-4xl mx-auto font-light">
              Transform your apologetics skills through intelligent, Scripture-based training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-12">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-full w-24 h-24 mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white mx-auto mt-4" />
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Choose Your Mode</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Select between AI Apologist for guidance or Muslim-Atheist Asks for challenging questions.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-12">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-full w-24 h-24 mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white mx-auto mt-4" />
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Engage & Learn</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Have real conversations with AI that adapts to your level and provides biblical insights.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-12">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-full w-24 h-24 mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-white mx-auto mt-4" />
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Grow Stronger</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Build confidence through practice and become equipped to defend your faith anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <GameStats score={1250} streak={7} level={3} />
        </div>
      </section>

      {/* AI Training Section */}
      <section id="features" className="py-32 px-6 bg-gradient-to-r from-slate-800/90 via-indigo-900/90 to-slate-800/90 backdrop-blur-sm border-y border-slate-700/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-12 leading-tight">
              World-Class AI Built to
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Sharpen Your Faith
              </span>
            </h2>
            <p className="text-3xl md:text-4xl text-amber-300 font-bold mb-12">
              From Silent to Spiritually Unshakeable
            </p>
            <p className="text-xl text-slate-200 max-w-5xl mx-auto mb-16 leading-relaxed">
              Advanced, Scripture-backed training for confident conversations with anyone, anytime.
            </p>
            
            <Button
              onClick={onGetStarted}
              className="px-12 py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-110 transition-all duration-300"
            >
              Begin Your Training
              <Sparkles className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Verse Reference Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <VerseReference />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Choose Your Plan
            </h2>
            <p className="text-2xl text-slate-200 max-w-4xl mx-auto font-light">
              Select the plan that works best for you
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Weekly Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-500/30 hover:shadow-blue-500/25 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="bg-blue-600/30 text-blue-300 text-sm font-bold px-4 py-2 rounded-full inline-block border border-blue-500/50 mb-6">
                    Perfect for Beginners
                  </div>
                  <div className="text-5xl font-black text-white mb-4">£4.50</div>
                  <div className="text-slate-300 text-xl mb-4">per week</div>
                  <div className="text-slate-400">Try it out risk-free</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Unlimited apologetic conversations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">All topic categories & modes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Scripture-based responses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Cancel anytime</span>
                  </div>
                </div>

                <Button
                  onClick={onGetStarted}
                  className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Start Weekly Plan
                </Button>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-orange-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-amber-500/30 hover:shadow-amber-500/25 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Best Value
                </div>
                
                <div className="text-center mb-8 mt-4">
                  <div className="bg-amber-600/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full inline-block border border-amber-500/50 mb-6">
                    Most Popular
                  </div>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="text-2xl font-bold text-slate-400 line-through">£19.50</span>
                    <div className="text-5xl font-black text-white">£13.99</div>
                  </div>
                  <div className="text-slate-300 text-xl mb-4">per month</div>
                  <div className="bg-amber-600/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full inline-block border border-amber-500/50">
                    Save £5.51 Monthly • Limited Time
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Unlimited apologetic conversations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">All topic categories & modes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Scripture-based responses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200">Cancel anytime</span>
                  </div>
                </div>

                <Button
                  onClick={onGetStarted}
                  className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Start Monthly Plan
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-12 text-lg">
            Secure payment • Cancel anytime • No sign-up required
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-12">
            Ready to Transform Your Faith Defense?
          </h2>
          <p className="text-2xl text-blue-100 mb-16 max-w-3xl mx-auto font-light">
            Join thousands of Christians building unshakeable confidence in their apologetics skills
          </p>
          <Button
            onClick={onGetStarted}
            className="px-12 py-6 rounded-2xl bg-white text-blue-600 hover:bg-amber-400 hover:text-white font-bold text-xl shadow-2xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            Begin Your Journey
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};
