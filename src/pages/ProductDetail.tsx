import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronLeft, RotateCw } from "lucide-react";
import { products, mockReviews } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Reset all state when product changes (fixes product switch & "You May Like" nav bugs)
  useEffect(() => {
    setSelectedImage(0);
    setQty(1);
    setRotationAngle(0);
    setIsRotating(true);
    window.scrollTo(0, 0);
  }, [id]);

  // Simulated 360° rotation by cycling images - keyed to current product
  useEffect(() => {
    if (!product || !isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [product, isRotating]);

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

  // Pick image based on rotation angle for 360 effect
  const rotationImageIndex = Math.floor((rotationAngle / 360) * product.images.length) % product.images.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft size={16} /> Back to shop
      </Link>

      {/* Media Section - Images + 360° viewer side by side */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Product Images (no zoom) */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === selectedImage ? "border-primary" : "border-transparent"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 360° Product Viewer */}
        <div className="flex flex-col">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border relative">
            <img
              src={product.images[rotationImageIndex]}
              alt={`${product.name} 360° view`}
              className="w-full h-full object-cover transition-opacity duration-150"
              style={{ transform: `perspective(800px) rotateY(${rotationAngle}deg)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2">
              <RotateCw size={14} className={`text-primary ${isRotating ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
              <span className="text-xs font-semibold">360° View</span>
            </div>
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="absolute bottom-3 right-3 bg-background/80 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-background transition-colors"
            >
              {isRotating ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Simulated 360° rotation view</p>
        </div>
      </div>

      {/* Product Details - Below media */}
      <div className="max-w-3xl">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.metal} · {product.purity}</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

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
            <>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm font-semibold text-destructive">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-secondary rounded-lg p-3">
            <span className="text-muted-foreground">Weight</span>
            <p className="font-semibold">{product.weight}</p>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <span className="text-muted-foreground">Purity</span>
            <p className="font-semibold">{product.purity}</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-medium">Qty:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2"><Minus size={14} /></button>
            <span className="px-4 text-sm font-medium">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="p-2"><Plus size={14} /></button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-lg border ${wishlisted ? "border-primary bg-accent" : "border-border"}`}
          >
            <Heart size={18} className={wishlisted ? "fill-primary text-primary" : ""} />
          </button>
        </div>

        <Link
          to="/checkout"
          onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
          className="block w-full text-center border border-primary text-primary py-3 rounded-lg font-medium text-sm hover:bg-accent transition-colors"
        >
          Buy Now
        </Link>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-display text-xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {mockReviews.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? "fill-primary text-primary" : "text-muted"} />
                  ))}
                </div>
                <span className="text-sm font-medium">{r.user}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
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
