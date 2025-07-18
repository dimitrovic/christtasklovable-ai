import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, CheckCircle, Star } from "lucide-react";
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
  
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = async () => {
    await createCheckout(selectedPlan);
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
                <span className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}>↻</span>
                Refresh
              </Button>
              <Button
                onClick={onBack}
                variant="ghost"
                className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-300"
              >
                <span className="h-4 w-4">←</span>
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
                        Current Subscription Status
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
                        Manage Current Subscription
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
              <span className="text-sm font-medium text-slate-700">
                {subscribed ? "Upgrade or Change Your Plan" : "Start Your Faith Journey"}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {subscribed ? "Available Subscription Plans" : "Choose Your Plan"}
            </h2>
            <p className="text-xl text-white font-light leading-relaxed max-w-2xl mx-auto">
              {subscribed 
                ? "Explore all available plans. You can change or upgrade your subscription at any time."
                : "Select the plan that works best for you. No sign-up required - start instantly!"
              }
            </p>
          </div>

          {/* Plan Selection */}
          <div className="mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Your Plan</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value="weekly"
                      checked={selectedPlan === 'weekly'}
                      onChange={(e) => setSelectedPlan(e.target.value as 'weekly' | 'monthly')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-white font-medium">Weekly Plan - £4.50/week</span>
                      <p className="text-white/70 text-sm">Perfect for beginners</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value="monthly"
                      checked={selectedPlan === 'monthly'}
                      onChange={(e) => setSelectedPlan(e.target.value as 'weekly' | 'monthly')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-white font-medium">Monthly Plan - £11.99/month</span>
                      <p className="text-white/70 text-sm">Most popular choice</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <Button
              onClick={handleSubscribe}
              disabled={loading}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start {selectedPlan === 'weekly' ? 'Weekly' : 'Monthly'} Plan
            </Button>
          </div>

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
