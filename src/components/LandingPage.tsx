
import { Header } from "./Header";
import { GameStats } from "./GameStats";
import { TopicCategories } from "./TopicCategories";
import { VerseReference } from "./VerseReference";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Target, Trophy, Users, ChevronRight, Star, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Brain, Heart } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
  onAuthAction: (action: 'signin' | 'signup') => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks, onAuthAction }: LandingPageProps) => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header onAuthAction={onAuthAction} onHowItWorks={onHowItWorks} onFeatures={handleFeatures} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-amber-300/30 rounded-full px-8 py-4 mb-12 shadow-2xl">
              <Sparkles className="h-5 w-5 text-amber-400 mr-3 animate-pulse" />
              <span className="text-lg font-semibold text-amber-200">AI-Powered Apologetics Training</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Defend Your Faith
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-8 max-w-5xl mx-auto leading-relaxed">
              Master apologetics through intelligent AI conversations
            </p>
            
            <p className="text-xl text-slate-300 mb-16 max-w-4xl mx-auto">
              From silent uncertainty to unshakeable conviction — equipped with Scripture, sharpened by logic, ready for every challenge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={onGetStarted}
                className="px-12 py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-110 transition-all duration-300 border-0"
              >
                Start Training Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                onClick={onHowItWorks}
                variant="outline"
                className="px-8 py-6 rounded-2xl bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg backdrop-blur-sm transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-blue-500/25 hover:bg-white/15 transition-all duration-500 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Intelligent Conversations</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Engage with advanced AI that adapts to your responses and challenges you at the perfect level.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-purple-500/25 hover:bg-white/15 transition-all duration-500 hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Scripture-Based</h3>
              <p className="text-purple-100 leading-relaxed text-lg">
                Every response grounded in biblical truth with verses and theological insights to strengthen your foundation.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-amber-500/25 hover:bg-white/15 transition-all duration-500 hover:scale-105">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Personalized Training</h3>
              <p className="text-amber-100 leading-relaxed text-lg">
                Track your progress and receive customized challenges that help you grow stronger in your faith defense.
              </p>
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
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Get Started Today
            </h2>
            <p className="text-2xl text-slate-200 max-w-4xl mx-auto font-light">
              Join ChristTask and transform how you defend your faith
            </p>
          </div>

          {/* Pricing Card */}
          <div className="relative group max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-orange-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-amber-500/30 hover:shadow-amber-500/25 transition-all duration-300">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-slate-400 line-through">£34.99</span>
                  <div className="text-6xl font-black text-white">£21.99</div>
                </div>
                <div className="text-slate-300 text-xl mb-6">per month</div>
                <div className="bg-amber-600/30 text-amber-300 text-lg font-bold px-6 py-3 rounded-full inline-block border border-amber-500/50">
                  Save £13 Monthly • Limited Time
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Unlimited apologetic conversations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">All topic categories & modes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Scripture-based responses</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Progress tracking & analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Cancel anytime</span>
                </div>
              </div>

              <Button
                onClick={onGetStarted}
                className="w-full px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Start Your Subscription
              </Button>

              <p className="text-center text-slate-400 mt-6 text-lg">
                Secure payment • Cancel anytime
              </p>
            </div>
          </div>
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
