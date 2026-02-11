import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { QuickView } from "./QuickView";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <QuickView product={product}>
            <button className="bg-background text-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
              <Eye size={14} /> Quick View
            </button>
          </QuickView>
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
