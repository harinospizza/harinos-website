
export enum Category {
  PIZZA = 'Pizza',
  MOMOS_FRIES = 'Momos & Fries',
  BURGERS = 'Burgers',
  SIDES = 'Side-Orders',
  BEVERAGES = 'Beverages'
}

export interface SizeOption {
  label: string; 
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; 
  category: Category;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian: true;
  available: boolean;
  sizes?: SizeOption[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  category?: Category;
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
  discountedPrice: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  orderType: OrderType;
  deliveryFee?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type OrderType = 'takeaway' | 'delivery';
