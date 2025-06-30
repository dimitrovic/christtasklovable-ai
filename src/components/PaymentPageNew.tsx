import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, CreditCard, Shield, Zap, BookOpen } from "lucide-react";
// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const PaymentForm = ({ selectedPlan, setSelectedPlan, navigate }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    try {
      // Simulate coupon validation - replace with your actual coupon logic
      const validCoupons = {
        'WELCOME10': 10, // 10% off
        'SAVE20': 20,    // 20% off
        'FIRST50': 50    // £5 off
      };
      
      const discountPercent = validCoupons[couponCode.toUpperCase()];
      if (discountPercent) {
        setDiscount(discountPercent);
        alert(`Coupon applied! ${discountPercent}% discount added.`);
      } else {
        alert('Invalid coupon code. Please try again.');
      }
    } catch (error) {
      alert('Error applying coupon. Please try again.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const getDiscountedPrice = () => {
    const basePrice = selectedPlan === 'weekly' ? 4.50 : 11.99;
    if (discount > 0) {
      return (basePrice * (100 - discount) / 100).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    try {
      // Call backend to create payment intent
      const backendUrl = import.meta.env.PROD 
        ? "https://your-backend-url.vercel.app/create-payment-intent"  // Replace with your actual backend URL
        : "/api/create-payment-intent";
        
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          email: formData.email,
          name: formData.name,
          couponCode: couponCode,
          discount: discount
        })
      });
      const data = await res.json();
      if (!data.clientSecret) throw new Error("No client secret returned");
      // Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.name,
            email: formData.email
          }
        }
      });
      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        alert("Payment successful! Welcome to ChristTask " + selectedPlan + " plan.");
        navigate('/');
      }
    } catch (err: any) {
      alert("Payment failed: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Coupon Code */}
      <div className="space-y-2">
        <Label className="text-white">Have a coupon code?</Label>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            placeholder="Enter coupon code"
          />
          <Button
            type="button"
            onClick={applyCoupon}
            disabled={isApplyingCoupon || !couponCode.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
          >
            {isApplyingCoupon ? 'Applying...' : 'Apply'}
          </Button>
        </div>
        {discount > 0 && (
          <div className="text-green-400 text-sm">
            ✓ {discount}% discount applied! New price: £{getDiscountedPrice()}
          </div>
        )}
      </div>

      {/* Stripe Card Element */}
      <div>
        <Label className="text-white">Card Details</Label>
        <div className="bg-white/20 border-white/30 rounded p-3 mt-2">
          <CardElement options={{ style: { base: { color: '#fff', fontSize: '16px' } } }} />
        </div>
      </div>
      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-blue-200 text-sm">
        <Shield className="h-4 w-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg font-semibold"
      >
        {isProcessing ? (
          <div>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          <div>
            <Zap className="w-5 h-5 mr-2" />
            Pay £{getDiscountedPrice()} - Start Now
          </div>
        )}
      </Button>
    </form>
  );
};

export const PaymentPageNew = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-amber-600/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 py-6 px-6 border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <h1 className="text-2xl font-bold text-white">ChristTask</h1>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="flex items-center space-x-2 text-white hover:bg-white/10"
            >
              <span className="h-4 w-4">←</span>
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Start your apologetics journey today with instant access to AI-powered biblical answers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pricing Cards */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Select Your Plan</h3>
              
              {/* Weekly Plan */}
              <Card className={`bg-white/10 backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedPlan === 'weekly' ? 'border-blue-400 ring-4 ring-blue-400/20' : 'border-white/20'
              }`}>
                <CardHeader className="text-center py-6">
                  <div className="text-3xl font-bold text-white mb-2">£4.50</div>
                  <div className="text-blue-200 text-lg">per week</div>
                  <div className="text-blue-300 text-sm">Perfect for beginners</div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Unlimited apologetic questions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">All topic categories</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Scripture-based responses</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Cancel anytime</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedPlan('weekly')}
                    variant={selectedPlan === 'weekly' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    {selectedPlan === 'weekly' ? 'Selected' : 'Choose Weekly'}
                  </Button>
                </CardContent>
              </Card>

              {/* Monthly Plan */}
              <Card className={`bg-white/10 backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedPlan === 'monthly' ? 'border-purple-400 ring-4 ring-purple-400/20' : 'border-white/20'
              }`}>
                <CardHeader className="text-center py-6">
                  <div className="text-3xl font-bold text-white mb-2">£11.99</div>
                  <div className="text-purple-200 text-lg">per month</div>
                  <div className="text-purple-300 text-sm">Most popular choice</div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Everything in weekly plan</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Priority support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Advanced features</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Best value</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedPlan('monthly')}
                    variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    {selectedPlan === 'monthly' ? 'Selected' : 'Choose Monthly'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stripe Payment Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Payment Information</h3>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6">
                  <Elements stripe={stripePromise}>
                    <PaymentForm selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} navigate={navigate} />
                  </Elements>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 