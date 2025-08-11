import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { generateQRCodeURL, copyToClipboard } from "@/lib/qr-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodsProps {
  selectedMethod?: string;
  onMethodSelect?: (method: string) => void;
  showQR?: boolean;
}

const CRYPTO_INFO = {
  btc: { name: "Bitcoin", symbol: "BTC", icon: "₿", color: "bg-orange-500" },
  eth: { name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "bg-blue-500" },
  usdt_erc20: { name: "USDT (ERC20)", symbol: "USDT", icon: "₮", color: "bg-green-500" },
  usdt_trc20: { name: "USDT (TRC20)", symbol: "USDT", icon: "₮", color: "bg-green-600" },
  usdc: { name: "USD Coin", symbol: "USDC", icon: "USDC", color: "bg-blue-600" },
  sol: { name: "Solana", symbol: "SOL", icon: "◎", color: "bg-purple-500" },
  bnb: { name: "BNB", symbol: "BNB", icon: "◈", color: "bg-yellow-500" },
};

export function PaymentMethods({ selectedMethod, onMethodSelect, showQR = false }: PaymentMethodsProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: walletAddresses, isLoading } = useQuery({
    queryKey: ['/api/wallets'],
    queryFn: api.getWalletAddresses,
  });

  const handleCopy = async (address: string, method: string) => {
    try {
      await copyToClipboard(address);
      setCopiedAddress(method);
      toast({
        title: "Address Copied",
        description: `${CRYPTO_INFO[method as keyof typeof CRYPTO_INFO].name} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-20 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accepted Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {walletAddresses && Object.entries(walletAddresses).map(([method, address]) => {
            const crypto = CRYPTO_INFO[method as keyof typeof CRYPTO_INFO];
            if (!crypto) return null;

            const isSelected = selectedMethod === method;

            return (
              <div
                key={method}
                className={`p-4 border rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                } ${onMethodSelect ? 'cursor-pointer' : ''}`}
                onClick={() => onMethodSelect?.(method)}
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 ${crypto.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white text-xl font-bold">{crypto.icon}</span>
                  </div>
                  <h4 className="font-semibold">{crypto.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {crypto.symbol}
                  </Badge>
                </div>

                {/* QR Code */}
                {showQR && (
                  <div className="text-center mb-4">
                    <img
                      src={generateQRCodeURL(address as string, 150)}
                      alt={`${crypto.name} QR Code`}
                      className="w-32 h-32 mx-auto border rounded-lg"
                    />
                  </div>
                )}

                {/* Address */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Wallet Address</p>
                  <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                    {address as string}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(address as string, method);
                    }}
                  >
                    {copiedAddress === method ? (
                      <>
                        <Check className="w-3 h-3 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-2" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Important:</strong> Only send the corresponding cryptocurrency to each address. 
            Sending wrong tokens may result in permanent loss of funds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
