import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { submitInvestmentApplication } from "@/lib/api";
import { generateQRCode, copyToClipboard, WALLET_ADDRESSES } from "@/lib/crypto";
import { useToast } from "@/hooks/use-toast";
import { Copy, Upload } from "lucide-react";

const investmentSchema = z.object({
  tier: z.string().min(1, "Please select a tier"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  preferredContact: z.string().min(1, "Please select a contact method"),
  amount: z.string().min(1, "Investment amount is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

type InvestmentForm = z.infer<typeof investmentSchema>;

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: "tier1" | "tier2" | "tier3" | null;
}

const tierData = {
  tier1: {
    title: "Tier 1 Investment",
    range: "$100 - $10,000",
    description: "Professional portfolio management with monthly performance reports and email support.",
  },
  tier2: {
    title: "Tier 2 Investment", 
    range: "$11,000 - $100,000",
    description: "Advanced portfolio strategies with weekly reports and priority phone support.",
  },
  tier3: {
    title: "Tier 3 Investment",
    range: "$100,000+", 
    description: "Personalized investment strategy with daily updates and dedicated account manager.",
  },
};

const paymentMethods = [
  { value: "btc", label: "Bitcoin (BTC)", icon: "₿" },
  { value: "eth", label: "Ethereum (ETH)", icon: "Ξ" },
  { value: "usdt", label: "USDT (ERC20)", icon: "₮" },
  { value: "sol", label: "Solana (SOL)", icon: "◎" },
];

export default function InvestmentModal({ isOpen, onClose, tier }: InvestmentModalProps) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<InvestmentForm>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      tier: tier || "",
      fullName: "",
      email: "",
      phone: "",
      preferredContact: "email",
      amount: "",
      paymentMethod: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitInvestmentApplication,
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your investment application has been submitted successfully. You will receive a confirmation email shortly.",
      });
      onClose();
      form.reset();
      setReceiptFile(null);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");
  const walletAddress = selectedPaymentMethod ? WALLET_ADDRESSES[selectedPaymentMethod as keyof typeof WALLET_ADDRESSES] : "";

  const onSubmit = (data: InvestmentForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (receiptFile) {
      formData.append("receipt", receiptFile);
    }
    mutation.mutate(formData);
  };

  const handleCopyAddress = async () => {
    if (walletAddress) {
      const success = await copyToClipboard(walletAddress);
      if (success) {
        toast({
          title: "Address Copied",
          description: "Wallet address copied to clipboard",
        });
      }
    }
  };

  if (!tier) return null;

  const currentTier = tierData[tier];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Investment Application</DialogTitle>
        </DialogHeader>

        <div className="bg-primary/10 p-6 rounded-xl mb-6">
          <h4 className="text-lg font-semibold text-primary mb-2">{currentTier.title}</h4>
          <p className="text-primary/80 mb-2">{currentTier.range}</p>
          <p className="text-sm text-primary/70">{currentTier.description}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Amount (USD) *</FormLabel>
                  <FormControl>
                    <Input type="number" min="100" placeholder="Enter amount in USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.value}>
                          <RadioGroupItem
                            value={method.value}
                            id={method.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={method.value}
                            className="flex flex-col items-center justify-center p-4 border-2 border-muted rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-colors"
                          >
                            <span className="text-2xl mb-2">{method.icon}</span>
                            <span className="text-sm font-medium text-center">{method.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {walletAddress && (
              <div className="p-6 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
                <h4 className="font-semibold text-primary mb-4">Payment Instructions</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-primary/70 mb-2">
                      Wallet Address
                    </Label>
                    <div className="p-3 bg-background rounded border font-mono text-sm break-all">
                      {walletAddress}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="mt-2 text-primary hover:text-primary/80"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Address
                    </Button>
                  </div>
                  <div className="text-center">
                    <Label className="block text-sm font-medium text-primary/70 mb-2">
                      Scan QR Code
                    </Label>
                    <div className="w-32 h-32 mx-auto border rounded">
                      <img
                        src={generateQRCode(walletAddress, 128)}
                        alt="QR Code"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="receipt" className="block text-sm font-medium mb-2">
                Upload Payment Receipt
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                <Input
                  type="file"
                  id="receipt"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("receipt")?.click()}
                  className="mt-2"
                >
                  Browse Files
                </Button>
                {receiptFile && (
                  <p className="mt-2 text-sm text-primary">
                    Selected: {receiptFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
