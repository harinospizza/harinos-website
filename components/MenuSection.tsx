
import React, { useState } from 'react';
import { MenuItem, Offer } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, selectedSize?: string) => void;
  activeOffers: Offer[];
  selectedCategory: string;
}

const MenuCard: React.FC<{ 
  item: MenuItem; 
  onAdd: (size?: string) => void; 
  activeOffers: Offer[] 
}> = ({ item, onAdd, activeOffers }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizes ? item.sizes[0].label : ''
  );
  const [isAdding, setIsAdding] = useState(false);

  const getPriceForSelectedSize = () => {
    if (!item.sizes || !selectedSize) return item.price;
    const sizeOpt = item.sizes.find(s => s.label === selectedSize);
    return sizeOpt ? sizeOpt.price : item.price;
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAdd(selectedSize || undefined);
    setTimeout(() => setIsAdding(false), 600);
  };

  const currentBasePrice = getPriceForSelectedSize();
  const applicableOffer = activeOffers.find(o => !o.category || o.category === item.category);
  const discountedPrice = applicableOffer ? Math.round(currentBasePrice * (1 - applicableOffer.discountPercentage / 100)) : currentBasePrice;
  const hasDiscount = discountedPrice < currentBasePrice;

  return (
    <div className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform border border-orange-100 flex flex-col ${!item.available ? 'grayscale opacity-60 pointer-events-none' : 'hover:-translate-y-2'}`}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <div className="bg-white/95 backdrop-blur-sm p-1.5 rounded-lg shadow-xl">
             <div className="w-3.5 h-3.5 border-2 border-green-600 flex items-center justify-center rounded-sm">
               <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
             </div>
          </div>
          {item.popular && <span className="bg-amber-400 text-amber-950 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Popular</span>}
          {item.spicy && <span className="bg-red-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Spicy</span>}
        </div>
        
        {item.available && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <button 
              onClick={handleAddClick}
              className={`px-8 py-4 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl transform transition-all hover:bg-red-700 active:scale-90 ${isAdding ? 'scale-110 bg-green-600' : ''}`}
            >
              {isAdding ? '✓ Added' : 'Quick Add +'}
            </button>
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-display font-bold text-slate-900 leading-tight pr-4">{item.name}</h3>
          <div className="flex flex-col items-end">
            <span className="text-xl font-display font-bold text-red-600 whitespace-nowrap">₹{discountedPrice}</span>
            {hasDiscount && <span className="text-xs text-slate-400 line-through">₹{currentBasePrice}</span>}
          </div>
        </div>
        
        <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 line-clamp-2">{item.description}</p>
        
        {item.sizes && (
          <div className="mb-6">
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
              {item.sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s.label)}
                  className={`flex-1 py-2.5 px-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedSize === s.label ? 'bg-white shadow-sm text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <span className="text-[9px] text-slate-300 uppercase tracking-[0.3em] font-black">{item.category}</span>
          {item.available && (
            <button 
              onClick={handleAddClick} 
              className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center shadow-sm active:scale-75 ${isAdding ? 'bg-green-600 text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
            >
              {isAdding ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuSection: React.FC<MenuSectionProps> = ({ items, onAddToCart, activeOffers }) => {
  return (
    <div>
      {items.map((item) => (
        <MenuCard 
          key={item.id} 
          item={item} 
          onAdd={(size) => onAddToCart(item, size)} 
          activeOffers={activeOffers} 
        />
      ))}
    </div>
  );
};

export default MenuSection;
