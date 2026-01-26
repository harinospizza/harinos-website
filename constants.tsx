
import { MenuItem, Category, Offer } from './types';

export const OFFERS: Offer[] = [
  {
    id: 'off1',
    title: 'Veggie Fiesta',
    description: 'Flat 10% OFF on all Pizzas!',
    discountPercentage: 10,
    category: Category.PIZZA
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- PIZZAS: 1. Margherita Series ---
  {
    id: 'p1_co',
    name: "Cheese & Onion Pizza",
    description: "Classic hand-stretched pizza topped with premium mozzarella and fresh red onions.",
    price: 99,
    category: Category.PIZZA,
    image: "/images/cheeseonion.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 99 }, { label: 'Medium', price: 219 }, { label: 'Large', price: 329 }]
  },
  {
    id: 'p1_t',
    name: "Cheese & Tomato",
    description: "Your choice of juicy tomatoes or crisp capsicum with a double layer of cheese.",
    price: 119,
    category: Category.PIZZA,
    image: "/images/cheesetomato.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 119 }, { label: 'Medium', price: 239 }, { label: 'Large', price: 349 }]
  },
  {
    id: 'p1_cap',
    name: "Cheese & Capsicum",
    description: "Your choice of crisp capsicum with a double layer of cheese.",
    price: 119,
    category: Category.PIZZA,
    image: "/images/cheesecap.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 119 }, { label: 'Medium', price: 239 }, { label: 'Large', price: 349 }]
  },
  {
    id: 'p1_corn',
    name: "Cheese & Corn",
    description: "Sweet golden corn smothered in mozzarella.",
    price: 129,
    category: Category.PIZZA,
    image: "/images/sweetcorn.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 129 }, { label: 'Medium', price: 259 }, { label: 'Large', price: 369 }]
  },
  {
    id: 'p1_p',
    name: "Cheese & Paneer",
    description: "Soft paneer chunks smothered in mozzarella.",
    price: 129,
    category: Category.PIZZA,
    image: "/images/cheesepaneer.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 129 }, { label: 'Medium', price: 259 }, { label: 'Large', price: 369 }]
  },


  // --- PIZZAS: 2. Paneer Special Pizzas ---
  {
    id: 'p2_tp',
    name: "Tandoori Paneer (Paneer + Onion)",
    description: "Smoky tandoori marinated paneer with grilled onions.",
    price: 149,
    category: Category.PIZZA,
    image: "/images/tanduripaneer.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 149 }, { label: 'Medium', price: 289 }, { label: 'Large', price: 409 }]
  },
  {
    id: 'p2_pm',
    name: "Paneer Masala (Paneer + Olives)",
    description: "Masala spiced paneer chunks paired with tangy black olives.",
    price: 149,
    category: Category.PIZZA,
    image: "/images/paneermasala.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 149 }, { label: 'Medium', price: 289 }, { label: 'Large', price: 409 }]
  },
  {
    id: 'p2_tkp',
    name: "Teekha Paneer (Paneer + Red Paprika)",
    description: "Spicy paneer pizza for those who love a hot kick.",
    price: 149,
    category: Category.PIZZA,
    image: "/images/teekhapaneer.jpeg",
    vegetarian: true,
    available: true,
    spicy: true,
    sizes: [{ label: 'Regular', price: 149 }, { label: 'Medium', price: 289 }, { label: 'Large', price: 409 }]
  },
  {
    id: 'p2_up',
    name: "Ultimate Paneer (Paneer + Corn)",
    description: "The dream combo of grilled paneer and sweet corn.",
    price: 159,
    category: Category.PIZZA,
    image: "/images/ultimatepaneer.jpeg",
    vegetarian: true,
    available: true,
    popular: true,
    sizes: [{ label: 'Regular', price: 159 }, { label: 'Medium', price: 299 }, { label: 'Large', price: 419 }]
  },

  // --- PIZZAS: 3. Veg Special Pizzas ---
  {
    id: 'p3_mt',
    name: "Masala Twist (Veg + Jalapeno)",
    description: "Mixed veggies with a spicy jalapeno twist.",
    price: 169,
    category: Category.PIZZA,
    image: "/images/masala.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 169 }, { label: 'Medium', price: 289 }, { label: 'Large', price: 409 }]
  },
  {
    id: 'p3_vo',
    name: "Veg Overloaded",
    description: "A mountain of fresh vegetables, olives, and extra cheese.",
    price: 169,
    category: Category.PIZZA,
    image: "/images/vegover.jpeg",
    vegetarian: true,
    available: true,
    popular: true,
    sizes: [{ label: 'Regular', price: 169 }, { label: 'Medium', price: 299 }, { label: 'Large', price: 429 }]
  },
  {
    id: 'p3_bp',
    name: "Bomb Pizza",
    description: "Explosive flavors with a special house-spice blend and veggies.",
    price: 169,
    category: Category.PIZZA,
    image: "/images/bomb.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 169 }, { label: 'Medium', price: 289 }, { label: 'Large', price: 409 }]
  },

  // --- PIZZAS: 4. Crunch & Fusion ---
  {
    id: 'p4_mc',
    name: "Mighty Crunch (Onion + Tomato)",
    description: "Extra crunchy base with your choice of onion & tomato toppings.",
    price: 139,
    category: Category.PIZZA,
    image: "/images/mightycrunch.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 139 }, { label: 'Medium', price: 279 }, { label: 'Large', price: 379 }]
  },
  {
    id: 'p4_cs',
    name: "Chilli Shot (Onion + Capsicum)",
    description: "Hot chilli infused base with crunchy onion & capsicum.",
    price: 139,
    category: Category.PIZZA,
    image: "/images/chillishot.jpeg",
    vegetarian: true,
    available: true,
    spicy: true,
    sizes: [{ label: 'Regular', price: 139 }, { label: 'Medium', price: 279 }, { label: 'Large', price: 379 }]
  },
  {
    id: 'p4_vl',
    name: "Veggie Lover",
    description: "The absolute favorite for vegetable enthusiasts.",
    price: 139,
    category: Category.PIZZA,
    image: "/images/veglover.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 139 }, { label: 'Medium', price: 259 }, { label: 'Large', price: 379 }]
  },

  // --- PIZZAS: 5. Harino's Special ---
  {
    id: 'p_hs',
    name: "Harino's Special",
    description: "The ultimate signature masterpiece loaded with premium paneer, golden corn, tangy olives, and secret house spices. Truly because Hari knows best!",
    price: 219,
    category: Category.PIZZA,
    image: "/images/hari.jpeg",
    vegetarian: true,
    available: true,
    popular: true,
    sizes: [{ label: 'Regular', price: 219 }, { label: 'Medium', price: 349 }, { label: 'Large', price: 499 }]
  },

  // --- MOMOS ---
  {
    id: 'm1_v',
    name: "Veg Steam Momos",
    description: "Delicate steamed veggie dumplings.",
    price: 40,
    category: Category.MOMOS_FRIES,
    image: "/images/steammomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 40 }, { label: 'Full', price: 60 }]
  },
  {
    id: 'm1_s',
    name: "Soya Steam Momos",
    description: "Steamed momos with protein-rich soya filling.",
    price: 30,
    category: Category.MOMOS_FRIES,
    image: "/images/steammomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 30 }, { label: 'Full', price: 50 }]
  },
  {
    id: 'm2_v',
    name: "Veg Fried Momos",
    description: "Crispy fried vegetable dumplings.",
    price: 40,
    category: Category.MOMOS_FRIES,
    image: "/images/friedmomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 40 }, { label: 'Full', price: 60 }]
  },
  {
    id: 'm2_s',
    name: "Soya Fried Momos",
    description: "Golden fried soya dumplings.",
    price: 30,
    category: Category.MOMOS_FRIES,
    image: "/images/friedmomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 30 }, { label: 'Full', price: 50 }]
  },
  {
    id: 'm3_v',
    name: "Veg Tandoori Momos",
    description: "Grilled veg momos in tandoori marinade.",
    price: 50,
    category: Category.MOMOS_FRIES,
    image: "/images/tandurimomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 50 }, { label: 'Full', price: 70 }]
  },
  {
    id: 'm3_s',
    name: "Soya Tandoori Momos",
    description: "Smoky tandoori soya momos.",
    price: 40,
    category: Category.MOMOS_FRIES,
    image: "/images/tandurimomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 40 }, { label: 'Full', price: 60 }]
  },
  {
    id: 'm4_v',
    name: "Veg Cheese Momos",
    description: "Veg momos with a liquid cheese heart.",
    price: 70,
    category: Category.MOMOS_FRIES,
    image: "/images/cheesemomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 100 }]
  },
  {
    id: 'm4_s',
    name: "Soya Cheese Momos",
    description: "Soya momos stuffed with cheese.",
    price: 60,
    category: Category.MOMOS_FRIES,
    image: "/images/cheesemomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 90 }]
  },
  {
    id: 'm5_v',
    name: "Veg Crunchy Momos",
    description: "Extra crispy breaded veg momos.",
    price: 70,
    category: Category.MOMOS_FRIES,
    image: "/images/crunchymomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 100 }]
  },
  {
    id: 'm5_s',
    name: "Soya Crunchy Momos",
    description: "Breaded crunchy soya dumplings.",
    price: 60,
    category: Category.MOMOS_FRIES,
    image: "/images/crunchymomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 90 }]
  },
  {
    id: 'm6_v',
    name: "Veg Gravy Momos",
    description: "Veg momos tossed in spicy house gravy.",
    price: 80,
    category: Category.MOMOS_FRIES,
    image: "/images/gravymomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 80 }, { label: 'Full', price: 120 }]
  },
  {
    id: 'm6_s',
    name: "Soya Gravy Momos",
    description: "Soya momos served in rich spicy gravy.",
    price: 70,
    category: Category.MOMOS_FRIES,
    image: "/images/gravymomos.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 110 }]
  },

  // --- FRIES ---
  {
    id: 'f_pp',
    name: "Peri Peri Fries",
    description: "Crispy fries with hot peri peri dust.",
    price: 50,
    category: Category.MOMOS_FRIES,
    image: "/images/periperi.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 50 }, { label: 'Full', price: 100 }]
  },
  {
    id: 'f_ch',
    name: "Cheese Fries",
    description: "Fries topped with melted cheese sauce.",
    price: 70,
    category: Category.MOMOS_FRIES,
    image: "/images/cheesefries.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 140 }]
  },
  {
    id: 'f_td',
    name: "Tandoori Fries",
    description: "Fries with a smoky tandoori sauce.",
    price: 70,
    category: Category.MOMOS_FRIES,
    image: "/images/tandurifries.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 140 }]
  },
  {
    id: 'f_vg',
    name: "Veggies Fries",
    description: "Loaded fries with fresh vegetable toppings.",
    price: 80,
    category: Category.MOMOS_FRIES,
    image: "/images/vegifries.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 80 }, { label: 'Full', price: 160 }]
  },
    {
    id: 'f_inferno',
    name: "Inferno Fries",
    description: "Loaded fries with fresh vegetable toppings.",
    price: 80,
    category: Category.MOMOS_FRIES,
    image: "/images/infernofries.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 80 }, { label: 'Full', price: 160 }]
  },

  // --- BURGERS ---
  { id: 'b_tk', name: "Tikka Burger", description: "Spicy tikka patty with premium mayo.", price: 40, category: Category.BURGERS, image: "/images/tikkaburgar.jpeg", vegetarian: true, available: true },
  { id: 'b_cl', name: "Classic Burger", description: "The original veg burger experience.", price: 50, category: Category.BURGERS, image: "/images/classicburger.jpeg", vegetarian: true, available: true },
  { id: 'b_ch', name: "Cheese Burger", description: "Classic burger with extra cheese slice.", price: 60, category: Category.BURGERS, image: "/images/cheeseburger.jpeg", vegetarian: true, available: true },
  { id: 'b_pn', name: "Paneer Burger", description: "Fresh paneer slab with spicy sauce.", price: 60, category: Category.BURGERS, image: "/images/paneerburger.jpeg", vegetarian: true, available: true },
  { id: 'b_td', name: "Tandoori Burger", description: "Smoky tandoori patty burger.", price: 60, category: Category.BURGERS, image: "/images/tanduriburger.jpeg", vegetarian: true, available: true },
  { id: 'b_cp', name: "Cheese & Paneer Burger", description: "Double the joy with cheese and paneer.", price: 70, category: Category.BURGERS, image: "/images/cheesepaneerburger.jpeg", vegetarian: true, available: true },
  { id: 'b_in', name: "Inferno Burger", description: "Extremely spicy for the brave.", price: 70, category: Category.BURGERS, image: "/images/infernoburger.jpeg", vegetarian: true, available: true, spicy: true },
  { id: 'b_cv', name: "Veg Carnival Burger", description: "Jumbo burger loaded with everything.", price: 90, category: Category.BURGERS, image: "/images/vegcar.jpeg", vegetarian: true, available: true, popular: true },

  // --- SIDE ORDERS & SNACKS ---
  { id: 's_cl', name: "Choco Lava Cake", description: "Molten chocolate center cake.", price: 60, category: Category.SIDES, image: "/images/chocolava.jpeg", vegetarian: true, available: true },
  { id: 's_gb', name: "Garlic Bread", description: "Freshly baked garlic butter bread.", price: 80, category: Category.SIDES, image: "/images/garlicbread.jpeg", vegetarian: true, available: true },
  { id: 's_sg', name: "Stuffed Garlic Bread", description: "Loaded with cheese, corn, and onion.", price: 120, category: Category.SIDES, image: "/images/stuffed.jpeg", vegetarian: true, available: true },
  {
    id: 's_zp',
    name: "Zingi Parcel",
    description: "Paneer stuffed savory parcels.",
    price: 70,
    category: Category.SIDES,
    image: "/images/zingi.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 130 }]
  },
  {
    id: 's_cz',
    name: "Calzone",
    description: "Folded pizza pocket stuffed with toppings.",
    price: 70,
    category: Category.SIDES,
    image: "/images/calzone.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 130 }]
  },
  { id: 's_cp', name: "Chilli Potato", description: "Crispy honey chilli glazed potato fingers.", price: 90, category: Category.SIDES, image: "/images/chillipotato.jpeg", vegetarian: true, available: true },
  { id: 's_hp', name: "Honey Chilli Potato", description: "Sweet and spicy crispy potato snack.", price: 100, category: Category.SIDES, image: "/images/chillipotato.jpeg", vegetarian: true, available: true },

  // --- BEVERAGES ---
  {
    id: 'd_cc',
    name: "Cold Coffee",
    description: "Iced creamy coffee blend.",
    price: 70,
    category: Category.BEVERAGES,
    image: "/images/coldcoffee.jpeg",
    vegetarian: true,
    available: true,
    sizes: [{ label: 'Regular', price: 70 }, { label: 'Large', price: 100 }]
  },
  { id: 'd_vm', name: "Virgin Mojito", description: "Mint and lime refresher.", price: 100, category: Category.BEVERAGES, image: "/images/virgin.jpeg", vegetarian: true, available: false },
  { id: 'd_cm', name: "Curacao Mojito", description: "Blue orange citrus mojito.", price: 100, category: Category.BEVERAGES, image: "/images/blue.jpeg", vegetarian: true, available: false }
];

export const SYSTEM_INSTRUCTION = `
You are Harino's AI Assistant. 
TAGLINE: BECAUSE HARI KNOWS.
OUTLET: Harino's Pizza & Fast Food. 100% VEGETARIAN.
OFFICIAL WEBSITE: https://harinos.store
PRICES: All inclusive of 5% GST.

MENU HIGHLIGHTS FOR YOUR KNOWLEDGE:
- PIZZAS: Tiered pricing for Regular, Medium, Large. (Margherita, Paneer Special, Veg Special, Crunch & Fusion).
- SIGNATURE: Harino's Special Pizza (Regular ₹219, Medium ₹349, Large ₹499).
- MOMOS: Available in VEG and SOYA varieties. Pricing for HALF and FULL plates.
- SIDES: Includes Chilli Potato, Honey Chilli Potato, Zingi Parcel, and Calzone.
- BURGERS: 8 specialized varieties including the 'Veg Carnival'.

Help customers find their favorite vegetarian meal. If asked for a link, provide harinos.store.
`;
