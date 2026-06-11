export const CONVERSION_RATE = 1;
export const CURRENCY_SYMBOL = '₹';

// Delivery and threshold metrics for Indian Rupees
export const SHIPPING_THRESHOLD = 1500;
export const SHIPPING_FEE = 150;

/**
 * Formats a given price with the Indian Rupee symbol and appropriate locale.
 * E.g., 599 -> ₹599
 */
export function formatPrice(priceINR: number): string {
  return `${CURRENCY_SYMBOL}${Math.round(priceINR).toLocaleString('en-IN')}`;
}

/**
 * Base prices are now in INR directly, so no conversion multiplier is needed.
 */
export function convertUSDToINR(price: number): number {
  return price;
}
