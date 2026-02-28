import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
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
  deliveryFee?: number;
  location?: string;
  status?: string;
}

const AdminPanel: React.FC = () => {
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

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

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

            <div className="mb-2">
              {o.items?.map((i, idx) => (
                <div key={idx} className="text-sm">
                  {i.quantity} × {i.name}
                </div>
              ))}
            </div>

            <div className="font-bold mb-2">₹{o.total}</div>

            {o.location && (
              <a
                href={o.location}
                target="_blank"
                className="text-blue-600 text-sm underline"
              >
                View Location
              </a>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(o.id, "preparing")}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Preparing
              </button>

              <button
                onClick={() => updateStatus(o.id, "ready")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Ready
              </button>

              <button
                onClick={() => updateStatus(o.id, "completed")}
                className="px-3 py-1 bg-slate-800 text-white rounded"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
