import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, Shield, AlertTriangle, Phone, MapPin } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  mathCheck: z.string().refine((val) => parseInt(val) === 8, "Please solve the math problem correctly"),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      mathCheck: "",
      terms: false
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message. A representative will contact you shortly.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    // Add honeypot check (hidden field)
    const formData = {
      ...data,
      honeypot: "", // Empty honeypot field
    };
    mutation.mutate(formData);
  };

  const contactInfo = [
    {
      title: "Email Support",
      description: "Get expert help via email",
      detail: "support@cryptective.xyz",
      icon: Mail,
      color: "text-blue-600"
    },
    {
      title: "Response Time",
      description: "We typically respond within",
      detail: "2-4 hours",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Secure Communication",
      description: "All communications are encrypted",
      detail: "End-to-end encrypted",
      icon: Shield,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Our Experts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our cryptocurrency recovery and investment specialists. We're here to help 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="flex items-start">
                      <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-muted-foreground mb-2">{info.description}</p>
                        <p className={`font-semibold ${info.color}`}>{info.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Contact */}
            <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="font-bold text-red-800 dark:text-red-300">Emergency Recovery</h3>
                </div>
                <p className="text-red-700 dark:text-red-400 text-sm mb-4">
                  If you've recently lost cryptocurrency and need immediate assistance, 
                  please mark your message as urgent and include "EMERGENCY" in the subject line.
                </p>
                <p className="text-red-800 dark:text-red-300 font-semibold text-sm">
                  Emergency cases are prioritized and reviewed within 1 hour.
                </p>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold">Global Operations</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🇺🇸 United States: Primary Operations</p>
                  <p>🇬🇧 United Kingdom: European Division</p>
                  <p>🇦🇺 Australia: Asia-Pacific Region</p>
                  <p>🌍 25+ Countries Served Worldwide</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field (hidden) */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cryptocurrency Recovery">Cryptocurrency Recovery</SelectItem>
                            <SelectItem value="Investment Consultation">Investment Consultation</SelectItem>
                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                            <SelectItem value="EMERGENCY - Urgent Recovery">EMERGENCY - Urgent Recovery</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Please provide details about your situation or inquiry..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Anti-Bot Math Check */}
                  <FormField
                    control={form.control}
                    name="mathCheck"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anti-Spam Check: What is 5 + 3? *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter the answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the Terms of Service and Privacy Policy. 
                            I understand that my information will be kept confidential.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full py-4 text-lg font-semibold hover:scale-105 transition-transform"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Contact Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8">Alternative Contact Methods</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">Phone Support</h4>
                <p className="text-sm text-muted-foreground mb-3">Available for urgent cases</p>
                <p className="text-sm font-medium">Request callback via contact form</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">Secure Portal</h4>
                <p className="text-sm text-muted-foreground mb-3">Encrypted file sharing</p>
                <p className="text-sm font-medium">Available after initial contact</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-sm text-muted-foreground mb-3">Round-the-clock assistance</p>
                <p className="text-sm font-medium">Emergency cases prioritized</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
