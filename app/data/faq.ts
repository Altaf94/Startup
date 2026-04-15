import { FAQ } from '@/app/types';

export const faqs: FAQ[] = [
  // Ordering
  {
    id: 'faq-1',
    question: 'How do I place an order online?',
    answer: 'Simply browse our menu, add items to your cart, and proceed to checkout. You can choose delivery, enter your details, and select your preferred payment method. Once confirmed, you\'ll receive an order ID to track your order.',
    category: 'ordering',
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery for orders within our delivery zones.',
    category: 'ordering',
  },
  {
    id: 'faq-3',
    question: 'Can I modify or cancel my order?',
    answer: 'You can modify or cancel your order within 5 minutes of placing it. Please contact us immediately at 0337 3594376 or through WhatsApp. Once the kitchen starts preparing your order, modifications may not be possible.',
    category: 'ordering',
  },
  {
    id: 'faq-4',
    question: 'What is the minimum order for delivery?',
    answer: 'The minimum order for delivery is $25. Orders over $40 qualify for free delivery within our delivery zone.',
    category: 'ordering',
  },
  // Delivery
  {
    id: 'faq-5',
    question: 'What are your delivery areas and fees?',
    answer: 'We deliver within a 5-mile radius of our cloud kitchen in Karachi. Delivery fee is $4.99 for orders under $40, and free for orders over $40. We cover most major areas of Karachi.',
    category: 'delivery',
  },
  {
    id: 'faq-6',
    question: 'How long does delivery take?',
    answer: 'Typical delivery time is 30-45 minutes, depending on your location and order complexity. During peak hours (6-8 PM), delivery may take up to 60 minutes. You can track your order in real-time using your order ID.',
    category: 'delivery',
  },
  {
    id: 'faq-7',
    question: 'Do you offer contactless delivery?',
    answer: 'Yes! You can request contactless delivery at checkout. Our driver will leave your order at your door and notify you via text message.',
    category: 'delivery',
  },
  // Menu & Food
  {
    id: 'faq-8',
    question: 'Do you have vegetarian or vegan options?',
    answer: 'Yes, we offer several vegetarian pasta options including our Fettuccine Alfredo and Penne Arrabbiata. For vegan options, we can prepare most pasta dishes with olive oil and fresh vegetables. Please mention your dietary requirements when ordering.',
    category: 'menu',
  },
  {
    id: 'faq-9',
    question: 'How do you handle food allergies?',
    answer: 'All our menu items list common allergens (gluten, dairy, nuts, shellfish, eggs). If you have a severe allergy, please call us directly before ordering so we can ensure your meal is prepared safely.',
    category: 'menu',
  },
  {
    id: 'faq-10',
    question: 'Are your pastas made fresh?',
    answer: 'Yes! All our signature pastas are made fresh daily in-house. We use premium semolina flour and traditional Italian techniques to ensure authentic flavor and texture.',
    category: 'menu',
  },
  // Dining (now Pickup/Delivery)
  {
    id: 'faq-11',
    question: 'Do you offer catering services?',
    answer: 'Yes, we offer catering services for events and gatherings. Our cloud kitchen can prepare large quantities of authentic Italian dishes. Contact us at least 48 hours in advance for catering orders and custom menu options.',
    category: 'dining',
  },
  {
    id: 'faq-12',
    question: 'Can I place a large order for pickup?',
    answer: 'Absolutely! We welcome large orders for pickup. For orders serving 10+ people, please call us in advance at 0337 3594376 to ensure we have adequate preparation time and can accommodate your needs.',
    category: 'dining',
  },
  // Rewards & Offers
  {
    id: 'faq-13',
    question: 'How does the loyalty program work?',
    answer: 'Earn 1 point for every $1 spent. Accumulate 100 points to receive a $10 reward. Sign up for our newsletter to join automatically and receive exclusive member-only offers.',
    category: 'rewards',
  },
  {
    id: 'faq-14',
    question: 'Can I use multiple promo codes?',
    answer: 'Only one promo code can be applied per order. Our system will automatically apply the code that gives you the best discount if you\'re eligible for multiple offers.',
    category: 'rewards',
  },
  // General
  {
    id: 'faq-15',
    question: 'What are your opening hours?',
    answer: 'Our cloud kitchen operates weekends from 1 PM to 12 AM (Saturday and Sunday). Orders can be placed anytime during these hours for immediate preparation and delivery.',
    category: 'general',
  },
];

export const faqCategories = [
  { id: 'all', name: 'All Questions' },
  { id: 'ordering', name: 'Ordering' },
  { id: 'delivery', name: 'Delivery' },
  { id: 'menu', name: 'Menu & Food' },
  { id: 'dining', name: 'Catering & Large Orders' },
  { id: 'rewards', name: 'Rewards & Offers' },
  { id: 'general', name: 'General' },
];
