'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/app/lib/cart-context';
import { cn } from '@/app/lib/utils';

const pastas = ['Fettuccine', 'Penne', 'Spaghetti'];

const proteins = [
  { label: 'No Chicken (Vegetarian)', price: 0 },
  { label: 'Grilled Chicken', price: 250 },
];

const sauces = [
  { label: 'Alfredo Cream', heat: '🌶️' },
  { label: 'Pesto Cream', heat: '🌶️🌶️' },
  { label: 'Classic Marinara', heat: '🌶️🌶️🌶️' },
  { label: 'Spicy Cajun Cream', heat: '🌶️🌶️🌶️🌶️🌶️' },
];

const addOns = [
  { label: 'Mushrooms', price: 150 },
  { label: 'Spinach', price: 100 },
  { label: 'Sundried Tomatoes', price: 180 },
  { label: 'Extra Cheese', price: 200 },
  { label: 'Extra Chicken', price: 250 },
];

const BASE_PRICE = 950;

export default function PastaBowlBuilder() {
  const [pasta, setPasta] = useState<string>('Fettuccine');
  const [protein, setProtein] = useState<number>(0);
  const [sauce, setSauce] = useState<string>('Alfredo Cream');
  const [selected, setSelected] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const toggleAddOn = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const addOnTotal = selected.reduce((sum, label) => {
    const found = addOns.find((a) => a.label === label);
    return sum + (found?.price ?? 0);
  }, 0);

  const proteinPrice = proteins[protein].price;
  const total = BASE_PRICE + proteinPrice + addOnTotal;

  const description = [
    `Pasta: ${pasta}`,
    `Protein: ${proteins[protein].label}`,
    `Sauce: ${sauce}`,
    selected.length ? `Add-ons: ${selected.join(', ')}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const handleAddToCart = () => {
    addItem({
      id: `pasta-bowl-${Date.now()}`,
      name: 'Custom Pasta Bowl',
      description,
      price: total,
      image: '/images/logo.png',
      category: 'custom',
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8 space-y-5">
      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Step 1 – Pasta */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">1</span>
            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Choose Your Pasta</h3>
          </div>
          <p className="text-xs text-green-600 font-semibold mb-3 uppercase tracking-wide">Included</p>
          <ul className="space-y-2">
            {pastas.map((p) => (
              <li key={p}>
                <button
                  onClick={() => setPasta(p)}
                  className={cn(
                    'w-full flex items-center space-x-2 text-sm px-3 py-2 rounded-lg transition-colors text-left',
                    pasta === p
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-amber-50'
                  )}
                >
                  {pasta === p ? (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  )}
                  <span>{p}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Step 2 – Protein */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">2</span>
            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Choose Protein</h3>
          </div>
          <ul className="space-y-2">
            {proteins.map((pr, i) => (
              <li key={pr.label}>
                <button
                  onClick={() => setProtein(i)}
                  className={cn(
                    'w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors text-left',
                    protein === i
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-amber-50'
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {protein === i ? (
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    )}
                    <span>{pr.label}</span>
                  </div>
                  <span className={cn('text-xs font-bold ml-2', protein === i ? 'text-white' : 'text-amber-600')}>
                    {pr.price === 0 ? 'Free' : `+${pr.price}`}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Step 3 – Sauce */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">3</span>
            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Choose Sauce</h3>
          </div>
          <ul className="space-y-2">
            {sauces.map((s) => (
              <li key={s.label}>
                <button
                  onClick={() => setSauce(s.label)}
                  className={cn(
                    'w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors text-left',
                    sauce === s.label
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-amber-50'
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {sauce === s.label ? (
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    )}
                    <span>{s.label}</span>
                  </div>
                  <span className="text-xs">{s.heat}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Step 4 – Add-ons */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">4</span>
            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Add Ingredients</h3>
          </div>
          <ul className="space-y-2">
            {addOns.map((a) => (
              <li key={a.label}>
                <button
                  onClick={() => toggleAddOn(a.label)}
                  className={cn(
                    'w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors text-left',
                    selected.includes(a.label)
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-amber-50'
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {selected.includes(a.label) ? (
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    )}
                    <span>{a.label}</span>
                  </div>
                  <span className={cn('text-xs font-bold ml-2', selected.includes(a.label) ? 'text-white' : 'text-amber-600')}>
                    +{a.price}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-medium mb-1">Your Bowl Total</p>
          <p className="text-3xl font-extrabold text-gray-900">
            Rs. {total.toLocaleString()}
            <span className="text-base font-normal text-gray-500 ml-2">
              ({pasta} · {proteins[protein].label} · {sauce}
              {selected.length > 0 ? ` · ${selected.join(', ')}` : ''})
            </span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className={cn(
            'flex items-center space-x-2 px-10 py-4 font-bold rounded-full text-lg transition-all shadow-md hover:shadow-lg',
            added
              ? 'bg-green-500 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          )}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Basket</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
