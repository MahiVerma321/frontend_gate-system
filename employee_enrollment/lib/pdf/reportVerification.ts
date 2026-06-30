import QRCode from "qrcode";

/**
 * Generates a unique verification ID
 */
export function generateVerificationId(employeeId: string) {
  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `SV-${employeeId}-${random}`;
}

/**
 * Generates a pseudo SHA-256 signature
 */
export function generateSignature() {
  return Math.random()
    .toString(36)
    .substring(2)
    .toUpperCase()
    .slice(0, 24);
}

/**
 * Generates a QR code
 */
export async function generateQRCode(
  verificationId: string
) {
  return await QRCode.toDataURL(verificationId, {
    margin: 1,
    width: 220,
  });
}