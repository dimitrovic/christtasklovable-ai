
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, CheckCircle, ArrowLeft, Star, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface PaymentPageProps {
  onBack: () => void;
}

export const PaymentPage = ({ onBack }: PaymentPageProps) => {
  const { user } = useAuth();
  const { 
    subscribed, 
    subscriptionTier, 
    subscriptionEnd, 
    loading, 
    createCheckout, 
    openCustomerPortal,
    checkSubscription 
  } = useSubscription();
  
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly'>('monthly');

  const handleSubscribe = async (plan: 'weekly' | 'monthly') => {
    await createCheckout(plan);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-blue-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-amber-600/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 py-6 px-6 border-b border-amber-500/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-3 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-transparent"></div>
                <BookOpen className="h-6 w-6 text-slate-900 relative z-10" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                ChristTask
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={checkSubscription}
                variant="ghost"
                size="sm"
                disabled={loading}
                className="text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-300"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={onBack}
                variant="ghost"
                className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Payment Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Current Subscription Status */}
          {user && (
            <div className="mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Subscription Status
                      </h3>
                      {loading ? (
                        <p className="text-white/70">Checking subscription...</p>
                      ) : subscribed ? (
                        <div className="space-y-1">
                          <p className="text-emerald-300 font-medium">
                            ✓ Active Subscription ({subscriptionTier})
                          </p>
                          {subscriptionEnd && (
                            <p className="text-white/70 text-sm">
                              Renews on {formatDate(subscriptionEnd)}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-amber-300">No active subscription</p>
                      )}
                    </div>
                    {subscribed && (
                      <Button
                        onClick={openCustomerPortal}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Manage Subscription
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full px-6 py-3 mb-8 shadow-lg">
              <Star className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">Start Your Faith Journey</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {subscribed ? "Manage Your Subscription" : "Choose Your Plan"}
            </h2>
            <p className="text-xl text-white font-light leading-relaxed max-w-2xl mx-auto">
              {subscribed 
                ? "You have full access to ChristTask. Manage your subscription below."
                : "Select the plan that works best for you. No sign-up required - start instantly!"
              }
            </p>
          </div>

          {/* Pricing Cards */}
          {!subscribed && (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Weekly Plan */}
              <Card className={`bg-white/70 backdrop-blur-sm border-2 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${selectedPlan === 'weekly' ? 'border-amber-400 ring-4 ring-amber-400/20' : 'border-white/20'}`}>
                <CardHeader className="text-center py-8 px-6">
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
                      Perfect for Beginners
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2">£5.99</div>
                  <div className="text-slate-600 text-lg mb-4">per week</div>
                  <div className="text-slate-500 text-sm">
                    Try it out risk-free
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Unlimited apologetic questions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">All topic categories</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Scripture-based responses</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Cancel anytime</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSubscribe('weekly')}
                    disabled={loading}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Start Weekly Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Monthly Plan */}
              <Card className={`bg-white/70 backdrop-blur-sm border-2 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative ${selectedPlan === 'monthly' ? 'border-amber-400 ring-4 ring-amber-400/20' : 'border-white/20'}`}>
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Best Value
                </div>
                
                <CardHeader className="text-center py-8 px-6">
                  <div className="mb-4">
                    <span className="bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-slate-400 line-through">£34.99</span>
                    <div className="text-4xl font-bold text-slate-800">£18.99</div>
                  </div>
                  <div className="text-slate-600 text-lg mb-4">per month</div>
                  <div className="bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full inline-block">
                    Save £16 Monthly
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Unlimited apologetic questions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">All topic categories</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Scripture-based responses</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Interactive dialogue feature</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Cancel anytime</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSubscribe('monthly')}
                    disabled={loading}
                    size="lg"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Start Monthly Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-white mb-4">
              Trusted by Christians worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 text-slate-300">
              <span className="text-sm">🔒 SSL Secured</span>
              <span className="text-sm">💳 Stripe Protected</span>
              <span className="text-sm">✝️ Faith-Based</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
