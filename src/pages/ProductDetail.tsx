import { useParams, Link } from "react-router-dom";
import { useState, useRef } from "react";
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
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft size={16} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images with zoom */}
        <div>
          <div
            ref={imgRef}
            className="aspect-square rounded-xl overflow-hidden bg-muted mb-3 relative cursor-crosshair"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {showZoom && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${product.images[selectedImage]})`,
                  backgroundSize: "250%",
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
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

          {/* 360° Video Section */}
          <div className="mt-6 rounded-xl overflow-hidden bg-muted border border-border">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary">
              <RotateCw size={16} className="text-primary" />
              <span className="text-sm font-semibold">360° Product View</span>
            </div>
            <div className="aspect-video relative bg-foreground/5 flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={product.images[0]}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-background/80 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2">
                  <RotateCw size={14} className="text-primary animate-spin" style={{ animationDuration: "3s" }} />
                  <span className="text-xs font-medium text-muted-foreground">360° View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
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
          <div className="flex gap-3 mb-6">
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
