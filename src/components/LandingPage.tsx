import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Shield, Zap, CheckCircle, Users, Brain, Target } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export const LandingPage = ({ onGetStarted, onHowItWorks }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-3 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  FaithDefender AI
                </h1>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={onHowItWorks}>
                How It Works
              </Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight">
            Win Every Faith Debate
            <br />
            <span className="text-4xl md:text-5xl">With Biblical Confidence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Never be caught off-guard again. Get instant, Scripture-backed responses to the toughest questions about Christianity. 
            Whether it's evolution, suffering, or Biblical contradictions - <span className="font-semibold text-indigo-700">you'll always have the perfect answer.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Winning Debates Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onHowItWorks}
              className="text-lg px-8 py-4"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>

          {/* Pricing Badge with Discount */}
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full px-6 py-3 mb-16">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              <span className="line-through text-slate-500 mr-2">£34.99</span>
              Only £21.99/month - Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Tired of Being Stumped in Faith Conversations?
              </h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Someone challenges your faith with "science disproves God" and you freeze up</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You know the Bible is true but can't articulate why to skeptics</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You walk away from debates feeling defeated and unprepared</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Now You Can Respond With Authority
              </h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Get instant, well-researched responses to any faith challenge</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Access thousands of Scripture-backed arguments and evidences</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Build unshakeable confidence in defending your faith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
            Everything You Need to Defend Your Faith
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-xl">Instant Apologetics</CardTitle>
                <CardDescription>
                  Get immediate, scholarly responses to evolution, the problem of evil, Biblical contradictions, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Smart Debate Mode</CardTitle>
                <CardDescription>
                  Practice with AI opponents who challenge you with real atheist and skeptic arguments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Scripture Arsenal</CardTitle>
                <CardDescription>
                  Access perfectly matched Bible verses and theological explanations for any situation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Topic Categories</CardTitle>
                <CardDescription>
                  Organized by common debate topics: Creation, Morality, Jesus, Bible Reliability, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-pink-50">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle className="text-xl">Real-Time Chat</CardTitle>
                <CardDescription>
                  Ask follow-up questions and get clarifications until you fully understand every argument
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-teal-50">
              <CardHeader>
                <Zap className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle className="text-xl">Always Updated</CardTitle>
                <CardDescription>
                  Stay current with the latest apologetic arguments and responses to new challenges
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Thousands of Confident Christians</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            "I used to avoid conversations about faith because I didn't know what to say. Now I look forward to them. 
            This app has completely transformed my confidence in sharing the Gospel."
          </p>
          <p className="text-indigo-200">- Sarah M., Youth Pastor</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-800">
            Ready to Never Lose Another Faith Debate?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join today and get instant access to the most comprehensive Christian apologetics AI assistant ever created.
          </p>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-slate-400 line-through mr-3">£34.99</span>
                <div className="text-4xl font-bold text-slate-800">£21.99</div>
              </div>
              <div className="text-slate-600 mb-4">per month</div>
              <div className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Save £13/month
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Unlimited questions & debates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">All apologetic topics covered</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">24/7 instant responses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-xl px-12 py-6"
          >
            Start Your Free Trial Now
          </Button>
          
          <p className="text-sm text-slate-500 mt-4">7-day free trial • No credit card required</p>
        </div>
      </section>
    </div>
  );
};
