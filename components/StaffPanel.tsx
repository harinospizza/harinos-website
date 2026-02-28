import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

interface OrderItem {
  name: string;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  orderType: string;
  date: string;
  status?: string;
}

const StaffPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const list: Order[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setOrders(list.reverse());
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Kitchen Panel</h1>

      <div className="grid gap-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl shadow p-4 border">
            <div className="flex justify-between mb-2">
              <span className="font-bold">#{o.id}</span>
              <span className="text-sm">{o.date}</span>
            </div>

            <div className="text-sm mb-2">
              Type: <b>{o.orderType}</b>
            </div>

            <div>
              {o.items?.map((i, idx) => (
                <div key={idx} className="text-lg font-semibold">
                  {i.quantity} × {i.name}
                </div>
              ))}
            </div>

            {o.status && (
              <div className="mt-3 text-sm">
                Status: <b>{o.status}</b>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPanel;
