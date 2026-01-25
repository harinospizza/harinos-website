
import React from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, onPaymentComplete }) => {
  if (!isOpen) return null;

  const upiId = "Q682142711@ybl"; // Example UPI ID based on the phone number
  const recipientName = "Harino's";
  
  // Generic UPI deep link components
  const getUpiUrl = (app: 'gpay' | 'phonepe' | 'paytm' | 'generic') => {
    const base = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(recipientName)}&am=${total.toFixed(2)}&cu=INR`;
    // Some apps might have specific schemes, but generic upi:// is widely supported
    return base;
  };

  const paymentApps = [
  { name: 'PhonePe', icon: "/images/phone.png" },
  { name: 'GPay',    icon: "/images/gpay.png" },
  { name: 'Paytm',   icon: "/images/paytm.png" },
];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="text-red-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Secure Payment</div>
          <h2 className="text-3xl font-display font-bold">Pay ₹{total.toFixed(2)}</h2>
          <p className="text-slate-400 text-xs mt-2 opacity-70 italic">BECAUSE HARI KNOWS</p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-orange-50 rounded-[2rem] border-2 border-dashed border-orange-200 relative group">
              {/* This is where the QR code from the user image would be displayed */}
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                <img 
                  src="/images/PaymentQR.jpeg" 
                  alt="Payment QR" 
                  className="w-40 h-40 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                Scan to Pay
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center mb-4">Or select your app</p>
            <div className="grid grid-cols-3 gap-3">
              {paymentApps.map(app => (
                <a 
                  key={app.name}
                  href={getUpiUrl('generic')}
                  className="flex flex-col items-center p-4 rounded-2xl border border-slate-100 hover:border-red-100 hover:bg-red-50/50 transition-all group"
                >
                  <img
  src={app.icon}
  alt={app.name}
  className="w-10 h-10 p-1 bg-white rounded-lg object-contain mb-2 shadow-sm group-hover:scale-110 transition-transform"
/>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{app.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50">
            <button 
              onClick={onPaymentComplete}
              className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>I Have Paid & Continue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-3 py-3 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        </div>

        <div className="bg-slate-50 py-4 px-8 flex justify-between items-center text-[9px] text-slate-400 font-bold tracking-widest uppercase">
          <span>UPI ID: {upiId}</span>
          <span className="text-green-500 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            Verified Merchant
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
