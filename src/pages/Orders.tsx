import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { mockOrders } from "@/data/mockData";

const statusColors: Record<string, string> = {
  Processing: "bg-accent text-accent-foreground",
  Shipped: "bg-primary/10 text-primary",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-destructive/10 text-destructive",
};

const Orders = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">My Orders</h1>
    {mockOrders.length === 0 ? (
      <div className="text-center py-20">
        <Package size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">No orders yet</p>
        <Link to="/products" className="text-primary hover:underline">Start shopping</Link>
      </div>
    ) : (
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt="" className="w-14 h-14 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity} · ₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-3 flex justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-semibold">₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Orders;
