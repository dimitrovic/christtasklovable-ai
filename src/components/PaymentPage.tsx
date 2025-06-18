
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, CheckCircle, ArrowLeft, Star, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";

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

  const handleSubscribe = async () => {
    // No email required - just proceed with checkout
    await createCheckout();
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
        <div className="container mx-auto max-w-2xl">
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
              {subscribed ? "Manage Your Subscription" : "Get Instant Access"}
            </h2>
            <p className="text-xl text-white font-light leading-relaxed max-w-2xl mx-auto">
              {subscribed 
                ? "You have full access to ChristTask. Manage your subscription below."
                : "No sign-up required! Click below for instant access to ChristTask"
              }
            </p>
          </div>

          {/* Pricing Card */}
          {!subscribed && (
            <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center py-12 px-8">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-slate-400 line-through">£34.99</span>
                  <div className="text-5xl font-bold text-slate-800">£18.99</div>
                </div>
                <div className="text-slate-600 text-lg mb-4">per month</div>
                <div className="bg-amber-100 text-amber-700 text-sm font-semibold px-6 py-3 rounded-full inline-block border border-amber-200">
                  Save £16 Monthly - Limited Time
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-12">
                <div className="space-y-6 mb-10">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">Unlimited apologetic questions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">All topic categories covered</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">Scripture-based responses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">24/7 instant access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">Interactive dialogue feature</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">Cancel anytime</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-white text-slate-800 hover:bg-amber-400 hover:text-white font-bold text-xl py-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="mr-3 h-6 w-6" />
                  Get Instant Access - No Sign-up Required
                </Button>

                <p className="text-center text-sm text-slate-600 mt-6">
                  Secure payment powered by Stripe. Create account during checkout.
                </p>
              </CardContent>
            </Card>
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
