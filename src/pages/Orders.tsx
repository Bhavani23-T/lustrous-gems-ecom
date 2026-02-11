import { Link } from "react-router-dom";
import { Package, Truck, Gift } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { TrackOrder } from "@/components/TrackOrder";
import { BackButton } from "@/components/ui/BackButton";

const statusColors: Record<string, string> = {
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-orange-100 text-orange-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

const Orders = () => {
  const { orders } = useStore();

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <BackButton />
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No orders yet</p>
          <Link to="/products" className="text-primary hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-muted/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-border">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Order ID</p>
                    <p className="font-bold text-sm">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Date</p>
                    <p className="font-bold text-sm">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {order.isGift && (
                    <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full bg-pink-100 text-pink-700">
                      <Gift size={10} /> Gift Order
                    </span>
                  )}
                  <span className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <TrackOrder order={order}>
                    <button className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
                      <Truck size={14} /> Track Order
                    </button>
                  </TrackOrder>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-border" />
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.metal} · {item.purity}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.price.toLocaleString()} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-6 pt-4 space-y-4">
                  {order.isGift && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Package size={14} className="fill-primary/20" />
                        <span className="text-xs font-bold uppercase tracking-wider">Gift Message</span>
                      </div>
                      <p className="text-sm italic text-foreground">"{order.giftMessage || "Enjoy your gift!"}"</p>
                      <p className="text-[10px] text-muted-foreground mt-2 font-medium italic">* This order will be delivered in a premium gift box.</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Total Amount</p>
                    <p className="text-lg font-display font-bold text-primary">₹{order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
