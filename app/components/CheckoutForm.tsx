'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Banknote, 
  Truck, 
  Store,
  Check,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/app/lib/cart-context';
import { useLocation } from '@/app/lib/location-context';
import { formatPrice, cn, isValidEmail, isValidPhone, generateWhatsAppLink } from '@/app/lib/utils';
import { generateOrderId } from '@/app/data/orders';
import { fadeInUp, staggerContainer, staggerItem } from '@/app/lib/animations';
import type { PaymentMethod, CustomerDetails } from '@/app/types';

type CheckoutStep = 'details' | 'payment' | 'confirmation';

export default function CheckoutForm() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { selectedLocation } = useLocation();
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [customer, setCustomer] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: '',
  });

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!customer.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customer.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (customer.email.trim() && !isValidEmail(customer.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhone(customer.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!customer.address?.trim()) newErrors.address = 'Delivery address is required';
    if (!customer.city?.trim()) newErrors.city = 'City is required';
    if (!customer.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsSubmit = () => {
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    // TODO: Integrate real payment gateway here (Stripe, PayPal, etc.)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    // Prepare order data for notifications
    const orderData = {
      orderId: newOrderId,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      address: customer.address,
      city: customer.city,
      zipCode: customer.zipCode,
      location: selectedLocation,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        spicyLevel: item.spicyLevel,
      })),
      subtotal: formatPrice(subtotal),
      deliveryFee: formatPrice(deliveryFee),
      total: formatPrice(total),
      paymentMethod,
      deliveryInstructions: customer.deliveryInstructions,
    };

    // Send notifications via Email AND WhatsApp (in parallel)
    const sendNotification = async (endpoint: string, name: string) => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          console.error(`${name} API error:`, res.status, json);
        } else {
          console.log(`${name} API response:`, json);
        }
      } catch (error) {
        console.error(`Failed to send ${name} notification:`, error);
      }
    };

    // Send all notifications in parallel (Email, WhatsApp, Push)
    await Promise.all([
      sendNotification('/api/orders/notify-email', 'Email'),
      sendNotification('/api/orders/notify-whatsapp', 'WhatsApp'),
      sendNotification('/api/orders/notify-push', 'Push'),
    ]);

    clearCart();
    setStep('confirmation');
    setIsProcessing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
        <Link
          href="/menu"
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
        >
          <span>Browse Menu</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      {step !== 'confirmation' && (
        <div className="flex items-center justify-center space-x-4 mb-12">
          {['details', 'payment'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                  step === s || (step === 'payment' && s === 'details')
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {step === 'payment' && s === 'details' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={cn(
                'ml-2 font-medium hidden sm:inline',
                step === s ? 'text-amber-600' : 'text-gray-500'
              )}>
                {s === 'details' ? 'Details' : 'Payment'}
              </span>
              {i === 0 && (
                <div className="w-16 h-0.5 mx-4 bg-gray-200">
                  <div className={cn(
                    'h-full bg-amber-500 transition-all',
                    step === 'payment' ? 'w-full' : 'w-0'
                  )} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Customer Details */}
          {step === 'details' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
            >
              {/* Contact Info */}
              <motion.div variants={staggerItem} className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={customer.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                        errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                      )}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={customer.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                        errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                      )}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleInputChange}
                      placeholder="Email Address (Optional)"
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div variants={staggerItem} className="mb-8">
                <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="Please select your location"
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                          errors.address ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                        )}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City * 
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={customer.city}
                          onChange={handleInputChange}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                            errors.city ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                          )}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code 
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={customer.zipCode}
                          onChange={handleInputChange}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all',
                            errors.zipCode ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                          )}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea
                        name="deliveryInstructions"
                        value={customer.deliveryInstructions}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="E.g., Ring doorbell twice, leave on porch, etc."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </motion.div>

              {/* Continue Button */}
              <motion.div variants={staggerItem}>
                <button
                  onClick={handleDetailsSubmit}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
            >
              <motion.div variants={staggerItem} className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {[
                    { id: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={cn(
                        'w-full p-4 rounded-xl border-2 flex items-center space-x-4 transition-all text-left',
                        paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <method.icon className={cn(
                        'w-6 h-6',
                        paymentMethod === method.id ? 'text-amber-600' : 'text-gray-400'
                      )} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <Check className="w-5 h-5 text-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={staggerItem} className="flex gap-4">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className={cn(
                    'flex-1 py-4 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2',
                    isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 mb-6">
                Thank you for your order. We&apos;ve sent a confirmation email to {customer.email}
              </p>
              
              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-amber-800 mb-2">Your Order ID</p>
                <p className="text-2xl font-bold text-amber-600">{orderId}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/tracking?order=${orderId}`}
                  className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <span>Track Your Order</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step !== 'confirmation' && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-gray-400 text-xs">Set address</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-amber-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
