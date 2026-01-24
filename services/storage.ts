
import { Order, CartItem } from '../types';

const KEYS = {
  LOYALTY: 'harinos_loyalty_points',
  ORDERS: 'harinos_past_orders',
  CART: 'harinos_current_cart',
};

export const StorageService = {
  getLoyaltyPoints: (): number => {
    const saved = localStorage.getItem(KEYS.LOYALTY);
    return saved ? parseInt(saved) : 0;
  },
  addLoyaltyPoints: (points: number) => {
    const current = StorageService.getLoyaltyPoints();
    localStorage.setItem(KEYS.LOYALTY, (current + points).toString());
  },
  getPastOrders: (): Order[] => {
    const saved = localStorage.getItem(KEYS.ORDERS);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
  saveOrder: (order: Order) => {
    const orders = StorageService.getPastOrders();
    const updatedOrders = [order, ...orders].slice(0, 20); // Keep last 20 orders
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(updatedOrders));
  },
  getCart: (): CartItem[] => {
    const saved = localStorage.getItem(KEYS.CART);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  }
};
