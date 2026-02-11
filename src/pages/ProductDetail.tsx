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
    <div className="container mx-auto px-4 py-4 md:py-8">
      <BackButton label="Back to shop" />

      {/* Main Product Section - Split Layout */}
      <div className="grid lg:grid-cols-12 gap-10 mb-16">
        {/* Left: Media Section */}
        <div className="lg:col-span-7">
          <ProductViewer images={product.images} name={product.name} />
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.metal} · {product.purity}</p>
          <h1 className="font-display text-3xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed italic border-l-2 border-primary/20 pl-4">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Weight</span>
              <p className="font-bold text-base">{product.weight}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Purity</span>
              <p className="font-bold text-base">{product.purity}</p>
            </div>
          </div>

          {/* EMI Calculator Integration */}
          <div className="mb-8">
            <EMICalculator price={product.price} />
          </div>

          {(product.category.toLowerCase() === "rings" || product.category.toLowerCase() === "bangles") && (
            <div className="mb-8 p-4 bg-accent/5 rounded-xl border border-accent/20">
              <SizeGuide />
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-border rounded-2xl bg-background overflow-hidden h-14 shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-5 py-2 hover:bg-muted transition-colors active:bg-primary/10 group"><Minus size={16} className="group-active:scale-125 transition-transform" /></button>
                <span className="w-10 text-center text-base font-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-5 py-2 hover:bg-muted transition-colors active:bg-primary/10 group"><Plus size={16} className="group-active:scale-125 transition-transform" /></button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary h-14 rounded-2xl font-black text-sm hover:bg-primary/5 transition-all shadow-lg shadow-primary/5 active:scale-95"
              >
                <ShoppingBag size={20} /> <span className="hidden sm:inline">Add to Bag</span><span className="sm:hidden">Add</span>
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

          {/* Mobile Sticky Action Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border p-4 z-50 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => toggleWishlist(product)}
              className={cn(
                "w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all",
                wishlisted ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              )}
            >
              <Heart size={22} className={wishlisted ? "fill-primary" : ""} />
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-primary-foreground h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Zap size={20} fill="currentColor" /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Reviews Section */}
      <section className="mt-16 border-t border-border pt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-primary text-primary" : "text-muted"} />
                ))}
              </div>
              <span className="text-sm font-medium">4.8 out of 5 based on {product.reviewCount} total reviews</span>
            </div>
          </div>
          <ReviewModal productName={product.name}>
            <button className="bg-background border border-border px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors">
              <Camera size={16} /> Write a Review
            </button>
          </ReviewModal>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {mockReviews.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {r.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{r.user}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? "fill-primary text-primary" : "text-muted"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.comment}</p>

              {/* Review Photos */}
              {r.images && r.images.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {r.images.map((img, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-border group relative cursor-pointer">
                      <img src={img} alt={`Review by ${r.user}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Plus size={16} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
