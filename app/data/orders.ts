import { Order } from '@/app/types';

// Sample orders for demonstration/testing
export const sampleOrders: Order[] = [
  {
    id: 'TSP-2024-001234',
    items: [
      {
        id: 'tiramisu',
        name: 'Classic Tiramisù',
        description: 'Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone cream.',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
        category: 'desserts',
        quantity: 1,
      },
    ],
    customer: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(212) 555-1234',
      address: '123 Test Street, Apt 4B',
      city: 'New York',
      zipCode: '10001',
      deliveryInstructions: 'Ring doorbell twice',
    },
    deliveryType: 'delivery',
    paymentMethod: 'credit_card',
    status: 'dispatched',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2024-01-15T18:30:00Z',
        description: 'Order confirmed and sent to kitchen',
      },
      {
        status: 'preparing',
        timestamp: '2024-01-15T18:35:00Z',
        description: 'Chef is preparing your order',
      },
      {
        status: 'ready',
        timestamp: '2024-01-15T18:55:00Z',
        description: 'Order is ready for pickup',
      },
      {
        status: 'dispatched',
        timestamp: '2024-01-15T19:00:00Z',
        description: 'Driver is on the way',
      },
    ],
    subtotal: 68.97,
    deliveryFee: 150,
    discount: 0,
    total: 7247,
    createdAt: '2024-01-15T18:30:00Z',
    estimatedDelivery: '2024-01-15T19:30:00Z',
  },
  {
    id: 'TSP-2024-001235',
    items: [
      {
        id: 'spaghetti-carbonara',
        name: 'Spaghetti Carbonara',
        description: 'Traditional Roman recipe with guanciale, pecorino Romano, eggs, and fresh cracked black pepper.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
        category: 'classic-italian',
        quantity: 1,
      },
      {
        id: 'bruschetta',
        name: 'Bruschetta Classica',
        description: 'Toasted ciabatta topped with fresh tomatoes, basil, garlic, and extra virgin olive oil.',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80',
        category: 'appetizers',
        quantity: 1,
      },
    ],
    customer: {
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.j@email.com',
      phone: '(718) 555-5678',
    },
    deliveryType: 'delivery',
    paymentMethod: 'debit_card',
    status: 'delivered',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2024-01-14T12:00:00Z',
        description: 'Order confirmed and sent to kitchen',
      },
      {
        status: 'preparing',
        timestamp: '2024-01-14T12:05:00Z',
        description: 'Chef is preparing your order',
      },
      {
        status: 'ready',
        timestamp: '2024-01-14T12:20:00Z',
        description: 'Order is ready for pickup',
      },
      {
        status: 'delivered',
        timestamp: '2024-01-14T12:35:00Z',
        description: 'Order picked up by customer',
      },
    ],
    subtotal: 28.98,
    deliveryFee: 0,
    discount: 5.80,
    total: 23.18,
    createdAt: '2024-01-14T12:00:00Z',
  },
  {
    id: 'TSP-2024-001236',
    items: [
      {
        id: 'lobster-linguine',
        name: 'Lobster Linguine',
        description: 'Succulent Maine lobster tail over linguine in a rich bisque cream sauce.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
        category: 'signature-pasta',
        quantity: 1,
      },
    ],
    customer: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '(212) 555-9999',
      address: '456 Park Avenue, Suite 1200',
      city: 'New York',
      zipCode: '10022',
    },
    deliveryType: 'delivery',
    paymentMethod: 'wallet',
    status: 'preparing',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2024-01-15T19:45:00Z',
        description: 'Order confirmed and sent to kitchen',
      },
      {
        status: 'preparing',
        timestamp: '2024-01-15T19:50:00Z',
        description: 'Chef is preparing your order',
      },
    ],
    subtotal: 34.99,
    deliveryFee: 150,
    discount: 0,
    total: 184.99,
    createdAt: '2024-01-15T19:45:00Z',
    estimatedDelivery: '2024-01-15T20:30:00Z',
  },
];

// Function to get order by ID (simulates API call)
export function getOrderById(orderId: string): Order | undefined {
  return sampleOrders.find(order => order.id.toLowerCase() === orderId.toLowerCase());
}

// Function to generate a new order ID
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 900000) + 100000;
  return `TSP-${year}-${randomNum}`;
}
