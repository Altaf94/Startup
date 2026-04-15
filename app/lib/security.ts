// Security utility to prevent developer tools and inspect element access

export function initializeSecurityMeasures() {
  if (typeof window === 'undefined') return;

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable keyboard shortcuts for developer tools
  document.addEventListener('keydown', (e) => {
    // F12 - Developer Tools
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + Shift + I - Inspect
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + Shift + C - Inspect Element
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + Shift + J - Console
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + Shift + K - Console (Firefox)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
      e.preventDefault();
      return false;
    }
  });

// Server-side validation helpers
export function validateOrderData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;

  // Validate cart items structure
  if (!Array.isArray(data.items)) return false;

  // Validate amounts are numbers
  if (typeof data.subtotal !== 'number' || data.subtotal < 0) return false;
  if (typeof data.deliveryFee !== 'number' || data.deliveryFee < 0) return false;

  return true;
}

// Validate and sanitize user input
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim()
    .substring(0, 255); // Limit length
}

// Verify order totals server-side
export function verifyOrderTotal(
  items: any[],
  subtotal: number,
  deliveryFee: number,
  total: number
): boolean {
  // This should be recalculated server-side from items
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  if (Math.abs(calculatedSubtotal - subtotal) > 0.01) {
    console.error('Order subtotal mismatch');
    return false;
  }

  if (deliveryFee < 0) {
    console.error('Invalid delivery fee');
    return false;
  }

  const calculatedTotal = calculatedSubtotal + deliveryFee;
  if (Math.abs(calculatedTotal - total) > 0.01) {
    console.error('Order total mismatch');
    return false;
  }

  return true;
}
