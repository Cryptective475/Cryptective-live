import { useState, useCallback } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setWalletState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to continue.',
      }));
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setWalletState({
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        error: null,
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWalletState({
            isConnected: false,
            address: null,
            chainId: null,
            isConnecting: false,
            error: null,
          });
        } else {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
          }));
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        setWalletState(prev => ({
          ...prev,
          chainId: parseInt(chainId, 16),
        }));
      });

    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
}

// Extend window object for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
