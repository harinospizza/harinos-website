
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
    { name: 'PhonePe', icon: 'https://share.google/F5qeVvizqZjcvcNUJ', color: 'bg-[#5f259f]', scheme: 'phonepe' },
    { name: 'GPay', icon: 'https://www.google.com/search?q=gpay+icon+url&client=ms-android-realme-terr1-rso2&hs=oDEp&sca_esv=9236cc086a353fe5&udm=2&biw=361&bih=682&aic=0&sxsrf=ANbL-n5Q0Qdlvx50M8C_KdLjcorgBTUaTQ%3A1769329216160&ei=QNJ1afi9CdmtseMP-53ZiQg&oq=gpay+icon+url&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciDWdwYXkgaWNvbiB1cmwyBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSOwfUKwQWM4dcAB4AJABAJgB7wagAfYUqgELMC45LjAuMS42LTG4AQPIAQD4AQGYAgOgArAJwgIIEAAYgAQYogTCAgoQABiABBhDGIoFmAMAiAYBkgcHMC4yLjYtMaAH-iKyBwcwLjIuNi0xuAewCcIHBTItMi4xyAcVgAgA&sclient=mobile-gws-wiz-img', color: 'bg-[#4285f4]', scheme: 'gpay' },
    { name: 'Paytm', icon: 'https://www.google.com/search?q=paytm+icon+url&client=ms-android-realme-terr1-rso2&hs=oDEp&sca_esv=9236cc086a353fe5&udm=2&biw=361&bih=682&aic=0&sxsrf=ANbL-n4RFHroFvLt_aD9UPmVJVuz3cvsug%3A1769329245982&ei=XdJ1aZrdO_GOseMPwd74wA4&oq=paytm+icon+url&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciDnBheXRtIGljb24gdXJsMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjdKVDzEljJJ3AAeACQAQCYAe4BoAG7DqoBBTAuNi40uAEDyAEA-AEBmAIFoAL1BsICBhAAGAcYHsICCBAAGAcYCBgewgIIEAAYBRgHGB7CAgoQABiABBhDGIoFmAMAiAYBkgcFMC40LjGgB-YdsgcFMC40LjG4B_UGwgcFMi0zLjLIByiACAA&sclient=mobile-gws-wiz-img', color: 'bg-[#00baf2]', scheme: 'paytm' },
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
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=7818958571@ybl%26pn=Harino's%20Outlet%26am=0%26cu=INR" 
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
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{app.icon}</span>
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
