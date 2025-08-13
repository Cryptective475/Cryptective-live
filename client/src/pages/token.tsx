import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCryptoPrices } from "@/lib/api";
import { formatCryptoPrice, formatCryptoChange, generateQRCode, copyToClipboard, WALLET_ADDRESSES } from "@/lib/crypto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PriceChart from "@/components/price-chart";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, Copy, ExternalLink, DollarSign, BarChart3, Users, Globe } from "lucide-react";

export default function Token() {
  const [selectedPeriod, setSelectedPeriod] = useState("7D");
  const { toast } = useToast();
  
  const { data: prices, isLoading } = useQuery({
    queryKey: ["/api/crypto/prices"],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const periods = ["1D", "7D", "30D", "90D"];

  const marketStats = [
    { label: "Total Market Cap", value: "$2.1T", icon: DollarSign, color: "text-blue-600" },
    { label: "24h Volume", value: "$89B", icon: BarChart3, color: "text-green-600" },
    { label: "BTC Dominance", value: "47.2%", icon: TrendingUp, color: "text-orange-600" },
    { label: "Active Addresses", value: "2.5M", icon: Users, color: "text-purple-600" }
  ];

  const wallets = [
    { 
      name: "Bitcoin", 
      symbol: "BTC", 
      address: WALLET_ADDRESSES.btc, 
      icon: "₿", 
      color: "text-orange-500",
      network: "Bitcoin Network"
    },
    { 
      name: "Ethereum", 
      symbol: "ETH", 
      address: WALLET_ADDRESSES.eth, 
      icon: "Ξ", 
      color: "text-blue-500",
      network: "Ethereum (ERC20)"
    },
    { 
      name: "USDT", 
      symbol: "USDT", 
      address: WALLET_ADDRESSES.usdt_erc20, 
      icon: "₮", 
      color: "text-green-500",
      network: "Ethereum (ERC20)"
    },
    { 
      name: "USDT (TRC20)", 
      symbol: "USDT", 
      address: WALLET_ADDRESSES.usdt_trc20, 
      icon: "₮", 
      color: "text-green-500",
      network: "Tron (TRC20)"
    },
    { 
      name: "USDC", 
      symbol: "USDC", 
      address: WALLET_ADDRESSES.usdc, 
      icon: "$", 
      color: "text-blue-600",
      network: "Ethereum (ERC20)"
    },
    { 
      name: "Solana", 
      symbol: "SOL", 
      address: WALLET_ADDRESSES.sol, 
      icon: "◎", 
      color: "text-purple-500",
      network: "Solana Network"
    },
    { 
      name: "Binance Coin", 
      symbol: "BNB", 
      address: WALLET_ADDRESSES.bnb, 
      icon: "◈", 
      color: "text-yellow-500",
      network: "BSC (BEP20)"
    }
  ];

  const handleCopyAddress = async (address: string, name: string) => {
    const success = await copyToClipboard(address);
    if (success) {
      toast({
        title: "Address Copied",
        description: `${name} wallet address copied to clipboard`,
      });
    } else {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Live Market Data</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time cryptocurrency prices, charts, and secure payment options for your cryptocurrency transactions.
          </p>
        </div>

        {/* Price Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
            Live Cryptocurrency Prices
          </h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {prices?.slice(0, 4).map((crypto) => (
                <Card key={crypto.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={crypto.image} 
                      alt={crypto.name} 
                      className="w-12 h-12 mx-auto mb-4" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <h3 className="font-bold text-lg mb-2">{crypto.name}</h3>
                    <div className="text-2xl font-bold mb-2">
                      ${formatCryptoPrice(crypto.current_price)}
                    </div>
                    <div className={`flex items-center justify-center text-sm ${
                      crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {formatCryptoChange(crypto.price_change_percentage_24h)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Chart Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <PriceChart coinId="bitcoin" title="Bitcoin Price Chart" />
            <PriceChart coinId="ethereum" title="Ethereum Price Chart" />
          </div>
        </section>

        {/* Market Statistics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12">Market Statistics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full mb-4">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Payment Wallets Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Accepted Payment Methods</h2>
            <p className="text-xl text-muted-foreground">
              Secure wallet addresses for cryptocurrency payments with QR codes for easy transactions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallets.map((wallet, index) => (
              <Card key={`${wallet.symbol}-${index}`} className="hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`text-4xl mb-2 ${wallet.color}`}>{wallet.icon}</div>
                  <CardTitle className="text-xl">{wallet.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {wallet.network}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto border rounded-lg overflow-hidden bg-white">
                    <img
                      src={generateQRCode(wallet.address, 128)}
                      alt={`${wallet.name} QR Code`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Wallet Address:</p>
                    <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                      {wallet.address}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyAddress(wallet.address, wallet.name)}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={`https://blockchair.com/${wallet.symbol.toLowerCase()}/address/${wallet.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Important Security Notice</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Always verify wallet addresses before sending funds</p>
                  <p>• Double-check the network type (ERC20, TRC20, etc.) before transactions</p>
                  <p>• Keep transaction receipts for your records</p>
                  <p>• Contact support if you need assistance with payments</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
