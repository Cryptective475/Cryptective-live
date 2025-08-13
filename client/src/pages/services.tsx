import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InvestmentModal from "@/components/investment-modal";
import RecoveryModal from "@/components/recovery-modal";
import { Check, Shield, TrendingUp, Crown, Sprout, AlertTriangle, Bug, BarChart, Key, Star, Clock } from "lucide-react";

export default function Services() {
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"tier1" | "tier2" | "tier3" | null>(null);

  const investmentTiers = [
    {
      id: "tier1",
      name: "Tier 1",
      range: "$100 - $10,000",
      minAmount: "$100",
      description: "Perfect for beginners looking to start their cryptocurrency investment journey with professional guidance.",
      icon: Sprout,
      color: "text-green-600",
      popular: false,
      features: [
        "Professional Portfolio Management",
        "Monthly Performance Reports",
        "Email Support",
        "Basic Risk Management",
        "Market Analysis Reports",
        "Educational Resources"
      ]
    },
    {
      id: "tier2",
      name: "Tier 2",
      range: "$11,000 - $100,000",
      minAmount: "$11,000",
      description: "Advanced investment strategies for serious investors seeking higher returns with professional oversight.",
      icon: TrendingUp,
      color: "text-primary",
      popular: true,
      features: [
        "Advanced Portfolio Strategies",
        "Weekly Performance Reports",
        "Priority Phone Support",
        "Advanced Risk Management",
        "DeFi Opportunities Access",
        "Quarterly Strategy Reviews",
        "Direct Account Manager",
        "Custom Investment Plans"
      ]
    },
    {
      id: "tier3",
      name: "Tier 3",
      range: "$100,000+",
      minAmount: "$100,000",
      description: "Elite investment management for high-net-worth individuals with personalized strategies and dedicated support.",
      icon: Crown,
      color: "text-yellow-600",
      popular: false,
      features: [
        "Personalized Investment Strategy",
        "Daily Performance Updates",
        "Dedicated Account Manager",
        "Institutional-Grade Security",
        "Exclusive Investment Opportunities",
        "White-glove Service",
        "Private Investment Rounds",
        "Custom Risk Parameters",
        "24/7 VIP Support"
      ]
    }
  ];

  const recoveryTypes = [
    {
      type: "Cryptocurrency Scams",
      description: "Recovery from investment scams, romance scams, and fraudulent trading platforms.",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      type: "Hacked Wallets & Exchanges",
      description: "Professional recovery from compromised personal wallets and exchange accounts.",
      icon: Bug,
      color: "text-orange-600"
    },
    {
      type: "Forex Trading Losses",
      description: "Specialized recovery for unauthorized forex trades and fraudulent brokers.",
      icon: BarChart,
      color: "text-purple-600"
    },
    {
      type: "Lost Private Keys",
      description: "Advanced techniques to recover lost passwords, seed phrases, and wallet access.",
      icon: Key,
      color: "text-blue-600"
    }
  ];

  const handleInvestmentTier = (tier: "tier1" | "tier2" | "tier3") => {
    setSelectedTier(tier);
    setInvestmentModalOpen(true);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Professional Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of cryptocurrency recovery and investment services tailored to your needs.
          </p>
        </div>

        {/* Investment Tiers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Tiers</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {investmentTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <Card 
                  key={tier.id} 
                  className={`relative hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    tier.popular ? 'ring-2 ring-primary border-primary' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full mb-4">
                        <Icon className={`w-8 h-8 ${tier.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{tier.range}</div>
                      <p className="text-muted-foreground text-sm">{tier.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handleInvestmentTier(tier.id as "tier1" | "tier2" | "tier3")}
                      className={`w-full py-4 font-semibold transition-all duration-200 ${
                        tier.popular 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:scale-105' 
                          : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                      }`}
                      variant={tier.popular ? "default" : "outline"}
                    >
                      Select This Tier
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recovery Services */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Cryptocurrency Recovery Services</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  Recovery Types We Handle
                </h3>
                <div className="space-y-6">
                  {recoveryTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.type} className="flex items-start p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-background rounded-lg flex items-center justify-center mr-4">
                          <Icon className={`w-6 h-6 ${type.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{type.type}</h4>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  Start Your Recovery Process
                </h3>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <Button 
                      size="lg"
                      onClick={() => setRecoveryModalOpen(true)}
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Begin Recovery Assessment
                    </Button>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Free consultation • No upfront fees • 95% success rate
                    </p>
                    <div className="flex justify-center items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-green-500 mr-2" />
                        <span>Secure & Confidential</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-2" />
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Emergency Recovery</h4>
                    </div>
                    <p className="text-red-700 dark:text-red-400 text-sm mb-3">
                      If you've recently lost cryptocurrency and need immediate assistance, 
                      our emergency response team can prioritize your case.
                    </p>
                    <p className="text-red-800 dark:text-red-300 font-semibold text-sm">
                      Emergency cases are reviewed within 1 hour.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={investmentModalOpen}
        onClose={() => {
          setInvestmentModalOpen(false);
          setSelectedTier(null);
        }}
        tier={selectedTier}
      />
      <RecoveryModal
        isOpen={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
      />
    </div>
  );
}
