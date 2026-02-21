
import React from 'react';
import { CartItem, OrderType, Order } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemove: (cartItemId: string) => void;
  total: number;
  onCheckout: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryFee: number;
  distance: number | null;
  onDetectLocation: () => Promise<number | null>;
  pastOrders?: Order[];
  onReorder?: (order: Order) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  total,
  onCheckout,
  orderType,
  setOrderType,
  deliveryFee,
  distance,
  onDetectLocation,
  pastOrders = [],
  onReorder
}) => {
  const isDeliveryImpossible = orderType === 'delivery' && deliveryFee === -1;
  const effectiveDeliveryFee = orderType === 'delivery' && deliveryFee > 0 ? deliveryFee : 0;
  const finalTotal = total + effectiveDeliveryFee;
  const includedGst = total - (total / 1.05);

  const lastOrder = pastOrders.length > 0 ? pastOrders[0] : null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[70] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      <div 
        className={`fixed top-0 right-0 h-full w-full md:max-w-md bg-white z-[80] shadow-[0_0_100px_rgba(0,0,0,0.3)] transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-end">
            <div>
              <div className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-1">Your Basket</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Checkout</h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-4 md:p-6 bg-slate-50/50">

<div className="grid grid-cols-3 gap-3 mb-6">
  
  {/* TAKEAWAY */}
  <button
    onClick={() => setOrderType('takeaway')}
    className={`relative p-4 rounded-2xl border-2 transition-all ${
      orderType === 'takeaway'
        ? 'border-red-600 bg-red-50'
        : 'border-slate-200 bg-white'
    }`}
  >
    <div className="text-3xl mb-2">🥡</div>
    <div className="text-[11px] font-black tracking-widest">TAKEAWAY</div>
    <div className="text-[9px] text-slate-400">Fastest</div>

    {orderType === 'takeaway' && (
      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] px-2 py-1 rounded-full">
        FASTEST
      </div>
    )}
  </button>

  {/* DELIVERY */}
  <button
    onClick={() => setOrderType('delivery')}
    className={`p-4 rounded-2xl border-2 transition-all ${
      orderType === 'delivery'
        ? 'border-red-600 bg-red-50'
        : 'border-slate-200 bg-white'
    }`}
  >
    <div className="text-3xl mb-2">🚚</div>
    <div className="text-[11px] font-black tracking-widest">DELIVERY</div>
    <div className="text-[9px] text-slate-400">Home</div>
  </button>

  {/* DINEIN */}
  <button
    onClick={() => setOrderType('dinein')}
    className={`p-4 rounded-2xl border-2 transition-all ${
      orderType === 'dinein'
        ? 'border-red-600 bg-red-50'
        : 'border-slate-200 bg-white'
    }`}
  >
    <div className="text-3xl mb-2">🍽️</div>
    <div className="text-[11px] font-black tracking-widest">DINE-IN</div>
    <div className="text-[9px] text-slate-400">At outlet</div>
  </button>

</div>

              {orderType === 'delivery' && (
                <div className="space-y-3">
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Distance</div>
                        <div className="text-[10px] md:text-xs font-bold text-slate-900">{distance ? `${distance.toFixed(1)} km from outlet` : 'Locating...'}</div>
                      </div>
                    </div>
                    <button onClick={onDetectLocation} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 underline">Refresh</button>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl animate-in slide-in-from-top duration-500">
                    <div className="flex items-center space-x-2 mb-2">
                       <span className="text-xs">🚚</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-blue-700">Delivery Conditions</span>
                    </div>
                    <ul className="space-y-1.5">
                      <li className="flex items-start space-x-2">
                        <span className="text-[10px] text-blue-400 mt-0.5">•</span>
                        <p className="text-[10px] text-blue-700/70 font-medium">Free Delivery for orders <span className="font-bold text-blue-800">₹150+</span> (within 3km).</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[10px] text-blue-400 mt-0.5">•</span>
                        <p className="text-[10px] text-blue-700/70 font-medium">Orders under ₹150: <span className="font-bold text-blue-800">₹15/km</span> charge applies.</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[10px] text-blue-400 mt-0.5">•</span>
                        <p className="text-[10px] text-blue-700/70 font-medium">Service Area Limit: Maximum <span className="font-bold text-blue-800">7km</span> radius.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 hide-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                <div className="opacity-40">
                  <div className="text-5xl md:text-6xl mb-6">🥡</div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-slate-900 mb-2">Empty Bag</h3>
                </div>
                
                {lastOrder && onReorder && (
                  <div className="w-full animate-in slide-in-from-bottom-10 duration-700 delay-200">
                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-left">
                      <div className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-3">One-Tap Re-order</div>
                      <h4 className="font-bold text-slate-900 text-sm mb-4">Repeat your last masterpiece?</h4>
                      <div className="space-y-2 mb-6">
                        {lastOrder.items.slice(0, 2).map((li, idx) => (
                           <div key={idx} className="flex justify-between text-[10px] text-slate-500 font-medium">
                             <span>{li.quantity}x {li.name}</span>
                             <span>₹{li.totalPrice}</span>
                           </div>
                        ))}
                        {lastOrder.items.length > 2 && <div className="text-[9px] text-slate-400 font-bold uppercase">+ {lastOrder.items.length - 2} more items</div>}
                      </div>
                      <button 
                        onClick={() => onReorder(lastOrder)}
                        className="w-full py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-red-600 hover:text-red-600 transition-all active:scale-95"
                      >
                        Repeat Last Order (₹{lastOrder.total.toFixed(0)})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              items.map((item, idx) => {
                const cartItemId = item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id;
                return (
                  <div key={cartItemId} className="flex space-x-4 md:space-x-5 animate-in slide-in-from-right duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-[13px] md:text-sm leading-tight">{item.name}</h4>
                          {item.selectedSize && <span className="text-[8px] font-black uppercase text-red-600 tracking-widest bg-red-50 px-1.5 py-0.5 rounded-md mt-1 inline-block">{item.selectedSize}</span>}
                        </div>
                        <button onClick={() => onRemove(cartItemId)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2 md:space-x-3 bg-slate-50 rounded-lg p-1">
                          <button onClick={() => onUpdateQuantity(cartItemId, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm font-bold text-xs hover:bg-red-50">-</button>
                          <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(cartItemId, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm font-bold text-xs hover:bg-red-50">+</button>
                        </div>
                        <span className="font-display font-bold text-slate-900 text-sm md:text-base">₹{item.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            
            {/* Minimal persistence indicator */}
            <div className="text-center pt-4">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Your bag is automatically saved to your device</span>
            </div>
          </div>

          {items.length > 0 && (
            <div className="p-6 md:p-8 bg-slate-900 text-white md:rounded-t-[3rem] shadow-2xl">
              <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 font-mono text-[10px] md:text-[11px] opacity-70 uppercase tracking-widest">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery {total < 150 ? '(Under Min Order)' : ''}</span>
                    <span className={deliveryFee === -1 ? 'text-red-500 font-bold' : ''}>{deliveryFee === -1 ? 'NOT SERVICEABLE' : `₹${effectiveDeliveryFee.toFixed(2)}`}</span>
                  </div>
                )}
                <div className="flex justify-between"><span>GST Included</span><span>₹{includedGst.toFixed(2)}</span></div>
                <div className="h-px border-t border-dashed border-white/20 my-2"></div>
                <div className="flex justify-between text-xl md:text-2xl font-display font-bold text-white opacity-100">
                  <span>Grand Total</span>
                  <span className="text-red-500">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                disabled={isDeliveryImpossible}
                className={`w-full py-4 md:py-5 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all flex items-center justify-center space-x-3 ${isDeliveryImpossible ? 'bg-slate-800 text-white/40 cursor-not-allowed border border-white/5' : 'hover:bg-red-700 active:scale-95'}`}
              >
                <span>{isDeliveryImpossible ? 'Beyond Service Area' : 'Pay via UPI'}</span>
                {!isDeliveryImpossible && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
