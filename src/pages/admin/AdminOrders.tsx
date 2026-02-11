import { Gift } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/data/mockData";

const statusColors: Record<string, string> = {
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-orange-100 text-orange-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

const statuses: OrderStatus[] = ["Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6 text-foreground">Manage Orders</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground">
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Order ID</th>
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Type</th>
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Date</th>
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Customer Items</th>
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Total Amount</th>
                <th className="text-left p-4 font-bold uppercase tracking-wider text-[10px]">Current Status</th>
                <th className="text-right p-4 font-bold uppercase tracking-wider text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-bold text-primary">{o.id}</td>
                  <td className="p-4">
                    {o.isGift ? (
                      <div className="flex items-center gap-1 text-pink-600 font-bold text-[10px] uppercase">
                        <Gift size={12} /> Gift
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter">Standard</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{o.date}</td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {o.items.slice(0, 3).map((item, i) => (
                        <img key={i} src={item.image} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                      ))}
                      {o.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                          +{o.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-bold">₹{o.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                      className="text-xs border border-border rounded-lg px-3 py-1.5 bg-background font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
