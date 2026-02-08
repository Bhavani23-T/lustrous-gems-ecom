import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Discover our beautiful collection</p>
        <Link to="/products" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Shopping Cart ({cart.length})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
              <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="font-display font-semibold text-sm hover:text-primary line-clamp-1">{item.name}</Link>
                <p className="text-xs text-muted-foreground">{item.metal} · {item.purity}</p>
                <p className="font-semibold mt-1">₹{item.price.toLocaleString()}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5"><Minus size={12} /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-destructive p-1"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="font-display font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
              <span>Total</span><span>₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm mt-6 hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
