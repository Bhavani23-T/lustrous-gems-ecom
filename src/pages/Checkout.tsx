import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { GiftingOptions } from "@/components/GiftingOptions";

import { BackButton } from "@/components/ui/BackButton";

const Checkout = () => {
  const { cart, cartTotal, clearCart, placeOrder } = useStore();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  if (cart.length === 0 && !placed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Nothing to checkout</h1>
        <Link to="/products" className="text-primary hover:underline">Continue shopping</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="mx-auto text-primary mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-6">Thank you for shopping with Lumière</p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm">View Orders</Link>
          <Link to="/products" className="border border-border px-6 py-3 rounded-lg font-medium text-sm">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create actual order object
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      items: [...cart],
      total: cartTotal,
      status: "Confirmed" as const,
      isGift,
      giftMessage: isGift ? giftMessage : undefined
    };

    placeOrder(newOrder);
    clearCart();
    setPlaced(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton label="Back to Cart" />
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-display font-semibold mb-4">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Full Name" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Phone Number" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Email" type="email" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring md:col-span-2" />
              <input placeholder="Address Line 1" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring md:col-span-2" />
              <input placeholder="City" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="PIN Code" required className="px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <GiftingOptions
            isGift={isGift}
            setIsGift={setIsGift}
            giftMessage={giftMessage}
            setGiftMessage={setGiftMessage}
          />

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-display font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
              {["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map((m) => (
                <label key={m} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent/50 text-sm">
                  <input type="radio" name="payment" defaultChecked={m === "Credit/Debit Card"} className="accent-primary" />
                  {m}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="flex-1 border border-border py-4 sm:py-3 rounded-xl sm:rounded-lg font-bold sm:font-medium text-sm hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] bg-primary text-primary-foreground py-4 sm:py-3 rounded-xl sm:rounded-lg font-bold sm:font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              Place Order · ₹{cartTotal.toLocaleString()}
            </button>
          </div>
        </form>

        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="font-display font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt="" className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-semibold">
            <span>Total</span><span>₹{cartTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
