import { MenuCategory, MenuItem } from '@/app/types';

export const menuCategories: MenuCategory[] = [
  {
    id: 'classic-pasta',
    name: 'Classic Pasta',
    description: 'Timeless pasta dishes crafted with fresh ingredients',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
  },
  {
    id: 'chefs-specials',
    name: "Chef's Specials",
    description: 'Exclusive creations from our head chef',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  },
  {
    id: 'chicken-pasta',
    name: 'Chicken Pasta',
    description: 'Bold pasta dishes featuring tender chicken',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80',
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    description: 'Soft handmade ravioli with indulgent fillings and sauces',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'roasted-red-pepper-fettuccine',
    name: 'Roasted Red Pepper & Sundried Tomato Fettuccine',
    description: 'Silky roasted red pepper cream sauce blended with sundried tomatoes, spinach, and sautéed mushrooms. A rich, smoky-sweet pasta with a velvety finish.',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
    category: 'classic-pasta',
  },
  {
    id: 'fettuccine-alfredo-classico',
    name: 'Fettuccine Alfredo Classico',
    description: 'A timeless Italian favorite featuring fresh fettuccine tossed in a smooth butter cream sauce enriched with aged parmesan. Simple, elegant, and deeply comforting.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    category: 'classic-pasta',
    isPopular: true,
  },
  {
    id: 'sicilian-sun-pesto-linguine',
    name: 'Sicilian Sun Pesto Linguine',
    description: 'Linguine tossed in a creamy Sicilian basil and sun-dried tomato pesto, blended with roasted tomato sauce, garlic, and sautéed mushrooms. Finished with parmesan and toasted pine nuts for a rich Mediterranean flavor.',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    category: 'chefs-specials',
    isNew: true,
  },
  {
    id: 'creamy-pesto-penne-al-basilico',
    name: 'Creamy Pesto Penne al Basilico',
    description: 'Penne pasta coated in a rich basil pesto cream sauce, finished with fresh parsley. Herb-forward, creamy, and perfectly balanced for pesto lovers.',
    price: 1050,
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=800&q=80',
    category: 'classic-pasta',
  },
  {
    id: 'tuscan-spaghetti-flame-chicken',
    name: 'Tuscan Spaghetti Flame Chicken',
    description: 'Tender chicken simmered with sundried tomatoes and spinach in a creamy parmesan sauce. A bold Tuscan-inspired dish with deep, rustic flavor.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    category: 'chefs-specials',
    isNew: true,
    isPopular: true,
  },
  {
    id: 'fiery-chicken-arrabbiata-penne',
    name: 'Fiery Chicken Arrabbiata Penne',
    description: 'A bold Roman classic—garlic, olive oil, and crushed chilies in a spicy roasted tomato sauce, tossed with tender chicken chunks for a fiery kick.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80',
    category: 'chicken-pasta',
    isPopular: true,
    spicyLevel: 2,
  },
  {
    id: 'aglio-olio-spaghetti-ravioli-bites',
    name: 'Aglio Olio Spaghetti with Crispy Ravioli Bites',
    description: 'Classic garlic and olive oil spaghetti paired with golden crispy fried mushroom cheese ravioli bites. A fusion of simplicity and indulgent crunch.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80',
    category: 'classic-pasta',
  },
  {
    id: 'spinach-cheese-ravioli-mushroom-pesto',
    name: 'Spinach & Cheese Ravioli in Creamy Mushroom Pesto',
    description: 'Soft ravioli filled with spinach and cheese, tossed in a creamy mushroom pesto sauce. Earthy, rich, and luxuriously smooth.',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80',
    category: 'ravioli',
  },
  {
    id: 'crimson-chicken-ravioli',
    name: 'Crimson Chicken Ravioli',
    description: 'Delicate chicken-filled ravioli served in a slow-simmered marinara sauce. A comforting, rich tomato-based classic.',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
    category: 'ravioli',
  },
  {
    id: 'spaghetti-pollo-fiorentina',
    name: 'Spaghetti Pollo alla Fiorentina Cream Pasta',
    description: 'A refined Florentine-style pasta featuring chicken, spinach, and sundried tomatoes in a velvety cream reduction, finished with aged parmesan for depth and richness.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    category: 'chicken-pasta',
    isPopular: true,
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
