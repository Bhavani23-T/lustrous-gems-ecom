import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";

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
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
      >
        <Heart size={16} className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.metal} · {product.purity}</p>
          <h3 className="font-display text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
