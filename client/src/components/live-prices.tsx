import { useQuery } from "@tanstack/react-query";
import { getCryptoPrices } from "@/lib/api";
import { formatCryptoPrice, formatCryptoChange } from "@/lib/crypto";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LivePrices() {
  const { data: prices, isLoading } = useQuery({
    queryKey: ["/api/crypto/prices"],
    queryFn: getCryptoPrices,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Live Crypto Prices
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg p-3">
                  <div className="h-8 w-8 bg-muted-foreground/20 rounded-full mx-auto mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-1"></div>
                  <div className="h-5 bg-muted-foreground/20 rounded mb-1"></div>
                  <div className="h-3 bg-muted-foreground/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Live Crypto Prices
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {prices?.map((crypto) => (
            <div key={crypto.id} className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <img 
                src={crypto.image} 
                alt={crypto.name} 
                className="w-8 h-8 mx-auto mb-2" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="text-sm font-medium text-muted-foreground uppercase">
                {crypto.symbol}
              </div>
              <div className="text-lg font-bold">
                ${formatCryptoPrice(crypto.current_price)}
              </div>
              <div className={`text-xs flex items-center justify-center ${
                crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {formatCryptoChange(crypto.price_change_percentage_24h)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}
