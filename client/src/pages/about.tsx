import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Lock, Clock, Shield, TrendingUp, Globe, Star } from "lucide-react";

export default function About() {
  const achievements = [
    { label: "Founded", value: "2019", icon: Globe },
    { label: "Expert Team", value: "50+", icon: Users },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Success Rate", value: "95%", icon: TrendingUp }
  ];

  const services = [
    {
      title: "Asset Recovery",
      description: "Specialized recovery of cryptocurrency lost to scams, hacks, technical failures, and forgotten credentials.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Investment Consulting",
      description: "Professional guidance for cryptocurrency investments, portfolio management, and risk assessment.",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Expert Support",
      description: "24/7 support from certified blockchain specialists and cybersecurity professionals.",
      icon: Users,
      color: "text-blue-600"
    }
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
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Cryptective</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the industry in cryptocurrency recovery and investment management with unmatched expertise and proven results.
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team working on cryptocurrency recovery" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Our Mission</Badge>
                <h2 className="text-3xl font-bold mb-6">Restoring Trust in Digital Assets</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded by cybersecurity experts and blockchain specialists, Cryptective emerged from the growing need 
                  for professional cryptocurrency recovery services. We've witnessed too many individuals and businesses 
                  lose their digital assets to scams, hacks, and technical failures.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our mission is to provide world-class recovery services while educating the community about secure 
                  cryptocurrency practices. With cutting-edge technology and deep blockchain expertise, we've successfully 
                  recovered over $50 million in lost digital assets.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.label} className="text-center p-4 rounded-lg bg-muted/50">
                      <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-primary">{achievement.value}</div>
                      <div className="text-sm text-muted-foreground">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our approach to cryptocurrency recovery and client service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Integrity & Transparency</h3>
                  <p className="text-muted-foreground">
                    We operate with complete honesty about our processes, success rates, and fees. 
                    No hidden charges, no false promises - just clear communication and ethical practices.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Client-Centric Approach</h3>
                  <p className="text-muted-foreground">
                    Every client receives personalized attention and dedicated support. We understand that 
                    losing cryptocurrency is stressful, and we're here to guide you through every step.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Continuous Innovation</h3>
                  <p className="text-muted-foreground">
                    We stay at the forefront of blockchain technology and recovery techniques, 
                    constantly improving our methods to achieve better results for our clients.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Excellence in Results</h3>
                  <p className="text-muted-foreground">
                    Our 95% success rate speaks for itself. We don't take on cases unless we believe 
                    we can achieve a positive outcome for our clients.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Cryptective</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start text-left">
                    <Icon className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="opacity-90 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
