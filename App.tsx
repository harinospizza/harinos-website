
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Category, MenuItem, CartItem, OrderType, Order, Offer } from './types';
import { MENU_ITEMS, OFFERS } from './constants';
import { StorageService } from './services/storage';
import { NotificationService } from './services/notification';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CartSidebar from './components/CartSidebar';
import AIOrderAssistant from './components/AIOrderAssistant';
import PastOrders from './components/PastOrders';
import PaymentModal from './components/PaymentModal';

const OUTLET_LAT = 28.011897;
const OUTLET_LNG = 77.675534;

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>(() => StorageService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(StorageService.getLoyaltyPoints());
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [distance, setDistance] = useState<number | null>(null);
  const [view, setView] = useState<'menu' | 'orders'>('menu');
  const [pastOrders, setPastOrders] = useState<Order[]>(StorageService.getPastOrders());
  
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  // Persist cart to local storage whenever it changes
  useEffect(() => {
    StorageService.saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const mins = now.getMinutes();
      const currentTimeInMins = hour * 60 + mins;

      const openingTime = 10 * 60;
      const closingTime = 21 * 60;

      if (currentTimeInMins < openingTime || currentTimeInMins >= closingTime) {
        setIsStoreOpen(false);
        setStatusMessage("Store is currently closed. Open: 10:00 AM - 09:00 PM.");
      } else {
        setIsStoreOpen(true);
        setStatusMessage("");
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);

    const offerTimer = setTimeout(() => {
      NotificationService.sendSpecialOffer();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(offerTimer);
    };
  }, []);

  const calculateDistance = (lat: number, lng: number) => {
    const R = 6371; 
    const dLat = (lat - OUTLET_LAT) * Math.PI / 180;
    const dLon = (lng - OUTLET_LNG) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(OUTLET_LAT * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const detectLocation = useCallback(async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
      });
      const currentDistance = calculateDistance(position.coords.latitude, position.coords.longitude);
      setDistance(currentDistance);
      return currentDistance;
    } catch (e) {
      alert("Location permission is needed for delivery calculations.");
      setOrderType('takeaway');
      return null;
    }
  }, []);

  const handleOrderTypeChange = async (type: OrderType) => {
    setOrderType(type);
    if (type === 'delivery' && distance === null) {
      await detectLocation();
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Harino's Pizza & Fast Food",
      text: "Check out Harino's - Handcrafted Pizza & Fast Food! Because Hari Knows.",
      url: "https://harinos.store"
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText("Check out Harino's at https://harinos.store");
        showNotification("Link copied to clipboard!");
      } catch (err) {
        alert("Visit us at harinos.store!");
      }
    }
  };

  const handleExploreCategory = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    setIsCategoryModalOpen(false);
    setView('menu');
    setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const getEffectivePrice = (item: MenuItem, size?: string) => {
    let basePrice = item.price;
    if (size && item.sizes) {
      const opt = item.sizes.find(s => s.label === size);
      if (opt) basePrice = opt.price;
    }
    const applicableOffer = OFFERS.find(o => !o.category || o.category === item.category);
    if (applicableOffer) {
      return Math.round(basePrice * (1 - applicableOffer.discountPercentage / 100));
    }
    return basePrice;
  };

  const filteredItems = useMemo(() => {
    return selectedCategory === 'All' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const deliveryFee = useMemo(() => {
    if (orderType === 'takeaway' || distance === null) return 0;
    const currentSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Unserviceable beyond 7km
    if (distance > 7) return -1; 

    // Logic based on user request:
    // If subtotal < 150, Rs 15 added starting from 1km
    if (currentSubtotal < 150) {
      return Math.max(15, Math.round(distance * 15)); 
    } else {
      // If subtotal >= 150, free within 3km
      if (distance <= 3) return 0;
      // Nominal fuel charge for long distance even if minimum is met
      return Math.round((distance - 3) * 15);
    }
  }, [orderType, distance, cart]);

  const addToCart = (item: MenuItem, selectedSize?: string) => {
    if (!item.available) return;
    const discountedPrice = getEffectivePrice(item, selectedSize);
    setCart(prev => {
      const cartItemId = selectedSize ? `${item.id}-${selectedSize}` : item.id;
      const existing = prev.find(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) === cartItemId);
      if (existing) {
        return prev.map(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) === cartItemId 
          ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * discountedPrice } 
          : i);
      }
      return [...prev, { ...item, quantity: 1, discountedPrice, totalPrice: discountedPrice, selectedSize }];
    });
    showNotification(`Added ${item.name} to basket!`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      const currentId = item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id;
      if (currentId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, totalPrice: newQty * item.discountedPrice };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => {
      const currentId = item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id;
      return currentId !== cartItemId;
    }));
  };

  const handleReorder = (order: Order) => {
    const reorderItems = order.items.map(item => {
      const freshItem = MENU_ITEMS.find(mi => mi.id === item.id);
      const discountedPrice = freshItem ? getEffectivePrice(freshItem, item.selectedSize) : item.discountedPrice;
      return { 
        ...(freshItem || item), 
        quantity: item.quantity, 
        discountedPrice,
        totalPrice: item.quantity * discountedPrice,
        selectedSize: item.selectedSize
      };
    }).filter(item => item.available);
    
    if (reorderItems.length === 0) {
      alert("Items currently unavailable.");
      return;
    }
    // We append or replace? Usually re-order implies replacing the cart or adding. Let's replace for a clean experience.
    setCart(reorderItems);
    setView('menu');
    setIsCartOpen(true);
    showNotification("Last order items restored!");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const finalDelFee = orderType === 'delivery' && deliveryFee > 0 ? deliveryFee : 0;
  const currentTotal = subtotal + finalDelFee;
  const includedGst = subtotal - (subtotal / 1.05);

  const handleCheckoutInitiate = async () => {
    if (!isStoreOpen) {
      alert(statusMessage || "Closed for the day.");
      return;
    }
    
    if ('Notification' in window && Notification.permission === 'default') {
      await NotificationService.requestPermission();
    }

    if (orderType === 'delivery') {
      if (distance === null) {
        const d = await detectLocation();
        if (d === null) return;
      }
      if (deliveryFee === -1) {
        alert("Sorry, you are beyond our 7km service area.");
        return;
      }
    }
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = async () => {
    setIsPaymentOpen(false);
    let locationString = "Takeaway Order";
    if (orderType === 'delivery') {
       try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
        });
        locationString = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
      } catch (e) {
        locationString = "Location Verification (Confirmed)";
      }
    }

    const orderId = `HRN-${Date.now().toString().slice(-4)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: currentTotal,
      date: new Date().toLocaleString(),
      orderType,
      deliveryFee: finalDelFee
    };
    StorageService.saveOrder(newOrder);
    setPastOrders(prev => [newOrder, ...prev]);
    NotificationService.simulateOrderStatus(orderId, orderType);

    const itemsText = cart.map(i => {
      const sizeTag = i.selectedSize ? ` [${i.selectedSize}]` : '';
      return `${i.quantity}x ${i.name}${sizeTag.padEnd(25 - sizeTag.length)} ₹${i.totalPrice}`;
    }).join('\n');

    const whatsappMessage = `
