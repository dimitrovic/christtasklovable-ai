import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, CreditCard, Shield, Zap, BookOpen } from "lucide-react";

export const PaymentPageNew = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment successful! Welcome to ChristTask ${selectedPlan} plan.`);
      navigate('/');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

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

            {/* Payment Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Payment Information</h3>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6">
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

                    {/* Card Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                          <Input
                            id="cardNumber"
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/50 pl-10"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryMonth" className="text-white">Month</Label>
                          <Select value={formData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                                  {month.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="expiryYear" className="text-white">Year</Label>
                          <Select value={formData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="YY" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                                <SelectItem key={year} value={year.toString().slice(-2)}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-white">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
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
                      disabled={isProcessing}
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
                          Pay {selectedPlan === 'weekly' ? '£4.50' : '£11.99'} - Start Now
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 