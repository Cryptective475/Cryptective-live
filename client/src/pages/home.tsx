import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LivePrices from "@/components/live-prices";
import InvestmentModal from "@/components/investment-modal";
import RecoveryModal from "@/components/recovery-modal";
import { ArrowRight, Shield, TrendingUp, Users, Clock, Award, DollarSign, Lock } from "lucide-react";

export default function Home() {
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"tier1" | "tier2" | "tier3" | null>(null);

  const services = [
    {
      title: "Crypto Recovery",
      description: "Professional recovery of lost cryptocurrency from scams, hacks, and technical failures.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Investment Management",
      description: "Expert portfolio management and investment strategies for cryptocurrency assets.",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Security Consulting",
      description: "Comprehensive security audits and recommendations for crypto asset protection.",
      icon: Lock,
      color: "text-blue-600"
    }
  ];

  const stats = [
    { label: "Funds Recovered", value: "$50M+", icon: DollarSign },
    { label: "Successful Cases", value: "2,500+", icon: Award },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Expert Support", value: "24/7", icon: Clock }
  ];

  const features = [
    {
      title: "Proven Track Record",
      description: "95% success rate with over 2,500 successful recoveries and $50M+ in recovered assets.",
      icon: Award
    },
    {
      title: "Maximum Security",
      description: "Bank-level security protocols and complete confidentiality for all client information.",
      icon: Lock
    },
    {
      title: "24/7 Availability",
      description: "Round-the-clock support with dedicated account managers for every client.",
      icon: Clock
    },
    {
      title: "No Upfront Fees",
      description: "We only charge a percentage if we successfully recover your funds - completely risk-free.",
      icon: DollarSign
    }
  ];

  const handleInvestmentTier = (tier: "tier1" | "tier2" | "tier3") => {
    setSelectedTier(tier);
    setInvestmentModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
        </div>
        
        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Professional <span className="text-primary">Crypto Recovery</span> & Investment Services
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Specialized cryptocurrency recovery, investment consulting, and secure trading solutions. 
                  Recover lost funds, maximize investments, and navigate the crypto landscape with expert guidance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                  onClick={() => setRecoveryModalOpen(true)}
                >
                  Start Recovery Process
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href="/services">
                    View Investment Tiers
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Live Price Widget */}
            <div className="animate-fade-in">
              <LivePrices />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive cryptocurrency solutions backed by years of experience and cutting-edge technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" asChild>
                      <Link href="/services">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="animate-pulse-slow" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Cryptective</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry-leading expertise with a proven track record of success in cryptocurrency recovery and investment management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Recover Your Assets?</h2>
            <p className="text-xl text-muted-foreground">
              Don't let lost cryptocurrency remain lost forever. Our expert team is standing by to help you recover your digital assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                onClick={() => setRecoveryModalOpen(true)}
              >
                Start Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/contact">Contact Expert Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
