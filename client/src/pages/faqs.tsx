import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import RecoveryModal from "@/components/recovery-modal";
import { ChevronDown, ChevronUp, Lightbulb, MessageCircle, Shield } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful?: string;
}

export default function FAQs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "recovery", name: "Recovery Services" },
    { id: "investment", name: "Investment Tiers" },
    { id: "security", name: "Security & Privacy" },
    { id: "payments", name: "Payments & Fees" },
    { id: "general", name: "General Questions" }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How does cryptocurrency recovery work?",
      answer: "Our recovery process involves advanced blockchain analysis, legal coordination with exchanges and law enforcement, and specialized techniques to trace and recover lost funds. We use proprietary tools and have relationships with major exchanges to maximize recovery chances.",
      category: "recovery",
      helpful: "Success rates vary by case type, but our overall recovery rate is 95% for cases we accept."
    },
    {
      id: 2,
      question: "What types of cryptocurrency losses can you recover?",
      answer: "We handle various types of losses including scam victims, hacked exchanges, compromised wallets, romance scams, investment fraud, forex trading losses, and lost private keys. Each case is evaluated individually to determine recovery feasibility.",
      category: "recovery"
    },
    {
      id: 3,
      question: "How long does the recovery process take?",
      answer: "Recovery timeframes vary depending on case complexity. Simple cases may be resolved within 2-4 weeks, while complex cases involving multiple jurisdictions can take 3-6 months. We provide regular updates throughout the process.",
      category: "recovery",
      helpful: "Emergency cases receive priority treatment and are often resolved faster."
    },
    {
      id: 4,
      question: "Do you charge upfront fees?",
      answer: "No, we operate on a contingency basis. We only charge a percentage fee if we successfully recover your funds. There are absolutely no upfront costs, making our service completely risk-free for clients.",
      category: "payments"
    },
    {
      id: 5,
      question: "What is your success rate?",
      answer: "We maintain a 95% success rate for cases we accept. Our pre-screening process ensures we only take on cases where we believe recovery is possible. This selective approach allows us to maintain our high success rate.",
      category: "general",
      helpful: "We provide a free initial consultation to assess your case's viability."
    },
    {
      id: 6,
      question: "How do investment tiers work?",
      answer: "Our investment tiers are structured based on investment amounts: Tier 1 ($100-$10K), Tier 2 ($11K-$100K), and Tier 3 ($100K+). Each tier offers progressively more personalized service, from basic portfolio management to dedicated account managers.",
      category: "investment"
    },
    {
      id: 7,
      question: "Is my information kept confidential?",
      answer: "Absolutely. We use bank-level encryption and follow strict confidentiality protocols. All client information is protected by attorney-client privilege where applicable, and we never share details without explicit consent.",
      category: "security",
      helpful: "We can provide additional security measures for high-profile clients upon request."
    },
    {
      id: 8,
      question: "What payment methods do you accept?",
      answer: "We accept Bitcoin (BTC), Ethereum (ETH), USDT (ERC20 and TRC20), USDC, Solana (SOL), and Binance Coin (BNB). All payments are processed through secure, verified wallet addresses with QR code verification.",
      category: "payments"
    },
    {
      id: 9,
      question: "Can you help with forex trading losses?",
      answer: "Yes, we specialize in forex trading fraud recovery. Many forex scams involve cryptocurrency payments, and we have specific expertise in tracing these transactions and coordinating with international authorities for recovery.",
      category: "recovery"
    },
    {
      id: 10,
      question: "Do you work internationally?",
      answer: "Yes, we serve clients worldwide and have experience with international cases. We work with law enforcement and legal professionals in over 25 countries to facilitate cross-border recovery operations.",
      category: "general"
    },
    {
      id: 11,
      question: "What evidence do I need for recovery?",
      answer: "We typically need transaction records, wallet addresses, communication with scammers, screenshots, and any documentation related to your loss. Even partial information can be helpful - our team can often work with limited evidence.",
      category: "recovery",
      helpful: "The more documentation you can provide, the better your chances of successful recovery."
    },
    {
      id: 12,
      question: "How secure are your investment services?",
      answer: "We use institutional-grade security measures including multi-signature wallets, cold storage, insurance coverage, and regular security audits. All client funds are segregated and protected by comprehensive security protocols.",
      category: "security"
    }
  ];

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our cryptocurrency recovery and investment services.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className="shadow-lg">
              <Collapsible
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg">
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        {categories.find(c => c.id === faq.category)?.name.split(' ')[0]}
                      </Badge>
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    </div>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0" />
                    )}
                  </button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="pl-16">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      {faq.helpful && (
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-start">
                            <Lightbulb className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-primary mb-1">Helpful Tip</h4>
                              <p className="text-primary/80 text-sm">{faq.helpful}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8">
            <CardContent className="p-0">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our expert team is available 24/7 to provide personalized assistance with your cryptocurrency needs. 
                Get in touch for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  asChild
                >
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setRecoveryModalOpen(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Start Recovery Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Help Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Emergency Recovery</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Lost crypto recently? Get immediate assistance from our emergency response team.
            </p>
            <Button size="sm" variant="outline" onClick={() => setRecoveryModalOpen(true)}>
              Start Now
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Live Chat Support</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant answers to your questions from our support specialists.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="/contact">Chat Now</a>
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Lightbulb className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Knowledge Base</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our comprehensive guides and tutorials for crypto security.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="/blog">Learn More</a>
            </Button>
          </Card>
        </div>
      </div>

      <RecoveryModal
        isOpen={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
      />
    </div>
  );
}