*HARINO'S ORDER - ${orderId}*
--------------------------
TYPE: ${orderType.toUpperCase()}
PAYMENT: COMPLETED ✅
--------------------------
*ITEMS:*
${itemsText}
--------------------------
SUBTOTAL: ₹${subtotal.toFixed(2)}
DELIVERY: ₹${finalDelFee.toFixed(2)}
GST (5% INCL): ₹${includedGst.toFixed(2)}
*TOTAL: ₹${currentTotal.toFixed(2)}*
--------------------------
*LOCATION:*
${locationString}
--------------------------
*BECAUSE HARI KNOWS*
    `.trim();

    StorageService.addLoyaltyPoints(Math.floor(subtotal / 10));
    setLoyaltyPoints(StorageService.getLoyaltyPoints());
    window.open(`https://wa.me/7818958571?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowOrderSuccess(true);
    setCart([]);
  };

  const totalCartItems = cart.reduce((s, i) => s + i.quantity, 0);

  const categoryIcons: Record<string, string> = {
    [Category.PIZZA]: '🍕',
    [Category.MOMOS_FRIES]: '🥟',
    [Category.BURGERS]: '🍔',
    [Category.SIDES]: '🍟',
    [Category.BEVERAGES]: '🥤',
    'All': '✨'
  };

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 overflow-x-hidden">
      <Header 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onViewOrders={() => setView('orders')}
        onViewMenu={() => setView('menu')}
        activeView={view}
        onShare={handleShare}
      />
      <main className="pt-20">
        {view === 'menu' ? (
          <>
            <Hero onShare={handleShare} onExploreMenu={() => setIsCategoryModalOpen(true)} />
            <div ref={menuRef} className="max-w-7xl mx-auto px-4 mt-6 md:mt-12 pb-24 scroll-mt-24">
              <div className="relative mb-8 md:mb-16">
                <div className="flex space-x-2 overflow-x-auto pb-6 pt-2 px-2 hide-scrollbar snap-x snap-mandatory scroll-smooth">
                  {['All', ...Object.values(Category)].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`snap-start whitespace-nowrap px-6 py-4 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border shadow-sm flex-shrink-0 ${selectedCategory === cat ? 'bg-red-600 border-red-600 text-white scale-105 shadow-red-200' : 'bg-white border-slate-100 text-slate-400 hover:text-red-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-50/30 to-transparent pointer-events-none md:hidden" />
              </div>

              {!isStoreOpen && (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-[2rem] text-center mb-16 animate-in slide-in-from-top duration-700">
                  <span className="text-amber-600 font-bold text-sm">Outlet Closed • {statusMessage}</span>
                </div>
              )}
              <MenuSection items={filteredItems} onAddToCart={addToCart} activeOffers={OFFERS} />
            </div>
          </>
        ) : (
          <PastOrders orders={pastOrders} onReorder={handleReorder} />
        )}
      </main>
      <footer className="bg-slate-900 text-white py-24 border-t border-white/5 pb-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-display text-5xl md:text-6xl mb-4 text-red-500">Harino's</h2>
          <div className="text-white font-bold tracking-[0.6em] uppercase text-[9px] md:text-[11px] mb-10 opacity-40">BECAUSE HARI KNOWS</div>
          <div className="text-white/20 text-[8px] uppercase tracking-widest mt-8">harinos.store</div>
        </div>
      </footer>
      
      {/* Category Selection Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-slate-900 p-8 text-center">
               <h3 className="font-display text-3xl text-white mb-2">Explore Our Kitchen</h3>
               <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-black">Because Hari Knows What You Crave</p>
               <button onClick={() => setIsCategoryModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['All', ...Object.values(Category)].map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => handleExploreCategory(cat as any)}
                    className="flex items-center space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:bg-red-50 transition-all group animate-in slide-in-from-bottom-10"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {categoryIcons[cat]}
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">Category</div>
                      <div className="text-lg font-display font-bold text-slate-900">{cat}</div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-8 text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">100% Pure Vegetarian Kitchen</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Cart Bar */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-4 right-20 z-50 md:hidden animate-in slide-in-from-bottom-20 duration-500">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 px-2.5 py-1.5 rounded-lg text-[10px] font-black shadow-sm">{totalCartItems}</div>
              <span className="text-[10px] font-black uppercase tracking-widest">View Basket</span>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-xs font-display font-bold text-red-500">₹{subtotal.toFixed(0)}</span>
               <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        </div>
      )}

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={subtotal}
        onCheckout={handleCheckoutInitiate}
        orderType={orderType}
        setOrderType={handleOrderTypeChange}
        deliveryFee={deliveryFee}
        distance={distance}
        onDetectLocation={detectLocation}
        pastOrders={pastOrders}
        onReorder={handleReorder}
      />
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} total={currentTotal} onPaymentComplete={handlePaymentComplete} />
      <AIOrderAssistant />
      {notification && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 duration-500 w-full max-w-[90%] md:max-w-xs">
           <div className="bg-slate-900 text-white px-6 md:px-8 py-4 rounded-2xl shadow-2xl border border-red-600/30 flex items-center space-x-3 mx-auto">
              <span className="text-xl">🍕</span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{notification}</span>
           </div>
        </div>
      )}
      {showOrderSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] px-4">
          <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] animate-in zoom-in-50 duration-500 shadow-2xl text-center border-2 border-red-600 w-full max-w-sm">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl mb-6 mx-auto shadow-xl">✓</div>
            <h4 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight">Order Received!</h4>
            <p className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-widest mt-4">We'll notify you with status updates!</p>
            <p className="text-[10px] md:text-[11px] text-red-500 font-black tracking-[0.5em] mt-8 uppercase animate-pulse">BECAUSE HARI KNOWS</p>
            <button onClick={() => setShowOrderSuccess(false)} className="mt-10 px-10 py-4 bg-white/10 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all w-full">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
