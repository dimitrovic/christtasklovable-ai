
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface PaymentPageProps {
  onBack: () => void;
}

export const PaymentPage = ({ onBack }: PaymentPageProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Payment logic will go here
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment functionality will be implemented here!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className="py-6 px-6 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 dark:bg-slate-100 p-3 rounded-xl shadow-sm">
                <BookOpen className="h-6 w-6 text-slate-50 dark:text-slate-900" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ChristTask
              </h1>
            </div>
            <Button
              onClick={onBack}
              variant="ghost"
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Payment Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Get Started Today
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Join ChristTask and equip yourself to defend the faith with confidence
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="text-center py-12 px-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-slate-400 line-through">£34.99</span>
                <div className="text-5xl font-bold text-slate-900 dark:text-slate-100">£21.99</div>
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-lg mb-4">per month</div>
              <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm font-semibold px-6 py-3 rounded-full inline-block border border-amber-200 dark:border-amber-800">
                Save £13 Monthly - Limited Time
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-12">
              <div className="space-y-6 mb-10">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">Unlimited apologetic questions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">All topic categories covered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">Scripture-based responses</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">24/7 instant access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">Interactive dialogue feature</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-lg">Cancel anytime</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                size="lg"
                className="w-full bg-slate-900 hover:bg-amber-500 dark:bg-slate-100 dark:hover:bg-amber-500 text-slate-50 hover:text-slate-900 dark:text-slate-900 dark:hover:text-slate-900 text-xl py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <BookOpen className="mr-3 h-6 w-6" />
                    Start Your Subscription
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                Secure payment powered by Stripe. Cancel anytime.
              </p>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Trusted by Christians worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 text-slate-400 dark:text-slate-500">
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
