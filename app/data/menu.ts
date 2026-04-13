import { MenuCategory, MenuItem } from '@/app/types';

export const menuCategories: MenuCategory[] = [
  {
    id: 'signature-pasta',
    name: 'Signature Pasta',
    description: 'Our chef\'s masterpiece creations',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  },
];

export const menuItems: MenuItem[] = [
  // Signature Pasta

  {
    id: 'lobster-linguine',
    name: 'Lobster Linguine',
    description: 'Succulent Maine lobster tail over linguine in a rich bisque cream sauce with cherry tomatoes and fresh basil.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    category: 'signature-pasta',
    isPopular: true,
    isNew: true,
    spicyLevel: 0,
    allergens: ['gluten', 'dairy', 'shellfish'],
    preparationTime: '25 min',
  },
  {
    id: 'wagyu-ragu',
    name: 'Wagyu Beef Ragù',
    description: 'Slow-braised Wagyu beef ragù over fresh pappardelle, topped with pecorino Romano and fresh herbs.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    category: 'signature-pasta',
    isPopular: true,
    spicyLevel: 0,
    allergens: ['gluten', 'dairy'],
    preparationTime: '22 min',
  },
  // Classic Italian
  {
    id: 'fettuccine-alfredo',
    name: 'Fettuccine Alfredo',
    description: 'Silky fettuccine in our signature creamy Alfredo sauce with aged Parmigiano-Reggiano.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
    category: 'classic-italian',
    spicyLevel: 0,
    allergens: ['gluten', 'dairy'],
    preparationTime: '15 min',
  },
  {
    id: 'penne-arrabbiata',
    name: 'Penne all\'Arrabbiata',
    description: 'Penne pasta in a spicy tomato sauce with garlic, red chili flakes, and fresh parsley.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=800&q=80',
    category: 'classic-italian',
    spicyLevel: 2,
    allergens: ['gluten'],
    preparationTime: '18 min',
  },
  {
    id: 'lasagna-bolognese',
    name: 'Lasagna Bolognese',
    description: 'Layers of fresh pasta, slow-cooked Bolognese, béchamel, and melted mozzarella.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80',
    category: 'classic-italian',
    isPopular: true,
    spicyLevel: 0,
    allergens: ['gluten', 'dairy', 'eggs'],
    preparationTime: '25 min',
  },
  {
    id: 'linguine-vongole',
    name: 'Linguine alle Vongole',
    description: 'Fresh littleneck clams sautéed with garlic, white wine, and parsley over linguine.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    category: 'seafood-pasta',
    isPopular: true,
    spicyLevel: 0,
    allergens: ['gluten', 'shellfish'],
    preparationTime: '20 min',
  },
  {
    id: 'seafood-fra-diavolo',
    name: 'Seafood Fra Diavolo',
    description: 'Spicy tomato sauce with mussels, clams, shrimp, and calamari over spaghetti.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    category: 'seafood-pasta',
    isNew: true,
    spicyLevel: 3,
    allergens: ['gluten', 'shellfish'],
    preparationTime: '25 min',
  },
  // Appetizers
  {
    id: 'bruschetta',
    name: 'Bruschetta Classica',
    description: 'Toasted ciabatta topped with fresh tomatoes, basil, garlic, and extra virgin olive oil.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80',
    category: 'appetizers',
    spicyLevel: 0,
    allergens: ['gluten'],
    preparationTime: '8 min',
  },
  {
    id: 'calamari-fritti',
    name: 'Calamari Fritti',
    description: 'Crispy fried calamari served with marinara sauce and lemon aioli.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    category: 'appetizers',
    isPopular: true,
    spicyLevel: 0,
    allergens: ['gluten', 'shellfish', 'eggs'],
    preparationTime: '12 min',
  },
  {
    id: 'arancini',
    name: 'Arancini',
    description: 'Crispy risotto balls stuffed with mozzarella and peas, served with tomato sauce.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80',
    category: 'appetizers',
    spicyLevel: 0,
    allergens: ['gluten', 'dairy'],
    preparationTime: '10 min',
  },
  {
    id: 'burrata-salad',
    name: 'Burrata Caprese',
    description: 'Creamy burrata with heirloom tomatoes, fresh basil, and aged balsamic drizzle.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
    category: 'appetizers',
    isNew: true,
    spicyLevel: 0,
    allergens: ['dairy'],
    preparationTime: '8 min',
  },
  // Desserts
  {
    id: 'tiramisu',
    name: 'Classic Tiramisù',
    description: 'Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone cream.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    category: 'desserts',
    isPopular: true,
    allergens: ['dairy', 'eggs', 'gluten'],
    preparationTime: '5 min',
  },
  {
    id: 'panna-cotta',
    name: 'Panna Cotta',
    description: 'Silky vanilla bean panna cotta with fresh berry compote.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    category: 'desserts',
    allergens: ['dairy'],
    preparationTime: '5 min',
  },
  {
    id: 'cannoli',
    name: 'Sicilian Cannoli',
    description: 'Crispy pastry shells filled with sweet ricotta, chocolate chips, and pistachios.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?w=800&q=80',
    category: 'desserts',
    allergens: ['dairy', 'gluten', 'nuts'],
    preparationTime: '5 min',
  },
  // Beverages
  {
    id: 'italian-soda',
    name: 'Italian Soda',
    description: 'Sparkling water with choice of fruit syrup and fresh citrus.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    category: 'beverages',
    preparationTime: '3 min',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Rich, authentic Italian espresso from freshly roasted beans.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80',
    category: 'beverages',
    preparationTime: '3 min',
  },
  {
    id: 'limoncello',
    name: 'Limoncello',
    description: 'Traditional Italian lemon liqueur, served chilled.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?w=800&q=80',
    category: 'beverages',
    preparationTime: '2 min',
  },
];

export const featuredDishes = menuItems.filter(item => item.isPopular).slice(0, 6);

export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter(item => item.category === categoryId);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}

export function searchMenuItems(query: string): MenuItem[] {
  const lowercaseQuery = query.toLowerCase();
  return menuItems.filter(
    item =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
  );
}
