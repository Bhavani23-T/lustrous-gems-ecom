import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Eye, ArrowUpRight } from "lucide-react";
import { Product } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { QuickView } from "./QuickView";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
        {product.isBestseller && <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded">BESTSELLER</span>}
        {product.originalPrice && (
          <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
        className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
      >
        <Heart size={16} className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"} />
      </button>

      {/* Image and Quick View Trigger */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product/${product.id}`} className="block h-full cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="eager"
            decoding="async"
            style={{ fetchPriority: 'high' } as any}
          />
        </Link>

        {/* Desktop Overlay - Quick View and Arrow */}
        <div className="absolute inset-x-0 bottom-0 p-3 hidden sm:flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 pointer-events-none">
          <QuickView product={product}>
            <button className="pointer-events-auto bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all">
              <Eye size={14} /> Quick View
            </button>
          </QuickView>
          <Link
            to={`/product/${product.id}`}
            className="pointer-events-auto p-2.5 bg-primary text-primary-foreground rounded-full shadow-xl hover:rotate-45 transition-all"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Edge Actions - Specifically for mobile view */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:hidden flex justify-between items-center z-20 pointer-events-none">
          <QuickView product={product}>
            <button className="pointer-events-auto bg-background/95 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-2 rounded-lg shadow-lg flex items-center gap-1.5 border border-primary/10">
              <Eye size={12} /> QUICK VIEW
            </button>
          </QuickView>
          <Link
            to={`/product/${product.id}`}
            className="pointer-events-auto p-2.5 bg-primary text-primary-foreground rounded-lg shadow-lg flex items-center justify-center"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1 font-bold">{product.metal} · {product.purity}</p>
          <h3 className="font-display text-sm sm:text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star size={10} className="fill-primary text-primary" />
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
            <span className="font-black text-sm sm:text-base text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="p-2 sm:p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all active:scale-90 shadow-md shadow-primary/10"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
