import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} className="text-primary" />
          </div>
          <h1 className="font-display text-3xl font-black mb-4">Your treasure chest is empty</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed font-medium">It looks like you haven't added any of our exquisite pieces to your cart yet. Discover something special today.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
            Continue Shopping <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <BackButton label="Back to shop" />
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="font-display text-3xl md:text-5xl font-black">Shopping Bag <span className="text-primary/40">({cart.length})</span></h1>
        <Link to="/products" className="text-sm font-bold text-primary hover:underline flex items-center gap-2 pr-2">
          <ArrowLeft size={16} /> Add More Items
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link to={`/product/${item.id}`} className="font-display font-black text-lg md:text-xl hover:text-primary transition-colors leading-tight">{item.name}</Link>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive p-2 bg-muted/50 rounded-xl transition-all active:scale-90" title="Remove item">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground font-bold mt-1 uppercase tracking-widest">{item.metal} · {item.purity}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <p className="font-black text-xl md:text-2xl text-foreground">₹{item.price.toLocaleString()}</p>

                    <div className="flex items-center bg-secondary/50 rounded-2xl p-1 border border-border/50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 md:p-2.5 text-muted-foreground hover:text-primary hover:bg-background rounded-xl transition-all disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 md:px-5 text-sm font-black text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 md:p-2.5 text-muted-foreground hover:text-primary hover:bg-background rounded-xl transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-card border border-border rounded-[32px] p-8 h-fit sticky top-24 shadow-sm">
            <h3 className="font-display font-black text-2xl mb-8">Bag Summary</h3>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="text-lg">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="text-base text-primary font-black">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Tax Estimate</span>
                <span className="text-base">Included</span>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-black mb-1">Total Amount</p>
                    <p className="font-black text-3xl text-foreground leading-none">₹{cartTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="group relative block w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-sm uppercase tracking-widest mt-10 shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95 overflow-hidden text-center"
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} />
                </div>
                <p className="text-[10px] font-medium leading-tight">Secure checkout with encrypted payment protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
