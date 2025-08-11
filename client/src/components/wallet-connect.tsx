import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    // Simulate wallet connection
    // In a real implementation, this would use Web3Modal or RainbowKit
    try {
      setAddress("0x1234...5678");
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
  };

  if (isConnected) {
    return (
      <Button variant="outline" onClick={disconnectWallet} className="text-sm">
        <Wallet className="w-4 h-4 mr-2" />
        {address}
      </Button>
    );
  }

  return (
    <Button onClick={connectWallet} className="text-sm">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
}
