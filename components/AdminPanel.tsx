import React, { useEffect, useState } from "react";
import { subscribeToOrders } from "../services/firebase";

interface Order {
  orderId: string;
  total: number;
  orderType: string;
  createdAt: string;
  location?: string;
}

const AdminPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsub = subscribeToOrders((data: any) => {
  if (Array.isArray(data)) {
    setOrders(data);
  } else {
    setOrders([]);
  }
});
    return () => unsub && unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {orders.length === 0 && (
        <div className="text-white/50">No orders yet</div>
      )}

      <div className="space-y-4">
        {Array.isArray(orders) &&
  orders.map((o) => (
          <div
            key={o.orderId}
            className="bg-white/10 p-4 rounded-xl border border-white/10"
          >
            <div className="font-bold text-lg">#{o.orderId}</div>
            <div>₹ {o.total}</div>
            <div className="text-sm opacity-70">{o.orderType}</div>
            <div className="text-xs opacity-50">{o.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
