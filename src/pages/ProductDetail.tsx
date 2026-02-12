import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronLeft, Camera, Zap } from "lucide-react";
import { products, mockReviews } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { SizeGuide } from "@/components/SizeGuide";
import { ProductViewer } from "@/components/ProductViewer";
import { EMICalculator } from "@/components/EMICalculator";
import { ReviewModal } from "@/components/ReviewModal";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/BackButton";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [qty, setQty] = useState(1);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, qty);
      navigate("/checkout");
    }
  };

  // Reset all state when product changes
  useEffect(() => {
    setQty(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-primary hover:underline">Browse products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 pb-20 md:pb-8">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <BackButton label="Back" />
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-bold">{product.category}</span>
        </div>
      </div>

      {/* Main Product Section - Split Layout */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-8 md:mb-12">
        {/* Left: Media Section */}
        <div className="lg:col-span-7 space-y-4">
          <ProductViewer images={product.images} name={product.name} />
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary/10 text-primary text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                {product.metal}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{product.purity}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
                <Star size={14} className="fill-primary text-primary" />
                <span className="text-sm font-bold text-primary">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground border-l border-border pl-4">{product.reviewCount} Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-4 md:mb-6">
              <span className="text-3xl font-black text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground/60 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 md:mb-8">
              <div className="bg-secondary/30 rounded-2xl p-4 border border-border/40 hover:border-primary/20 transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-bold">Weight</span>
                <p className="font-bold text-lg">{product.weight}</p>
              </div>
              <div className="bg-secondary/30 rounded-2xl p-4 border border-border/40 hover:border-primary/20 transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1 font-bold">Purity</span>
                <p className="font-bold text-lg">{product.purity}</p>
              </div>
            </div>

            {/* EMI Calculator Integration */}
            <div className="mb-6 md:mb-8">
              <EMICalculator price={product.price} />
            </div>

            {(product.category.toLowerCase() === "rings" || product.category.toLowerCase() === "bangles") && (
              <div className="mb-8 p-4 bg-accent/5 rounded-2xl border border-accent/20">
                <SizeGuide />
              </div>
            )}
          </div>

          {/* Action Buttons - Hidden on Mobile (moved to sticky bar) or simplified */}
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-border rounded-2xl bg-background overflow-hidden h-14 shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-5 py-2 hover:bg-muted transition-colors active:bg-primary/10 group"><Minus size={16} className="group-active:scale-125 transition-transform" /></button>
                <span className="w-10 text-center text-lg font-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-5 py-2 hover:bg-muted transition-colors active:bg-primary/10 group"><Plus size={16} className="group-active:scale-125 transition-transform" /></button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary h-14 rounded-2xl font-black text-sm hover:bg-primary/5 transition-all shadow-lg shadow-primary/5 active:scale-95"
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-14 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-[0.98] active:scale-[0.97] transition-all uppercase tracking-widest"
            >
              <Zap size={20} fill="currentColor" /> Buy It Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={cn(
                "w-full flex items-center justify-center h-14 rounded-2xl border-2 transition-all font-bold",
                wishlisted ? "border-primary bg-primary/5 text-primary shadow-inner" : "border-border text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Heart size={20} className={wishlisted ? "fill-primary mr-2" : "mr-2"} />
              {wishlisted ? "Added to Wishlist" : "Save for Later"}
            </button>
          </div>

          {/* New Mobile Floating Action Section */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-50 flex flex-col gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="flex gap-3">
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all active:scale-95",
                  wishlisted ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                )}
              >
                <Heart size={22} className={wishlisted ? "fill-primary" : ""} />
              </button>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 border-2 border-primary text-primary h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Zap size={20} fill="currentColor" /> Buy Now
            </button>
          </div>
        </div>
      </div>


      {/* Enhanced Reviews Section */}
      <section className="mt-12 md:mt-32 border-t border-border/50 pt-12 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Customer Stories</h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-primary text-primary" : "text-muted-foreground/20"} />
                ))}
              </div>
              <span className="text-sm font-medium tracking-tight">4.8 / 5.0 based on {product.reviewCount} reviews</span>
            </div>
          </div>
          <ReviewModal productName={product.name}>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95">
              <Camera size={18} /> Write a Review
            </button>
          </ReviewModal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {mockReviews.map((r) => (
            <div key={r.id} className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                    {r.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{r.user}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 bg-primary/5 px-2 py-1 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/20"} />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">"{r.comment}"</p>

              {/* Review Photos */}
              {r.images && r.images.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {r.images.map((img, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-2xl overflow-hidden border border-border/50 group relative cursor-pointer shadow-sm">
                      <img src={img} alt={`Review by ${r.user}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Plus size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-12 md:mt-32">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">You May Also Like</h2>
              <p className="text-sm text-muted-foreground">Handpicked selections complementing your style</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>

  );
};

export default ProductDetail;
