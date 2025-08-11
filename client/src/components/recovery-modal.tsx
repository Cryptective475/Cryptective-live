import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { submitRecoveryRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Upload, Shield } from "lucide-react";

const recoverySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  lossType: z.string().min(1, "Please select the type of loss"),
  estimatedLoss: z.string().min(1, "Estimated loss amount is required"),
  cryptoType: z.string().optional(),
  incidentDate: z.string().optional(),
  description: z.string().min(50, "Please provide a detailed description (minimum 50 characters)"),
});

type RecoveryForm = z.infer<typeof recoverySchema>;

interface RecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const lossTypes = [
  "Cryptocurrency Scam",
  "Wallet/Exchange Hack",
  "Forex Trading Loss",
  "Phishing Attack",
  "Lost Private Keys",
  "Unauthorized Transactions",
  "Mining Pool Scam",
  "ICO/Token Fraud",
  "Other",
];

const cryptoTypes = [
  "Bitcoin (BTC)",
  "Ethereum (ETH)",
  "USDT",
  "USDC",
  "Binance Coin (BNB)",
  "Solana (SOL)",
  "Cardano (ADA)",
  "Dogecoin (DOGE)",
  "Other",
];

export default function RecoveryModal({ isOpen, onClose }: RecoveryModalProps) {
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<RecoveryForm>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      lossType: "",
      estimatedLoss: "",
      cryptoType: "",
      incidentDate: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitRecoveryRequest,
    onSuccess: () => {
      toast({
        title: "Recovery Request Submitted",
        description: "Your recovery request has been submitted successfully. A representative will contact you within 24 hours.",
      });
      onClose();
      form.reset();
      setEvidenceFiles([]);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your recovery request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RecoveryForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    evidenceFiles.forEach((file) => {
      formData.append("evidence", file);
    });
    mutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setEvidenceFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crypto Recovery Request</DialogTitle>
        </DialogHeader>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-3" />
            <p className="text-green-800 dark:text-green-300 text-sm">
              All information is kept strictly confidential. You'll be contacted by a recovery specialist within 24 hours.
            </p>
          </div>
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
              name="lossType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Loss *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of loss" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lossTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="estimatedLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Loss Amount (USD) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cryptoType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cryptocurrency Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cryptoTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="incidentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When did the incident occur?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Please provide detailed information about your situation, including dates, platforms involved, transaction IDs if available, and any other relevant information..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="evidence" className="block text-sm font-medium mb-2">
                Supporting Evidence (Optional)
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Upload screenshots, transaction records, or other supporting documents</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB each (max 5 files)</p>
                <Input
                  type="file"
                  id="evidence"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("evidence")?.click()}
                  className="mt-2"
                >
                  Upload Files
                </Button>
                {evidenceFiles.length > 0 && (
                  <div className="mt-2 text-sm text-primary">
                    {evidenceFiles.length} file(s) selected
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                    What happens next?
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    A cryptocurrency recovery specialist will review your case and contact you within 24 hours. 
                    There are no upfront fees - we only charge a percentage if we successfully recover your funds.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Submitting..." : "Submit Recovery Request"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
