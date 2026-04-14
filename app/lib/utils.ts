// Format price as currency
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format time
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

// Format date and time together
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Generate star rating display
export function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (supports Pakistani and US formats)
export function isValidPhone(phone: string): boolean {
  // Pakistani formats: +923XXXXXXXXX or 03XXXXXXXXX (11 digits)
  // US format: (XXX) XXX-XXXX or XXX-XXX-XXXX (10 digits)
  const phoneRegex = /^(\+92[0-9]{10}|03[0-9]{9}|\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4}))$/;
  return phoneRegex.test(phone.replace(/\s/g, '')); // Remove spaces for validation
}

// Format phone number
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  // Pakistani format: +92 3XX XXXXXXX
  if (cleaned.startsWith('92') && cleaned.length === 12) {
    return `+92 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
  }

  // Pakistani format: 03XX XXXXXXX
  if (cleaned.startsWith('03') && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
  }

  // US format: (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

// Calculate estimated delivery time
export function getEstimatedDelivery(minutes: number = 45): string {
  const now = new Date();
  const delivery = new Date(now.getTime() + minutes * 60000);
  return formatTime(delivery.toISOString());
}

// Get order status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    confirmed: 'bg-blue-500',
    preparing: 'bg-yellow-500',
    ready: 'bg-orange-500',
    dispatched: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  };
  return colors[status] || 'bg-gray-500';
}

// Get order status text
export function getStatusText(status: string): string {
  const texts: Record<string, string> = {
    confirmed: 'Order Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    dispatched: 'On The Way',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  return texts[status] || status;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Class names utility (simple classnames alternative)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Get spicy level label
export function getSpicyLabel(level: number): string {
  const labels: Record<number, string> = {
    0: '',
    1: 'Mild',
    2: 'Medium',
    3: 'Hot',
  };
  return labels[level] || '';
}

// Generate WhatsApp order link
export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
