export function generateQRCodeURL(text: string, size: number = 200): string {
  // Using QR Server API for QR code generation
  const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    data: text,
    format: 'png',
    bgcolor: 'ffffff',
    color: '000000',
    margin: '10'
  });
  
  return `${baseUrl}?${params.toString()}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
