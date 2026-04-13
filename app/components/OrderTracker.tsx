'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Search, 
  Package, 
  ChefHat, 
  CheckCircle2, 
  Truck, 
  Home,
  XCircle,
  Clock
} from 'lucide-react';
import { getOrderById } from '@/app/data/orders';
import { formatPrice, formatDateTime, getStatusColor, getStatusText, cn } from '@/app/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';
import type { Order, OrderStatus } from '@/app/types';

const statusSteps: { status: OrderStatus; icon: typeof Package; label: string }[] = [
  { status: 'confirmed', icon: Package, label: 'Confirmed' },
  { status: 'preparing', icon: ChefHat, label: 'Preparing' },
  { status: 'ready', icon: CheckCircle2, label: 'Ready' },
  { status: 'dispatched', icon: Truck, label: 'On The Way' },
  { status: 'delivered', icon: Home, label: 'Delivered' },
];

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundOrder = getOrderById(orderId.trim());
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError('Order not found. Please check your order ID and try again.');
      setOrder(null);
    }
    
    setIsLoading(false);
  };

  const getCurrentStatusIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex(step => step.status === order.status);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <motion.form
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        onSubmit={handleSearch}
        className="mb-12"
      >
        <label htmlFor="orderId" className="block text-lg font-semibold text-gray-900 mb-3">
          Enter Your Order ID
        </label>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., BP-2024-001234"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !orderId.trim()}
            className={cn(
              'px-8 py-4 rounded-xl font-semibold transition-all',
              isLoading || !orderId.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            )}
          >
            {isLoading ? 'Searching...' : 'Track Order'}
          </button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-red-600 flex items-center space-x-2"
          >
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.p>
        )}
        <p className="mt-3 text-gray-500 text-sm">
          Try these sample IDs: TSP-2024-001234, TSP-2024-001235, TSP-2024-001236
        </p>
      </motion.form>

      {/* Order Details */}
      {order && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Status Timeline */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
              <span className={cn(
                'px-4 py-2 rounded-full text-white text-sm font-medium',
                getStatusColor(order.status)
              )}>
                {getStatusText(order.status)}
              </span>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="flex justify-between items-center">
                {statusSteps.map((step, index) => {
                  const currentIndex = getCurrentStatusIndex();
                  const isCompleted = index <= currentIndex;
                  const isCurrent = index === currentIndex;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.status}
                      className={cn(
                        'flex flex-col items-center relative z-10',
                        index < statusSteps.length - 1 && 'flex-1'
                      )}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center mb-2',
                          isCompleted
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-200 text-gray-400',
                          isCurrent && 'ring-4 ring-amber-200'
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className={cn(
                        'text-xs font-medium text-center',
                        isCompleted ? 'text-amber-600' : 'text-gray-400'
                      )}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(getCurrentStatusIndex() / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-full bg-amber-500"
                />
              </div>
            </div>

            {/* Estimated Delivery */}
            {order.estimatedDelivery && order.status !== 'delivered' && (
              <motion.div
                variants={staggerItem}
                className="mt-8 p-4 bg-amber-50 rounded-xl flex items-center space-x-3"
              >
                <Clock className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">
                    Estimated {order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Time
                  </p>
                  <p className="text-lg font-bold text-amber-900">
                    {formatDateTime(order.estimatedDelivery)}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-500">{formatDateTime(event.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Details</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-amber-600">{formatPrice(order.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Customer Info */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {order.deliveryType === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Name</p>
                <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <p className="font-medium">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-medium">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Order Type</p>
                <p className="font-medium capitalize">{order.deliveryType}</p>
              </div>
              {order.deliveryType === 'delivery' && order.customer.address && (
                <div className="sm:col-span-2">
                  <p className="text-gray-500 mb-1">Address</p>
                  <p className="font-medium">
                    {order.customer.address}, {order.customer.city} {order.customer.zipCode}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Initial State */}
      {!order && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Order</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter your order ID above to track your order status in real-time. 
            You can find your order ID in your confirmation email.
          </p>
        </motion.div>
      )}
    </div>
  );
}
