export function generateQRCode(text: string, size: number = 200): string {
  // Using QR Server API for QR code generation
  const params = new URLSearchParams({
    data: text,
    size: `${size}x${size}`,
    format: 'svg',
    bgcolor: 'ffffff',
    color: '000000',
    margin: '10'
  });
  
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

export function formatCryptoPrice(price: number): string {
  if (price < 1) {
    return price.toFixed(4);
  } else if (price < 100) {
    return price.toFixed(2);
  } else {
    return Math.round(price).toLocaleString();
  }
}

export function formatCryptoChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

export const WALLET_ADDRESSES = {
  btc: 'bc1q64ddhqdhj6k9dsdxzp732vypysnrlqgtxnkz3r',
  eth: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
  usdt_erc20: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
  usdt_trc20: 'TK3VqoZz9ytane8mFQYZY2qkhEXpSFD1N8',
  usdc: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e',
  sol: '5bNPoCXfv1HjBpd769arF4msVGgxjqEKB18ujZ8eZ1a4',
  bnb: '0x187CF971622C9E47Cb587dbFd310Cc51288E273e'
};

export const CRYPTO_ICONS = {
  btc: '₿',
  eth: 'Ξ',
  usdt: '₮',
  usdc: '$',
  sol: '◎',
  bnb: 'BNB'
};
